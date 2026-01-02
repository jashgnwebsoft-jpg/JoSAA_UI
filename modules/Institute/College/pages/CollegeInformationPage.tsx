import { DashboardContent } from '@minimal/layouts/dashboard';
import ProfileCollegeHeroSection from '../view/ProfileCover';
import { Helmet } from 'react-helmet-async';
import { SimpleBreadcrumbs } from '@minimal/components/SimpleBreadCrumbs';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Iconify } from '@minimal/components/iconify';
import IntakeListPage from '@modules/Institute/IntakeCutoff/pages/IntakeListPage';
import { useParams } from 'react-router';
import { useGetQuery } from '../api/hooks';
import { fNumber } from '@core/utils/format-number';
import CurrentYearWiseCutoffList from '@modules/Institute/PreviousYearCutoffRowData/pages/CurrentYearWiseCutoffListPage';
import PreviousYearWiseCutoffListPage from '@modules/Institute/PreviousYearCutoffRowData/pages/PreviousYearWiseCutoffListPage';
import RoundWiseChart from '@modules/Institute/PreviousYearCutoffRowData/pages/RoundWiseChart';
import { useTranslate } from '@minimal/utils/locales';
import { CONFIG } from '@/global-config';
import BranchWisePlacementListPage from '@modules/Institute/BranchWisePlacement/pages/BranchWisePlacementListPage';
import { useState } from 'react';
import FeesDeatilsView from './FeesDetailsView';

const CollegeInformationPage = () => {
  const { t } = useTranslate();
  const { collegeID } = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data } = useGetQuery(collegeID);

  return (
    <DashboardContent>
      <Helmet>
        <title>{t('Institute.College.CollegeDetails.Label') + ` - ${CONFIG.appName}`}</title>
      </Helmet>
      <SimpleBreadcrumbs
        heading={t('Institute.College.CollegeDetails.Label')}
        links={[{ name: 'Home' }, { name: t('Institute.College.CollegeDetails.Label') }]}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 }}>
        <ProfileCollegeHeroSection collegename={data?.CollegeName!} address={data?.Address!} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card>
              <CardHeader title='About' />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'flex-start',
                    my: 2,
                  }}
                >
                  <Iconify icon='maki:college' />
                  <Box>
                    <Typography variant='body1' color='textDisabled'>
                      {t('Institute.College.CollegeCode.Label')}
                    </Typography>
                    <Typography variant='subtitle1'>{data?.CollegeAdmissionCode}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'flex-start',
                    my: 2,
                  }}
                >
                  <Iconify icon='fluent:book-number-24-filled' />
                  <Box>
                    <Typography variant='body1' color='textDisabled'>
                      {t('Institute.College.NIRFCode.Label')}
                    </Typography>
                    <Typography variant='subtitle1'>{data?.NIRFRank ?? '-'}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'flex-start',
                    my: 2,
                  }}
                >
                  <Iconify icon='flowbite:building-solid' />
                  <Box>
                    <Typography variant='body1' color='textDisabled'>
                      {t('Institute.College.CollegeType.Label')}
                    </Typography>
                    <Typography variant='subtitle1'>{data?.CollegeTypeShortName}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'flex-start',
                    my: 2,
                  }}
                >
                  <Iconify icon='game-icons:wallet' />
                  <Box>
                    <Typography variant='body1' color='textDisabled'>
                      {t('Institute.College.Fees.Label')}
                    </Typography>
                    {/* <IconButton onClick={() => setOpen(true)} color='primary'>
                      <Iconify icon='solar:info-circle-bold' />
                    </IconButton> */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant='subtitle1'>{fNumber(data?.Fees)}/Sem</Typography>
                      {/* <Button onClick={() => setOpen(true)} size='small' variant='soft'>
                        View More
                      </Button> */}
                      <IconButton onClick={() => setOpen(true)} color='primary'>
                        <Iconify icon='solar:eye-closed-bold' />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'flex-start',
                    my: 2,
                  }}
                >
                  <Iconify icon='ri:global-fill' />
                  <Box>
                    <Typography variant='body1' color='textDisabled'>
                      {t('Institute.College.Website.Label')}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='a'
                      href={`https://${data?.Website}`}
                      target='_blank'
                      color='primary'
                    >
                      {data?.Website}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'flex-start',
                    my: 2,
                  }}
                >
                  <Iconify icon='bxs:phone-call' />
                  <Box>
                    <Typography variant='body1' color='textDisabled'>
                      {t('Institute.College.Phone.Label')}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='a'
                      href={`tel:${data?.Phone}`}
                      color='primary'
                    >
                      {data?.Phone}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'flex-start',
                    my: 2,
                  }}
                >
                  <Iconify icon='ic:baseline-email' />
                  <Box>
                    <Typography variant='body1' color='textDisabled'>
                      {t('Institute.College.Email.Label')}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      component='a'
                      href={`mailto:${data?.Email}`}
                      color='primary'
                    >
                      {data?.Email}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 9 }}>
            <RoundWiseChart />
          </Grid>
        </Grid>
        <IntakeListPage />
        <CurrentYearWiseCutoffList />
        <PreviousYearWiseCutoffListPage />
        <BranchWisePlacementListPage />
        <FeesDeatilsView
          collegeID={collegeID}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </Box>
    </DashboardContent>
  );
};
export default CollegeInformationPage;
