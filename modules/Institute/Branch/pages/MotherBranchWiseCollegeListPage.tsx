import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';
import { LoadingScreen } from '@minimal/components/loading-screen';
import { useSystemBranchWiseCollegeListStore } from '../api/store';
import { useSystemBranchWiseCollegeListQuery } from '../api/hooks';
import { TabPanel } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import { SystemBranchWiseCollegeistResponse } from '../types';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { useCollegeTypeOptions } from '@modules/Institute/College/api/hooks';
import MyPage from '@modules/MyPage';
import MyCard from '@modules/MyCard';
import { paths } from '@/paths';
import { Iconify } from '@minimal/components/iconify';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';

const MotherBranchWiseCollegeListPage = () => {
  const { systembranchID } = useParams();
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslate();

  const { postModel, handlePagination, handleFiltering } = useSystemBranchWiseCollegeListStore();
  const { data: collegeOptions } = useCollegeTypeOptions();
  const { data, totalRecords } = useSystemBranchWiseCollegeListQuery(postModel);
  const page = postModel.pageOffset + 1;
  const rowsPerPage = postModel.pageSize;

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
      SystemBranchID: systembranchID,
    });

    handlePagination({
      page: 0,
      pageSize: rowsPerPage,
    });
  }, [collegeOptions, currentTab]);

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
      (item: SystemBranchWiseCollegeistResponse) =>
        item.CollegeShortName?.toLowerCase().includes(s) ||
        item.StateName?.toLowerCase().includes(s) ||
        item.City?.toString().includes(s)
    );
  }, [debouncedSearch, data]);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <DashboardContent>
      <Helmet>
        <title>
          {t('Institute.Branch.MotherBranchWiseColleges.Label') + ` - ${CONFIG.appName}`}
        </title>
      </Helmet>
      <SimpleBreadcrumbs
        heading={t('Institute.Branch.MotherBranchWiseColleges.Label')}
        links={[{ name: 'Home' }, { name: t('Institute.Branch.MotherBranchWiseColleges.Label') }]}
      />
      <MyPage
        totalRecords={totalRecords}
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
      >
        <TabPanel value={1} sx={{ px: 0, pb: 0 }}>
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
            {filteredData.map((data: SystemBranchWiseCollegeistResponse) => (
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
        <TabPanel value={2} sx={{ px: 0, pb: 0 }}>
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
            {filteredData.map((data: SystemBranchWiseCollegeistResponse) => (
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
        <TabPanel value={3} sx={{ px: 0, pb: 0 }}>
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
            {filteredData.map((data: SystemBranchWiseCollegeistResponse) => (
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
        <TabPanel value={4} sx={{ px: 0, pb: 0 }}>
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
            {filteredData.map((data: SystemBranchWiseCollegeistResponse) => (
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
        <TabPanel value={5} sx={{ px: 0, pb: 0 }}>
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
            {filteredData.map((data: SystemBranchWiseCollegeistResponse) => (
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
export default MotherBranchWiseCollegeListPage;
