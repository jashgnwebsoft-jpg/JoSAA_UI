import type { OperationResponse } from '@gnwebsoft/ui';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { api, Field, handleServerErrors } from '@gnwebsoft/ui';

import { Box, Alert } from '@mui/material';

import { endpoints } from '../api/endpoints';
import { useLocaleStore } from '../api/store';
import { TableFormSchema } from '../types/Form';
import { LocaleQueries } from '../api/query';

import type { TableFormModel } from '../types/Form';
import { toast } from 'sonner';
import SubmitButton from '@core/components/SubmitButton';

export const LanguageOptions = [{ Value: 'en', Label: 'English' }];

export const getSaveSuccessMessage = (id: number | null | undefined): string =>
  `Record ${id ? 'updated' : 'inserted'} successfully`;

export const FormView = () => {
  // const [inputValue, setInputValue] = useState('');
  const {
    control,
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<TableFormModel>({
    resolver: zodResolver(TableFormSchema),
  });

  const { postModel } = useLocaleStore();
  const queryClient = useQueryClient();

  const onSubmit = handleSubmit(async formData => {
    if (isSubmitting) return;
    let minified = '';
    try {
      const parsedJson = JSON.parse(formData.Value);
      minified = JSON.stringify(parsedJson);
    } catch {
      toast.error('Please enter JSON without table name or remove comma after json');
    }
    const data = JSON.parse(minified);
    const Payload = {
      LocaleID: formData.LocaleID!,
      Language: formData.Language,
      TableName: formData.TableName,
      Value: data,
    };
    const response = await api.post<OperationResponse>(endpoints.create, Payload);
    if (response.status === 200 || response?.status === 201) {
      queryClient.removeQueries({
        queryKey: LocaleQueries.list(postModel).queryKey,
      });
      toast.success(getSaveSuccessMessage(formData.LocaleID));
      reset();
    } else if (response.status === 400) {
      if (response.errors) {
        if (response.modelErrors) {
          handleServerErrors({
            errors: response.errors,
            setError,
          });
        } else {
          toast.error(response.title);
        }
      }
    }
  });

  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '90%',
        gap: 4,
        mt: 5,
        ml: 3,
      }}
    >
      <Alert variant='outlined' severity='warning' sx={{ mb: 3 }}>
        Note : JSON Must be without Table Name
      </Alert>
      <Field.Text
        control={control}
        name='TableName'
        label='Table Name With Prefix'
        placeholder='Enter Table Name With Prefix'
        gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 } }}
      />
      <Field.Select
        control={control}
        options={LanguageOptions || []}
        name='Language'
        label='Language'
        placeholder='Select Language'
        gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 } }}
        size='small'
      />
      <Field.Text
        control={control}
        name='Value'
        label='Unformatted JSON(Without Space)'
        placeholder='Enter Unformatted JOSN'
        gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 } }}
        textFieldProps={{
          rows: 15,
          multiline: true,
        }}
      />
      <SubmitButton loading={isSubmitting} />
    </Box>
  );
};

export default FormView;
