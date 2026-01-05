import { paths } from '@/paths';
import { Field } from '@gnwebsoft/ui';
import { MotionContainer, varFade } from '@minimal/components/animate';
import { BoxProps, Box, Container, Typography, outlinedInputClasses } from '@mui/material';
import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useCollegeAsyncQuery } from '../api/query';
import { useTranslate } from '@minimal/utils/locales';
import { useCurrentYearQuery } from '@modules/Master/AdmissionYear/api/hooks';

const HeroSection = ({ sx, ...other }: BoxProps) => {
  const { control, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const college = watch('CollegeID');
  const { t } = useTranslate();

  if (college !== undefined && college !== null) {
    navigate(paths.josaa.collegeinformation.root(college));
  }

  const { data: currentYear } = useCurrentYearQuery();

  return (
    <Box
      component='section'
      sx={[
        theme => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)})`,
              `url(https://www.shutterstock.com/image-photo/roorkee-india-july-12-administrative-260nw-2495641377.jpg)`,
            ],
          }),
          overflow: 'hidden',
          height: { md: 560 },
          position: 'relative',
          py: { xs: 10, md: 0 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 150 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
          <Typography component='h1' variant='h1' color='primary'>
            JoSAA Admission Information {currentYear?.AdmissionYear}
          </Typography>
          <Typography component='h5' variant='h5' sx={{ color: 'common.white' }}>
            Your complete guide to IIT, IIIT, NIT & GFTI admissions through JEE. Get the latest
            cutoffs, college information and admission guidance.
          </Typography>
          <m.div variants={varFade('inUp', { distance: 24 })}>
            <Box component='form'>
              <Field.AsyncSelect
                control={control}
                name='CollegeID'
                placeholder={t('Dashboard.Dashboard.College.Placeholder')}
                queryFn={useCollegeAsyncQuery}
                size='small'
                sx={{
                  mt: 5,
                  maxWidth: 600,
                  [`& .${outlinedInputClasses.root}`]: { bgcolor: 'common.white' },
                  [`& .${outlinedInputClasses.input}`]: { typography: 'subtitle1' },
                }}
              />
            </Box>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
};
export default HeroSection;
