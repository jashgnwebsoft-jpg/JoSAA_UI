import { paths } from '@/paths';
import { Field } from '@gnwebsoft/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslate } from '@minimal/utils/locales';
import { useCollegeTypeOptions } from '@modules/Institute/College/api/hooks';
import { useMeritRankWiseCutOffListStore } from '@modules/Institute/PreviousYearCutoffRowData/api/store';
import {
  MeritRankCutOffRequest,
  MeritRankCutOffSchema,
} from '@modules/Institute/PreviousYearCutoffRowData/types';
import { useCategoryOptions } from '@modules/Master/Category/api/hooks';
import { useProgarmOptions } from '@modules/Master/Program/api/hooks';
import { useReservationTypeOptions } from '@modules/Master/ReservationType/api/hooks';
import { useSystemBranchOptions } from '@modules/Master/SystemBranch/api/hooks';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react'; // Added useRef
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const Cutoff = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const isInitialized = useRef(false);

  const { postModel, handleFiltering } = useMeritRankWiseCutOffListStore();

  const { control, handleSubmit, reset, watch } = useForm<MeritRankCutOffRequest>({
    resolver: zodResolver(MeritRankCutOffSchema),
  });

  const categoryOptions = useCategoryOptions();
  const reservationTypeOptions = useReservationTypeOptions();
  const systemBranchOptions = useSystemBranchOptions();

  const systemBranchOptionsWithAll = useMemo(() => {
    if (!systemBranchOptions.data) return [];
    return [{ Value: '', Label: 'All' }, ...systemBranchOptions.data];
  }, [systemBranchOptions.data]);

  const rankOptions = [
    { Label: 'JEE Advance', Value: 1 },
    { Label: 'JEE Main - I', Value: 2 },
    { Label: 'JEE Main - II', Value: 3 },
  ];

  const AirRank = watch('AirRank');
  const programOptions = useProgarmOptions(AirRank, !!AirRank);

  const programOptionsWithAll = useMemo(() => {
    if (!programOptions.data) return [];
    return [{ Value: '', Label: 'All' }, ...programOptions.data];
  }, [programOptions.data]);

  const collegeTypeOptions = useCollegeTypeOptions();
  const collegeTypeOptionsWithAll = useMemo(() => {
    if (!collegeTypeOptions.data) return [];

    return [{ Value: '', Label: 'All' }, ...collegeTypeOptions.data];
  }, [collegeTypeOptions.data]);

  useEffect(() => {
    const isDataLoaded =
      categoryOptions.data && reservationTypeOptions.data && systemBranchOptions.data;

    if (!isDataLoaded) return;

    if (postModel.filterModel && Object.keys(postModel.filterModel).length > 0) {
      reset(postModel.filterModel);
      isInitialized.current = true;
    } else if (!isInitialized.current) {
      reset({
        AirRank: rankOptions[0].Value,
        MeritRank: '1',
        CategoryID: categoryOptions.data?.[0]?.Value,
        SeatPoolID: reservationTypeOptions.data?.[0]?.Value,
        CollegeType: collegeTypeOptionsWithAll[0].Value,
        CourseID: '',
        BranchID: '',
      });
      isInitialized.current = true;
    }
  }, [
    postModel.filterModel,
    categoryOptions.data,
    reservationTypeOptions.data,
    systemBranchOptions.data,
    collegeTypeOptionsWithAll,
    reset,
  ]);

  const onSubmit = handleSubmit(async data => {
    handleFiltering(data);
    navigate(paths.josaa.cutoff.root);
  });

  const handleReset = () => {
    reset({
      AirRank: rankOptions[0].Value,
      MeritRank: '',
      CategoryID: categoryOptions.data?.[0]?.Value,
      SeatPoolID: reservationTypeOptions.data?.[0]?.Value,
      CourseID: '',
      BranchID: '',
    });
    handleFiltering({} as MeritRankCutOffRequest);
  };

  return (
    <Card sx={{ height: 550 }}>
      <CardHeader title='Cut-OFF' />
      <CardContent>
        <Box
          component='form'
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          onSubmit={onSubmit}
        >
          <Field.Select
            control={control}
            name='AirRank'
            label={t('Institute.PreviousYearCutoffRow.AirRank.Label') + '*'}
            placeholder={t('Institute.PreviousYearCutoffRow.AirRank.Label') + '*'}
            options={rankOptions || []}
            size='small'
          />
          {(AirRank === 2 || AirRank === 3) && (
            <Field.Select
              control={control}
              size='small'
              name='CollegeType'
              label={t('Institute.College.CollegeType.Label')}
              placeholder={t('Institute.College.CollegeType.Placeholder')}
              options={collegeTypeOptionsWithAll}
            />
          )}
          <Field.Select
            control={control}
            name='CategoryID'
            label={t('Master.Category.Category.Label') + '*'}
            placeholder={t('Master.Category.Category.Placeholder') + '*'}
            options={categoryOptions.data || []}
            size='small'
          />
          <Field.Text
            control={control}
            name='MeritRank'
            label={t('Institute.PreviousYearCutoffRow.MeritRank.Label') + '*'}
            placeholder={t('Institute.PreviousYearCutoffRow.MeritRank.Label') + '*'}
          />
          <Field.Select
            control={control}
            name='SeatPoolID'
            label={t('Master.ReservationType.SeatPool.Label') + '*'}
            placeholder={t('Master.ReservationType.SeatPool.Placeholder') + '*'}
            options={reservationTypeOptions.data || []}
            size='small'
          />
          <Field.Select
            control={control}
            name='CourseID'
            label={t('Master.Program.Course.Label')}
            placeholder={t('Master.Program.Course.Placeholder')}
            options={programOptionsWithAll}
            size='small'
          />
          <Field.Select
            control={control}
            name='BranchID'
            label={t('Institute.Branch.List.Title')}
            placeholder={t('Institute.Branch.List.Title')}
            options={systemBranchOptionsWithAll}
            size='small'
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <Button variant='contained' color='primary' type='submit'>
              Submit
            </Button>
            <Button variant='soft' type='button' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Cutoff;
