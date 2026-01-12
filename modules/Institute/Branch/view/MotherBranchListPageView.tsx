import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';

import {
  Box,
  Card,
  Select,
  MenuItem,
  TextField,
  Typography,
  Pagination,
  InputLabel,
  CardContent,
  FormControl,
  Tooltip,
} from '@mui/material';

import { paths } from '@/paths';
import { CONFIG } from '@/global-config';
import { useTranslate } from '@minimal/utils/locales';
import { Iconify } from '@minimal/components/iconify';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { LoadingScreen } from '@minimal/components/loading-screen';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';

import { useMotherBranchListQuery } from '../api/hooks';
import { useMotherBranchListStore } from '../api/store';
import { MotherBranchListResponse } from '../types';

const MotherBranchListPageView = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const { postModel, handlePagination } = useMotherBranchListStore();

  const page = postModel.pageOffset + 1;
  const rowsPerPage = postModel.pageSize;

  const { data, totalRecords, isLoading } = useMotherBranchListQuery(postModel);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);
    return () => clearTimeout(handler);
  }, [search]);

  const filteredData: MotherBranchListResponse[] = useMemo(() => {
    if (!data) return [];

    let result = [...data];

    if (sortBy === 'branchWise') {
      result.sort((a, b) => a.SystemBranchProperName.localeCompare(b.SystemBranchProperName));
    }

    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase();
      result = result.filter(
        item =>
          item.SystemBranchProperName.toLowerCase().includes(s) ||
          item.SystemBranchName.toLowerCase().includes(s) ||
          item.SystemBranchCode.toLowerCase().includes(s) ||
          item.SystemBranchID.toLowerCase().includes(s)
      );
    }

    return result;
  }, [debouncedSearch, data, sortBy]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    handlePagination({
      page: newPage - 1,
      pageSize: rowsPerPage,
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Institute.Branch.MotherBranch.Label') + ` - ${CONFIG.appName}`}</title>
      </Helmet>

      <SimpleBreadcrumbs
        heading={t('Institute.Branch.MotherBranch.Label')}
        links={[{ name: 'Home' }, { name: t('Institute.Branch.MotherBranch.Label') }]}
      />

      <Box
        sx={{
          display: 'flex',
          mb: 4,
          gap: 2,
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <FormControl size='small' sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <InputLabel id='sort-filter-label'>Sort By</InputLabel>
          <Select
            labelId='sort-filter-label'
            value={sortBy}
            label='Sort By'
            onChange={e => setSortBy(e.target.value)}
          >
            <MenuItem value='default'>Default</MenuItem>
            <MenuItem value='branchWise'>Branch Wise</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size='small'
          name='search'
          placeholder='Search...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ width: { xs: '100%', sm: 240 } }}
          InputProps={{
            startAdornment: (
              <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', mr: 1 }} />
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          height: 'calc(100dvh - 310px)',
          overflow: 'auto',
          pt: '1rem',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(6, 1fr)',
            },
          }}
        >
          {filteredData.map(item => (
            <Card
              key={item.SystemBranchID}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => {
                navigate(paths.josaa.systemBranchWiseCollege.root(item.SystemBranchID));
              }}
            >
              <CardContent>
                <Typography
                  variant='h6'
                  align='center'
                  pb={2}
                  color='primary'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.SystemBranchProperName}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                  <Tooltip title='Intake'>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        alignItems: 'center',
                      }}
                    >
                      <Iconify icon='bx:chair' color='#00a76f' />
                      <Typography variant='subtitle1'>{item.Intake}</Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title='Colleges'>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        alignItems: 'center',
                      }}
                    >
                      <Iconify icon='uil:university' color='#00a76f' />
                      <Typography variant='subtitle1'>{item.Colleges}</Typography>
                    </Box>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Pagination
          page={page}
          shape='circular'
          count={Math.ceil(totalRecords / rowsPerPage)}
          onChange={handleChangePage}
          sx={{
            my: 5,
            display: 'flex',
          }}
        />
      </Box>
    </DashboardContent>
  );
};

export default MotherBranchListPageView;
