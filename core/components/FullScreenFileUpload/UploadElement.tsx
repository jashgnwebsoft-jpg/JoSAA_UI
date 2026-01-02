import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import axios from 'axios';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController } from 'react-hook-form';
import { varAlpha } from 'minimal-shared/utils';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, Tooltip, IconButton, LinearProgress, FormHelperText, GridProps } from '@mui/material';

import { CONFIG } from 'src/global-config';

import { toast } from '@minimal/components/snackbar';
import { Iconify } from '../../../minimal/components/iconify';

import { UploadPlaceholder } from './placeholder';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

type FileUploadResponse = {
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
  accept?: string[];
};

export const UploadElement = function FileElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue = unknown,
>({
  control,
  fileId,
  fileUrl,
  disabled,
  tableName,
  gridProps,
  accept,
}: FileElementProps<TFieldValues, TName, TValue>) {
  const {
    field: fileIdField,
    fieldState: { error: fileIdFieldError },
  } = useController({ name: fileId, control });

  const { field: fileUrlField } = useController({ name: fileUrl, control });

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setFile(acceptedFiles[0]);
      await uploadFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    disabled,
    onDrop,
    accept: accept
      ? (Object.fromEntries(accept.map((type) => [type, []])) as Record<string, string[]>)
      : undefined,
  });

  const uploadFile = async (uploadfile: File) => {
    const formData = new FormData();
    formData.append('file', uploadfile);
    formData.append('userId', '1');
    formData.append('documentType', '2');
    formData.append('generateThumbnail', 'false');
    formData.append('replaceFileName', 'false');

    setStatus('uploading');

    try {
      const response = await axios.post<FileUploadResponse>(
        `${CONFIG.apiBaseUrl}/api/CMS_Documents/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('serviceToken')}`,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
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
      } else {
        toast.error(response.data.error || 'Upload failed.');
        resetFileState();
      }
    } catch {
      toast.error('An error occurred during file upload.');
      resetFileState();
    }
  };

  const deleteFile = async (id: number) => {
    const deleteData = new FormData();
    deleteData.append('DocumentId', id.toString());
    deleteData.append('TableName', tableName);
    deleteData.append('FieldName', fileIdField.name);
    deleteData.append('userId', '1');

    try {
      const response = await axios.post<FileUploadResponse>(
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
        toast.success('File deleted successfully.');
        resetFileState();
      } else {
        toast.error(response.data.title);
      }
    } catch {
      toast.error('An error occurred during file deletion.');
    }
  };

  const resetFileState = () => {
    setFile(null);
    setStatus('idle');
    setUploadProgress(0);
    fileUrlField.onChange(null);
    fileIdField.onChange(null);
  };

  const downloadFile = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = url.split('/').pop() || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobURL);
    } catch {
      toast.error('Failed to download file.');
    }
  };

  const hasFile = !!fileUrlField.value;

  const Component = (
    <Box sx={{ width: 1, position: 'relative' }}>
      <Box
        {...getRootProps()}
        sx={[
          (theme) => ({
            p: 5,
            outline: 'none',
            borderRadius: 1,
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative',
            bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
            border: `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
            transition: theme.transitions.create(['opacity', 'padding']),
            '&:hover': { opacity: 0.72 },
            ...(isDragActive && { opacity: 0.72 }),
            ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
            ...(fileIdFieldError?.message && {
              color: 'error.main',
              borderColor: 'error.main',
              bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
            }),
          }),
        ]}
      >
        <input {...getInputProps()} accept={accept?.join(',')} />
        {hasFile ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ fontSize: 14 }}>{fileUrlField.value.split('/').pop()}</Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Download">
                <IconButton onClick={() => downloadFile(fileUrlField.value)} size="small">
                  <Iconify icon="material-symbols:download" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFile(fileIdField.value);
                  }}
                  size="small"
                  disabled={disabled}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        ) : (
          <UploadPlaceholder />
        )}
      </Box>

      {status === 'uploading' && (
        <LinearProgress
          variant="determinate"
          value={uploadProgress}
          sx={{ mt: 1, height: 4, borderRadius: 2 }}
        />
      )}

      {fileIdFieldError?.message && (
        <FormHelperText error sx={{ mt: 1, ml: 1 }}>
          {fileIdFieldError.message}
        </FormHelperText>
      )}
    </Box>
  );

  if (gridProps) {
    return <Grid {...gridProps}>{Component}</Grid>;
  }

  return Component;
};
