import { Drawer, Typography, Divider, Box, Grid, useTheme, AppBar, Button, Dialog, DialogActions } from '@mui/material';
import { Component, PropsWithChildren } from 'react';

import { Scrollbar } from '@minimal/components/scrollbar';

import {
  StyledDialogContent,
  StyledDialogToolbar,
  StyledDialogToolbarCancelIcon,
  StyledDialogToolbarTitle,
} from '../Styles';
import { Iconify } from '../../../minimal/components/iconify';

import { ActionButtonProps } from '@core/components/SimpleDataGrid/types';
import { SimpleDialog } from '../SimpleDialog/Dialog';
type DataModalComponentProps<TModel> = {
  data?: TModel;
};

type FormModalContainerProps<TModel> = {
Component: React.FC<DataModalComponentProps<TModel>>;
  data?: TModel;
  isLoading?: boolean;
  handleClose?: () => void;
  modalTitle: string;
  open: boolean;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
  fullScreen?: boolean;
  subTitle?: string | null;
  actionButtons?: ActionButtonProps[];
};

export default function FormModalContainer<TModel = unknown> (props: PropsWithChildren<FormModalContainerProps<TModel>>) {

  const {
    handleClose,
    open,
    maxWidth,
    fullScreen,
    modalTitle,
    subTitle,
    actionButtons,
    isLoading,
    children
  } = props;

  return (
    <SimpleDialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={fullScreen}
      disableEscapeKeyDown
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
                gap: 2,
                p: 2,
              }}
            >
              {isLoading ? 'loading,,' : children}
            </Box>
          </Grid>
        </StyledDialogContent>

        <Divider sx={{ mx: 2 }} />
        <DialogActions sx={{ py: '1rem', mb: fullScreen ? 2 : 0 }}>
          {actionButtons?.map((button, idx) => (
            <Button
              key={idx}
              variant={button?.variant}
              type={button?.type}
              startIcon={button.icon}
              onClick={button.action}
              sx={{ fontWeight: 400, px: '15px', ...button?.sx }}
              aria-label={`${button.label} action`}
            >
              {button.label}
            </Button>
          ))}
        </DialogActions>
      </Box>
    </SimpleDialog>
  );
};
