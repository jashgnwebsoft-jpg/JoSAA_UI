import { Box, Divider, TextField } from '@mui/material';
import { useReportingCenterListStore } from '../api/store';
import { useReportingCenterListQuery } from '../api/hooks';
import { ReportingCenterListResponse } from '../types';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { Helmet } from 'react-helmet-async';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { TabPanel } from '@mui/lab';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import MyPage from '@modules/MyPage';
import MyCard from '@modules/MyCard';
import { paths } from '@/paths';
import { useCollegeTypeOptions } from '@modules/Institute/College/api/hooks';
import { Iconify } from '@minimal/components/iconify';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';

const ReportingCenterListPage = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslate();

  const { postModel, handlePagination, handleFiltering } = useReportingCenterListStore();
  const { data, totalRecords } = useReportingCenterListQuery(postModel);
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
    const labelMap: Record<number, string | null> = {
      1: 'IIT',
      2: null,
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
      (item: ReportingCenterListResponse) =>
        item.ReportingCentreName?.toLowerCase().includes(s) ||
        item.Address?.toLowerCase().includes(s) ||
        item.Website?.toString().includes(s)
    );
  }, [debouncedSearch, data]);

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Institute.ReportingCenter.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <SimpleBreadcrumbs
        heading={t('Institute.ReportingCenter.List.Title')}
        links={[{ name: 'Home' }, { name: t('Institute.ReportingCenter.List.Title') }]}
      />
      <MyPage
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        tabs={[
          { label: 'IIT', value: 1 },
          { label: 'NIT, IIIT & GFTI', value: 2 },
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
              },
            }}
          >
            {filteredData.map((data: ReportingCenterListResponse) => (
              <MyCard
                city={null}
                rank={data?.CollegeAdmissionCode}
                key={data?.ReportingCentreID}
                shortName={data?.ReportingCentreName}
                location={data?.Address}
                otherElement={
                  <>
                    {data?.Phone && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='bxs:phone-call' />
                        {data?.Phone}
                      </Box>
                    )}
                    {data?.Fax && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='material-symbols:fax' />
                        {data?.Fax}
                      </Box>
                    )}
                    {data?.Website && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='ri:global-fill' />
                        {data?.Website}
                      </Box>
                    )}
                  </>
                }
                onClick={() =>
                  data?.CollegeID && navigate(paths.josaa.collegeinformation.root(data?.CollegeID))
                }
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
              },
            }}
          >
            {filteredData.map((data: ReportingCenterListResponse) => (
              <MyCard
                city={null}
                rank={data?.CollegeAdmissionCode}
                key={data?.ReportingCentreID}
                shortName={data?.ReportingCentreName}
                location={data?.Address}
                otherElement={
                  <>
                    {data?.Phone && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='bxs:phone-call' />
                        {data?.Phone}
                      </Box>
                    )}
                    {data?.Fax && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='material-symbols:fax' />
                        {data?.Fax}
                      </Box>
                    )}
                    {data?.Website && (
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Iconify icon='ri:global-fill' />
                        {data?.Website}
                      </Box>
                    )}
                  </>
                }
                onClick={() => navigate(paths.josaa.collegeinformation.root(data?.CollegeID))}
              />
            ))}
          </Box>
        </TabPanel>
      </MyPage>
    </DashboardContent>
  );
};
export default ReportingCenterListPage;
