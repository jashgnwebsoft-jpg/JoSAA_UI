import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { TabPanel } from '@mui/lab';
import { Box, Button, TextField } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useCollegeListStore } from '../api/store';
import { useCollegeListQuery, useCollegeTypeOptions } from '../api/hooks';
import { CollegeListResponse } from '../types';
import { LoadingScreen } from '@minimal/components/loading-screen';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { paths } from '@/paths';
import MyPage from '@modules/MyPage';
import MyCard from '@modules/MyCard';
import { Iconify } from '@minimal/components/iconify';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';

const CollegeListPage = () => {
  const { t } = useTranslate();
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const navigate = useNavigate();

  const { postModel, handlePagination, handleFiltering } = useCollegeListStore();
  const { data, totalRecords } = useCollegeListQuery(postModel);
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
      (item: CollegeListResponse) =>
        item.CollegeShortName?.toLowerCase().includes(s) ||
        item.StateName?.toLowerCase().includes(s) ||
        item.CollegeAdmissionCode?.toString().includes(s) ||
        item.NIRFRank?.toString().includes(s) ||
        item.Address?.toLocaleLowerCase().toString().includes(s) ||
        item.CollegeUrlName?.toLocaleLowerCase().toString().includes(s)
    );
  }, [debouncedSearch, data]);

  useEffect(() => {
    const labelMap: Record<number, string | null> = {
      1: null,
      2: 'NIT',
      3: 'IIT',
      4: 'IIIT',
      5: 'GFTI',
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

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Institute.College.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <SimpleBreadcrumbs
        heading={t('Institute.College.List.Title')}
        links={[{ name: 'Home' }, { name: t('Institute.College.List.Title') }]}
      />
      <MyPage
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        tabs={[
          { label: 'All', value: 1 },
          { label: 'NIT', value: 2 },
          { label: 'IIT', value: 3 },
          { label: 'IIIT', value: 4 },
          { label: 'GFTI', value: 5 },
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
        totalRecords={totalRecords}
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
            {filteredData.map((data: CollegeListResponse) => (
              <MyCard
                key={data?.CollegeID}
                rank={data?.CollegeAdmissionCode}
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
            {filteredData.map((data: CollegeListResponse) => (
              <MyCard
                key={data?.CollegeID}
                rank={data?.CollegeAdmissionCode}
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
            {filteredData.map((data: CollegeListResponse) => (
              <MyCard
                key={data?.CollegeID}
                rank={data?.CollegeAdmissionCode}
                shortName={data?.CollegeShortName}
                location={data?.StateName}
                onClick={() => navigate(paths.josaa.collegeinformation.root(data?.CollegeID))}
              />
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={4} sx={{ p: 0 }}>
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
            {filteredData.map((data: CollegeListResponse) => (
              <MyCard
                key={data?.CollegeID}
                rank={data?.CollegeAdmissionCode}
                shortName={data?.CollegeShortName}
                location={data?.StateName}
                onClick={() => navigate(paths.josaa.collegeinformation.root(data?.CollegeID))}
              />
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={5} sx={{ p: 0 }}>
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
            {filteredData.map((data: CollegeListResponse) => (
              <MyCard
                key={data?.CollegeID}
                rank={data?.CollegeAdmissionCode}
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
export default CollegeListPage;
