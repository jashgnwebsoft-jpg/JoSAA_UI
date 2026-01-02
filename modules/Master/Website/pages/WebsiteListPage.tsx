import { Box, Card, CardContent, Link, Pagination, Typography } from '@mui/material';
import { useWebsiteListStore } from '../api/store';
import { useListQuery } from '../api/hooks';
import { ListResponse } from '../types';
import { DashboardContent } from '@minimal/layouts/dashboard';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import { Helmet } from 'react-helmet-async';
import { Iconify } from '@minimal/components/iconify';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';

const WebsiteListPage = () => {
  const { postModel, handlePagination } = useWebsiteListStore();
  const { data } = useListQuery(postModel);
  const { t } = useTranslate();

  const page = postModel.pageOffset + 1;
  const rowsPerPage = postModel.pageSize;

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    handlePagination({
      page: newPage - 1,
      pageSize: rowsPerPage,
    });
  };

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Master.Website.List.Title') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <SimpleBreadcrumbs
        heading={t('Master.Website.List.Title')}
        links={[{ name: 'Home' }, { name: t('Master.Website.List.Title') }]}
      />
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
        {data.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((data: ListResponse) => (
          <Card>
            <CardContent>
              <Typography variant='h6'>{data.WebsiteTitle}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 0.5,
                  mt: 1,
                  alignItems: 'flex-start',
                }}
              >
                <Typography color='primary'>
                  <Iconify icon='ri:global-fill' width='14px' />
                </Typography>
                <Typography
                  component='a'
                  href={data.WebsiteUrl}
                  color='primary'
                  target='_blank'
                  variant='body2'
                >
                  {data.WebsiteUrl}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Pagination
        page={page}
        shape='circular'
        count={Math.ceil(data.length / rowsPerPage)}
        onChange={handleChangePage}
        sx={{ my: 3 }}
      />
    </DashboardContent>
  );
};
export default WebsiteListPage;
