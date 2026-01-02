import type { OperationResponse } from '@gnwebsoft/ui';

import { useQueryClient } from '@tanstack/react-query';
import { useForm, useFieldArray } from 'react-hook-form';
import { api, Field, handleServerErrors } from '@gnwebsoft/ui';

import {
  Box,
  Table,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';

import { endpoints } from '../api/endpoints';
import { useLocaleStore } from '../api/store';
import { LocaleQueries } from '../api/query';

import type { FieldName } from '../types/List';
import { toast } from 'sonner';
import { getUpdateSuccessMessage } from '@core/utils/constants';
import SubmitButton from '@core/components/SubmitButton';

type Props = {
  localeID: number;
  language: string;
  field: FieldName;
};

type FieldItems = {
  fieldName: string;
  Label?: string;
  Placeholder?: string;
  Enabled?: boolean;
  Title?: string;
};

type FormValues = {
  fields: FieldItems[];
};

const columnHeaders = ['Field Name', 'Label', 'Placeholder', 'Enabled', 'Actions'];

const objectToFieldArray = (field: FieldName) =>
  Object.entries(field).map(([key, value]) => ({
    fieldName: key,
    ...value,
  }));

const arrayToFieldObject = (fields: FieldItems[]): FieldName =>
  fields.reduce((acc, cur) => {
    const { fieldName, ...rest } = cur;
    acc[fieldName] = rest;
    return acc;
  }, {} as FieldName);

const TableFieldForm = ({ field, localeID, language }: Props) => {
  const queryClient = useQueryClient();

  const { postModel } = useLocaleStore();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { fields: objectToFieldArray(field) },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const onSubmit = handleSubmit(async formData => {
    const transformedFields = arrayToFieldObject(formData.fields);

    const payload = {
      LocaleID: localeID,
      Value: transformedFields,
      Language: language,
    };

    const response = await api.put<OperationResponse>(endpoints.update, payload);
    if (response.status === 200 || response?.status === 201) {
      queryClient.invalidateQueries({
        queryKey: LocaleQueries.list(postModel).queryKey,
      });
      toast.success(getUpdateSuccessMessage);
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
      sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: 2 }}
    >
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table size='small' stickyHeader sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              {columnHeaders.map(header => (
                <TableCell
                  key={header}
                  align={header === 'Enabled' || header == 'Actions' ? 'center' : 'left'}
                >
                  <strong>{header}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((item, index) => (
              <TableRow key={item.id}>
                {!item?.fieldName ? (
                  <TableCell>
                    <Field.Text
                      control={control}
                      name={`fields.${index}.fieldName`}
                      label=''
                      placeholder='Field Name'
                    />
                  </TableCell>
                ) : (
                  <TableCell>{item?.fieldName}</TableCell>
                )}
                {['List', 'Create', 'Edit', 'ViewModel'].includes(item.fieldName) ? (
                  <>
                    <TableCell colSpan={2}>
                      <Field.Text
                        control={control}
                        name={`fields.${index}.Title`}
                        label=''
                        placeholder='Title'
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Field.Checkbox control={control} name={`fields.${index}.Enabled`} label='' />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      <Field.Text
                        control={control}
                        name={`fields.${index}.Label`}
                        label=''
                        placeholder='Label'
                        gridProps={{ size: { xs: 12 } }}
                      />
                    </TableCell>

                    <TableCell>
                      <Field.Text
                        control={control}
                        name={`fields.${index}.Placeholder`}
                        label=''
                        placeholder='Placeholder'
                        gridProps={{ size: { xs: 12 } }}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Field.Checkbox
                        control={control}
                        name={`fields.${index}.Enabled`}
                        label=''
                        gridProps={{ size: { xs: 12 } }}
                      />
                    </TableCell>
                  </>
                )}
                <TableCell align='center'>
                  <Button
                    onClick={() => remove(index)}
                    variant='outlined'
                    color='error'
                    size='small'
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button
          variant='outlined'
          color='primary'
          onClick={() =>
            append({ fieldName: '', Label: '', Placeholder: '', Enabled: false, Title: '' })
          }
        >
          Add Field
        </Button>
        <SubmitButton loading={isSubmitting} />
      </Box>
    </Box>
  );
};

export default TableFieldForm;
