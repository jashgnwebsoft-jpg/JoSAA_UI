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
        <title>
          {t('Master.Website.List.Title')} - {CONFIG.appName}
        </title>

        <meta
          name='description'
          content='Curated list of useful websites with direct links, titles, and categories.'
        />

        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Website Directory',
            itemListElement: data?.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: item.WebsiteUrl,
              name: item.WebsiteTitle,
            })),
          })}
        </script>
      </Helmet>

      <SimpleBreadcrumbs
        heading={t('Master.Website.List.Title')}
        links={[{ name: 'Home' }, { name: t('Master.Website.List.Title') }]}
      />
      <Box component='section' sx={{ mb: 3 }}>
        <Typography component='h1' variant='h4'>
          Website Directory
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          This page lists curated websites with direct access links. Each website entry includes its
          title and official URL.
        </Typography>
      </Box>

      <Box
        component='section'
        role='list'
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
          <Card key={data.WebsiteID} role='listitem'>
            <CardContent>
              <Typography id={`website-${data.WebsiteID}`} variant='h6' component='h2'>
                {data.WebsiteTitle}
              </Typography>
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
                  <Iconify icon='solar:global-outline' />
                </Typography>
                <Link
                  href={data.WebsiteUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Visit ${data.WebsiteTitle}`}
                >
                  {data.WebsiteUrl}
                </Link>
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
