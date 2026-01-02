import type { ChangeEvent } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import axios from 'axios';
import { useRef, useState } from 'react';
import { useController } from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {
  Box,
  Grid,
  Tooltip,
  TextField,
  IconButton,
  Typography,
  LinearProgress,
  GridProps
} from '@mui/material';

import { CONFIG } from 'src/global-config';

import { toast } from '@minimal/components/snackbar';
import { Iconify } from '../../../minimal/components/iconify';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

type ResumeUploadResponse = {
  uid: number;
  name: string;
  status: string;
  url: string;
  error: string;
  tableName: string;
  title: string;
};

type FileElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue = unknown,
> = {
  control: Control<TFieldValues>;
  value?: TValue;
  fileId: TName;
  fileUrl: TName;
  error: boolean;
  disabled: boolean;
  tableName: string;
  placeholder?: string;
  gridProps?: GridProps;
  note?: string;
  maxSizeMB?: number;
  allowedTypes?: string[];
  required?: boolean;
};

export const ResumeUpload = function FileElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue = unknown,
>({
  control,
  fileId,
  fileUrl,
  disabled,
  tableName,
  placeholder,
  gridProps,
  required,
  note,
  maxSizeMB,
  allowedTypes,
}: FileElementProps<TFieldValues, TName, TValue>) {
  const {
    field: fileIdField,
    fieldState: { error: fileIdFieldError },
  } = useController({
    name: fileId,
    control,
  });

  const { field: fileUrlField } = useController({
    name: fileUrl,
    control,
  });

  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [fileUploadResponse, setFileUploadResponse] = useState<FileUploadResponse>();
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  // const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     await uploadFile(e.target.files[0]);
  //   }
  // };

  const deleteFile = async (id: number) => {
    if (!tableName) {
      return;
    }
    const deleteData = new FormData();
    deleteData.append('DocumentId', id.toString());
    deleteData.append('TableName', tableName);
    deleteData.append('FieldName', fileIdField.name);
    deleteData.append('userId', '1');

    try {
      const response = await axios.post<ResumeUploadResponse>(
        `${CONFIG.apiBaseUrl}/api/CMS_Documents/imageDelete`,
        deleteData,
        {
          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${localStorage.getItem('serviceToken')}`,
          },
        }
      );
      if (response.data.status === 'Success') {
        setFile(null);
        toast.success('File deleted successfully.');

        // setFileUploadResponse(undefined);
        setUploadProgress(0);
        fileUrlField.onChange(null);
        fileIdField.onChange(null);
        setStatus('success');
      } else {
        setStatus('error');
        toast.error(response.data.title);
      }
    } catch (errors: any) {
      toast.error(
        errors?.response?.data?.title ||
          errors?.response?.statusText ||
          'An error occurred during file deletion.'
      );
      setStatus('error');
    }
  };

  const uploadFile = async (uploadfile: File) => {
    const formData = new FormData();
    formData.append('file', uploadfile!);
    formData.append('userId', '1');
    formData.append('documentType', '2');
    formData.append('generateThumbnail', 'false');
    formData.append('replaceFileName', 'false');
    setStatus('uploading');

    try {
      const response = await axios.post<ResumeUploadResponse>(
        `${CONFIG.apiBaseUrl}/api/CMS_Documents/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('serviceToken')}`,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
        }
      );

      // setFileUploadResponse(response.data);

      if (response.data.status === 'Success') {
        setStatus('success');
        toast.success('File uploaded successfully.');
        fileUrlField.onChange(response.data.url);
        fileIdField.onChange(response.data.uid);

        setUploadProgress(100);
      } else if (response.data?.status === 'error') {
        toast.error(response.data?.error);
      } else {
        toast.error(response?.data?.error);
        setStatus('error');
        setUploadProgress(0);

        fileUrlField.onChange(null);
        fileIdField.onChange(null);

        fileUrlField.onBlur();
        fileIdField.onBlur();
      }
    } catch (errors) {
      if (axios.isAxiosError(errors) && errors.response) {
        const concateError: string[] = [];
        for (const [key, value] of Object.entries(errors.response.data?.errors || {})) {
          if (typeof value === 'string') {
            concateError.push(value);
          } else {
            concateError.push(String(value));
          }
        }
        const errorMessage =
          concateError.join('. ').trim() ||
          errors.response.data?.title ||
          'An error occurred during file upload.';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred.');
      }
      setStatus('error');
      setUploadProgress(0);

      fileUrlField.onChange(null);
      fileIdField.onChange(null);

      fileUrlField.onBlur();
      fileIdField.onBlur();
    } finally {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const downloadFile = async (url: string) => {
    try {
      const response = await fetch(url); // or axios.get(url, { responseType: 'blob' });
      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = url.split('/').pop()!; // Use the file name from the URL or set a custom name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobURL); // Clean up memory
    } catch (errors) {
      console.error('Download error:', errors);
    }
  };

  const changeFile = async (oldFileId: number, newFile: File) => {
    const formData = new FormData();
    formData.append('oldFileId', oldFileId.toString());
    formData.append('file', newFile!);
    formData.append('userId', '1');
    formData.append('documentType', '2');
    formData.append('generateThumbnail', 'false');
    formData.append('replaceFileName', 'false');
    formData.append('TableName', tableName);
    formData.append('FieldName', fileIdField.name);
    setStatus('uploading');

    try {
      const response = await axios.post<ResumeUploadResponse>(
        `${CONFIG.apiBaseUrl}/api/CMS_Documents/changeFile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('serviceToken')}`,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
        }
      );

      if (response.data.status === 'Success') {
        setStatus('success');
        toast.success('File uploaded successfully.');
        fileUrlField.onChange(response.data.url);
        fileIdField.onChange(response.data.uid);

        setUploadProgress(100);
      } else if (response.data?.status === 'error') {
        toast.error(response.data?.error);
      } else {
        toast.error(response?.data?.error);
        setStatus('error');
        setUploadProgress(0);

        fileUrlField.onChange(null);
        fileIdField.onChange(null);

        fileUrlField.onBlur();
        fileIdField.onBlur();
      }
    } catch (errors) {
      if (axios.isAxiosError(errors) && errors.response) {
        const concateError: string[] = [];
        for (const [key, value] of Object.entries(errors.response.data?.errors || {})) {
          if (typeof value === 'string') {
            concateError.push(value);
          } else {
            concateError.push(String(value));
          }
        }
        const errorMessage =
          concateError.join('. ').trim() ||
          errors.response.data?.title ||
          'An error occurred during file upload.';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred.');
      }
      setStatus('error');
      setUploadProgress(0);
      fileIdField.onChange(oldFileId);
      fileUrlField.onChange(fileUrlField.value);

      fileUrlField.onBlur();
      fileIdField.onBlur();
    } finally {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      if (maxSizeMB && selectedFile.size > maxSizeMB * 1024 * 1024) {
        toast.error(`File size should not exceed ${maxSizeMB}MB.`);
        if (inputRef.current) inputRef.current.value = '';
        return;
      }

      if (allowedTypes && !allowedTypes.includes(selectedFile.type)) {
        toast.error('File type not allowed.');
        if (inputRef.current) inputRef.current.value = '';
        return;
      }

      if (e.target.files && required && e.target.files.length > 0 && fileIdField.value) {
        changeFile(fileIdField.value, e.target.files[0]);
      } else if (e.target.files) {
        await uploadFile(e.target.files[0]);
      }
    }
  };

  const Component = (
    <>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Tooltip
          title={
            file?.name ? (
              file.name
            ) : fileUrlField.value ? (
              fileUrlField.value.split('/').pop()
            ) : status === 'uploading' ? (
              <Box sx={{ fontSize: 12, color: 'white' }}>Uploading... {uploadProgress}%</Box>
            ) : (
              `${placeholder ? placeholder : 'Upload File'}`
            )
          }
          arrow
        >
          <>
            <TextField
              fullWidth
              variant="outlined"
              label={placeholder || 'Upload File'}
              placeholder={status === 'uploading' ? '' : placeholder || 'Upload File'}
              slotProps={{
                inputLabel: {
                  shrink:
                    fileUrlField.value ||
                    fileIdField.value ||
                    (file && file.name) ||
                    status == 'uploading'
                      ? true
                      : false,
                },
                input: {
                  readOnly: true,
                  sx: {
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    height: 36,
                    minHeight: 36,
                    fontSize: 14,
                  },
                  endAdornment: (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {!fileIdField.value && status !== 'uploading' && (
                        <Tooltip title="Upload File" arrow>
                          <span>
                            <IconButton
                              component="span"
                              disabled={disabled}
                              tabIndex={-1}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!disabled && inputRef.current) {
                                  inputRef.current.click();
                                }
                              }}
                              size="small"
                            >
                              <CloudUploadIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                      {fileUrlField.value && (
                        <Tooltip title="Download File" arrow>
                          <IconButton
                            onClick={() => downloadFile(fileUrlField.value)}
                            size="small"
                            sx={{ bgcolor: '#e7e7e7' }}
                          >
                            <Iconify icon="material-symbols:download" color="#0284C7" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {required && fileUrlField.value && (
                        <Tooltip title="Change File" arrow>
                          <span>
                            <IconButton
                              component="span"
                              disabled={disabled}
                              tabIndex={-1}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!disabled && inputRef.current) {
                                  inputRef.current.click();
                                }
                              }}
                              size="small"
                            >
                              <ChangeCircleIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                      {!required && fileUrlField.value && (
                        <Tooltip title="Delete File" arrow>
                          <span>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);

                                // setFileUploadResponse(undefined);
                                setUploadProgress(0);
                                deleteFile(fileIdField?.value);
                                fileUrlField.onChange(null);
                                fileIdField.onChange(null);
                              }}
                              disabled={disabled}
                              tabIndex={-1}
                              size="small"
                              sx={{ bgcolor: '#e7e7e7', color: 'error.main' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                    </Box>
                  ),
                },
              }}
              error={!!fileIdFieldError}
              disabled={disabled}
              value={
                file && file.name
                  ? file.name
                  : fileUrlField.value
                    ? fileUrlField.value.split('/').pop()
                    : ''
              }
              helperText={fileIdFieldError?.message}
              onClick={() => {
                if (!disabled && inputRef.current && !fileIdField.value) {
                  inputRef.current.click();
                }
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: 38.5,
                  minHeight: 38.5,
                  fontSize: 14,
                  padding: '0 8px',
                  pl: 0,
                },
                '& .MuiInputLabel-root': {
                  fontSize: 13,
                  top: '-7px',
                  left: 0,
                },
              }}
            />
            {note && (
              <Typography
                sx={{
                  color: 'error.main',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  lineHeight: '1.5',
                  mt: '4px',
                  mr: '14px',
                }}
              >
                Note: {note}
              </Typography>
            )}
          </>
        </Tooltip>
        {status === 'uploading' && (
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 5,
              top: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <Tooltip
              title={
                file?.name ? (
                  file.name
                ) : fileUrlField.value ? (
                  fileUrlField.value.split('/').pop()
                ) : status === 'uploading' ? (
                  <Box sx={{ fontSize: 12, color: 'white' }}>Uploading... {uploadProgress}%</Box>
                ) : (
                  `${placeholder ? placeholder : 'Upload File'}`
                )
              }
              arrow
            >
              <Box sx={{ minWidth: 80, width: '90%' }}>
                <LinearProgress
                  color="primary"
                  variant="determinate"
                  value={uploadProgress}
                  sx={{ height: 4, borderRadius: 2, flex: 1 }}
                />
              </Box>
            </Tooltip>
          </Box>
        )}
      </Box>
      <input
        type="file"
        id={`file-upload-${fileIdField.name}`}
        style={{ display: 'none' }}
        disabled={disabled}
        ref={inputRef}
        onChange={handleFileChange}
        key={file ? file.name : fileUrlField.value ? fileUrlField.value : undefined}
        accept={allowedTypes?.join(',')}
      />
    </>
  );

  if (gridProps) {
    return <Grid {...gridProps}>{Component}</Grid>;
  }
  return Component;
};
