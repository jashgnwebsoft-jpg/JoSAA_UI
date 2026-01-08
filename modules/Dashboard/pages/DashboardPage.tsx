import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Menu } from '../view/Menu';
import Cutoff from '../view/Cutoff';
import LatestNewsView from '@modules/Master/News/view/LatestNewsView';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../view/HeroSection';
import { CONFIG } from '@/global-config';
import { useTranslate } from '@minimal/utils/locales';
import { DashboardContent } from '@minimal/layouts/dashboard';

const DashboardPage = () => {
  const { t } = useTranslate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 3 }}>
      <Helmet>
        <title>{CONFIG.appName}</title>
      </Helmet>
      <HeroSection />
      <DashboardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant='h5'>All India Admission for JoSAA</Typography>
            <Typography variant='subtitle2' color='textDisabled'>
              IIT, NIT, IIIT & GFTI
            </Typography>
          </Box>
          <Menu />
          {/* <Grid container spacing={3}>
            <Grid size={{ sm: 12, md: 6 }}>
              <Cutoff />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <Card sx={{ height: 550 }}>
                <CardHeader title='Latest News' />
                <CardContent sx={{ height: '100%', overflowY: 'scroll' }}>
                  <LatestNewsView />
                </CardContent>
              </Card>
            </Grid>
          </Grid> */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Cutoff />
            <Card sx={{ height: 550 }}>
              <CardHeader title='Latest News' />
              <CardContent sx={{ height: '100%', overflowY: 'scroll' }}>
                <LatestNewsView />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </DashboardContent>
    </Box>
  );
};

export default DashboardPage;
