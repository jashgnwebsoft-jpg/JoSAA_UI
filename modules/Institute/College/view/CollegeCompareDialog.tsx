import { Field } from '@gnwebsoft/ui';
import { useTranslate } from '@minimal/utils/locales';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CollegeCompareRequest, CollegeCompareSchema } from '../types';
import { useCollegeCompareCollegeOptionsQuery } from '../api/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBranchWisePlacementByCollegeIDQuery } from '@modules/Institute/BranchWisePlacement/api/hooks';
import { useAdmissionOptions } from '@modules/Master/AdmissionYear/api/hooks';
import { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: CollegeCompareRequest) => void;
  defaultValues: CollegeCompareRequest | null;
};

const CollegeCompareDialog = ({ open, onClose, onSave, defaultValues }: Props) => {
  const { t } = useTranslate();

  const { handleSubmit, reset, control, watch } = useForm<CollegeCompareRequest>({
    resolver: zodResolver(CollegeCompareSchema),
    defaultValues: defaultValues ?? undefined,
  });

  useEffect(() => {
    if (open) {
      reset(
        defaultValues || {
          CollegeID: '',
          SystemBranchID: '',
          AdmissionYearID: '',
        }
      );
    }
  }, [open, defaultValues, reset]);

  const CollegeID = watch('CollegeID');

  const yearOptions = useAdmissionOptions();
  const collegeOptions = useCollegeCompareCollegeOptionsQuery();
  const branchByCollegeID = useBranchWisePlacementByCollegeIDQuery(CollegeID, !!CollegeID);

  const submit = (requestData: CollegeCompareRequest) => {
    onSave(requestData);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{defaultValues ? 'Edit College' : 'Add College'}</DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Field.Select
            control={control}
            size='small'
            name='CollegeID'
            label={t('Institute.College.List.Title') + '*'}
            options={collegeOptions.data || []}
          />
          <Field.SelectCascade
            control={control}
            name='SystemBranchID'
            label={t('Institute.Branch.List.Title')}
            placeholder={t('Institute.Branch.List.Title')}
            options={branchByCollegeID.data || []}
            dependsOn='CollegeID'
            disabled={branchByCollegeID.data?.length == 0}
            size='small'
          />
          <Field.Select
            control={control}
            size='small'
            name='AdmissionYearID'
            label={t('Institute.PreviousYearCutoffRow.year.Label') + '*'}
            placeholder={t('Institute.PreviousYearCutoffRow.year.Placeholder') + '*'}
            options={yearOptions.data || []}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={handleSubmit(submit)}>
          {defaultValues ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollegeCompareDialog;
