import { Box, TextField } from '@mui/material';
import { useHomeStateListStore } from '../api/store';
import { useCollegeTypeOptions, useHomeStateListQuery } from '../api/hooks';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { TabPanel } from '@mui/lab';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import MyPage from '@modules/MyPage';
import MyCard from '@modules/MyCard';
import { paths } from '@/paths';
import { Iconify } from '@minimal/components/iconify';
import { HomeStateListPageResponse } from '../types';
import { CONFIG } from '@/global-config';
import { useTranslate } from '@minimal/utils/locales';

const HomeStateListPage = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { t } = useTranslate();
  const navigate = useNavigate();

  const { postModel, handlePagination, handleFiltering } = useHomeStateListStore();
  const { data, totalRecords } = useHomeStateListQuery(postModel);
  const { data: collegeOptions } = useCollegeTypeOptions();

  const page = postModel.pageOffset + 1;
  const rowsPerPage = postModel.pageSize;

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    handlePagination({
      page: newPage - 1,
      pageSize: rowsPerPage,
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => clearTimeout(handler);
  }, [search]);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;

    const s = debouncedSearch.toLowerCase();

    return data.filter(
      (item: HomeStateListPageResponse) =>
        item.CollegeShortName?.toLowerCase().includes(s) ||
        item.StateName?.toLowerCase().includes(s) ||
        item.City?.toString().includes(s) ||
        item.CollegeName?.toString().includes(s)
    );
  }, [debouncedSearch, data]);

  useEffect(() => {
    const labelMap: Record<number, string | null> = {
      1: null,
      2: 'NIT',
      3: 'GFTI',
    };
    const label = labelMap[currentTab];
    const type = label ? collegeOptions?.find(opt => opt.Label === label)?.Value : null;
    handleFiltering({
      ...postModel.filterModel,
      CollegeTypeID: type,
    });
    handlePagination({
      page: 0,
      pageSize: rowsPerPage,
    });
  }, [collegeOptions, currentTab]);

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Institute.College.HomeState.Label') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <SimpleBreadcrumbs
        heading={t('Institute.College.HomeState.Label')}
        links={[{ name: 'Home' }, { name: t('Institute.College.HomeState.Label') }]}
      />
      <MyPage
        totalRecords={totalRecords}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        tabs={[
          { label: 'All', value: 1 },
          { label: 'NIT', value: 2 },
          { label: 'GFTI', value: 3 },
        ]}
        pagination={{
          page: page,
          handleChangePage: handleChangePage,
          totalRecords: totalRecords,
          rowsPerPage: rowsPerPage,
        }}
        action={
          <TextField
            name='search'
            placeholder='Search...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Iconify icon='eva:search-fill' />,
            }}
            size='small'
          />
        }
        contentSx={{
          height: 'calc(100dvh - 310px)',
          overflow: 'auto',
          pt: '1rem',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <TabPanel value={1} sx={{ p: 0 }}>
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
            {filteredData.map((data: HomeStateListPageResponse) => (
              <MyCard
                city={data?.City}
                rank={data?.CollegeAdmissionCode}
                key={data?.CollegeID}
                shortName={data?.CollegeShortName}
                location={data?.StateName}
                onClick={() => navigate(paths.josaa.collegeinformation.root(data?.CollegeID))}
              />
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={2} sx={{ p: 0 }}>
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
            {filteredData.map((data: HomeStateListPageResponse) => (
              <MyCard
                city={data?.City}
                rank={data?.CollegeAdmissionCode}
                key={data?.CollegeID}
                shortName={data?.CollegeShortName}
                location={data?.StateName}
                onClick={() => navigate(paths.josaa.collegeinformation.root(data?.CollegeID))}
              />
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={3} sx={{ p: 0 }}>
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
            {filteredData.map((data: HomeStateListPageResponse) => (
              <MyCard
                city={data?.City}
                rank={data?.CollegeAdmissionCode}
                key={data?.CollegeID}
                shortName={data?.CollegeShortName}
                location={data?.StateName}
                onClick={() => navigate(paths.josaa.collegeinformation.root(data?.CollegeID))}
              />
            ))}
          </Box>
        </TabPanel>
      </MyPage>
    </DashboardContent>
  );
};
export default HomeStateListPage;
