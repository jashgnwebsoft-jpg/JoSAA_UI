import {
  AppBar,
  Box,
  Dialog,
  DialogActions,
  Grid,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import React, { RefAttributes, useEffect, useRef } from 'react';

import { ActionButtonProps } from '@core/components/SimpleDataGrid/types';
import {
  StyledDialogToolbar,
  StyledDialogToolbarCancelIcon,
  StyledDialogToolbarTitle,
  StyledDialogContent,
} from '@core/components/Styles';
import { Iconify } from '@minimal/components/iconify';
import { LoadingScreen } from '@minimal/components/loading-screen';

import { DataModalButtons, DataModalComponentProps } from '../WithRef';
import { SimpleDialog } from '../SimpleDialog/Dialog';

export type DataModalComponent<TModel> = React.ForwardRefExoticComponent<
  Omit<DataModalComponentProps<TModel>, 'ref'> & RefAttributes<DataModalButtons>
>;

export type DataModalProps<TModel> = {
  Component: DataModalComponent<TModel>;
  data?: TModel;
  isLoading?: boolean;
  handleClose?: () => void;
  modalTitle: string;
  open: boolean;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
  fullScreen?: boolean;
  subTitle?: string | null;
  actionButtons?: ActionButtonProps[];
  isEditing?: boolean;
  mode: 'add' | 'edit' | 'view';
};

export default function DataModal<TModel = unknown>(props: DataModalProps<TModel>) {
  const {
    Component,
    data,
    handleClose,
    open,
    maxWidth,
    fullScreen,
    modalTitle,
    subTitle,
    isLoading,
    isEditing,
    mode,
  } = props;

  const formRef = useRef<DataModalButtons>(null);

  useEffect(() => {
    if (formRef.current?.isSuccess) {
      handleClose?.();
    }
  }, [formRef.current?.isSuccess]);

  return (
    <SimpleDialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={fullScreen}
    >
      <AppBar position='relative' color='default'>
        <StyledDialogToolbar>
          <Box sx={{ display: 'flex', gap: 1, width: '100%', alignItems: 'end', flex: 1 }}>
            <StyledDialogToolbarTitle variant='h6'>{modalTitle}</StyledDialogToolbarTitle>
            {subTitle && (
              <Typography fontSize='11px' fontStyle='italic' color='#505050' sx={{ mb: '3px' }}>
                {subTitle}
              </Typography>
            )}
          </Box>

          <StyledDialogToolbarCancelIcon color='inherit' edge='start' onClick={handleClose}>
            <Iconify icon='mingcute:close-line' />
          </StyledDialogToolbarCancelIcon>
        </StyledDialogToolbar>
      </AppBar>
      <Box
        component='form'
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: fullScreen ? '100%' : 'auto',
          overflow: 'auto',
        }}
      >
        <StyledDialogContent sx={{ flexGrow: fullScreen ? 1 : undefined, overflow: 'auto' }}>
          <Grid container spacing={2}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                gap: mode === 'view' ? 0 : 2,
                p: 2,
                flexDirection: mode === 'view' ? 'column' : 'row',
              }}
            >
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <Component ref={formRef} data={data} isEditing={isEditing} />
              )}
            </Box>
          </Grid>
        </StyledDialogContent>

        <Divider sx={{ mx: 2 }} />

        {mode !== 'view' ? (
          <DialogActions sx={{ py: '1rem', mb: fullScreen ? 2 : 0 }}>
            <Button onClick={handleClose} variant='outlined'>
              Cancel
            </Button>
            <Button
              onClick={() => formRef.current?.onSubmit?.()}
              type='button'
              variant='contained'
              color='primary'
              disabled={formRef.current?.isPending}
              loading={formRef.current?.isPending}
            >
              Save
            </Button>
          </DialogActions>
        ) : null}
      </Box>
    </SimpleDialog>
  );
}
