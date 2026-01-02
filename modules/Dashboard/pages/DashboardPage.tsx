import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Menu } from '../view/Menu';
import Cutoff from '../view/Cutoff';
import LatestNewsView from '@modules/Master/News/view/LatestNewsView';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../view/HeroSection';
import { CONFIG } from '@/global-config';
import { useTranslate } from '@minimal/utils/locales';

const DashboardPage = () => {
  const { t } = useTranslate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 3 }}>
      <Helmet>
        <title>{CONFIG.appName}</title>
      </Helmet>
      <HeroSection />
      <Box mx={4}>
        <Box pb={4}>
          <Typography variant='h5'>All India Admission for JoSAA</Typography>
          <Typography variant='subtitle2' color='textDisabled'>
            IIT, NIT, IIIT & GFTI
          </Typography>
        </Box>
        <Menu />
      </Box>
      <Grid container spacing={3} mx={4}>
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
      </Grid>
    </Box>
  );
};

export default DashboardPage;
