import type { PropsWithChildren } from 'react';

import { CancelButton } from '@gnwebsoft/ui';

import {
  AppBar,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';


import { Iconify } from '@minimal/components/iconify';

import type { SimpleFormProps } from '../SimpleDataGrid/types';
import { StyledDialogContent, StyledDialogToolbar, StyledDialogToolbarCancelIcon, StyledDialogToolbarTitle } from '../Styles';
import SubmitButton from '../SubmitButton';
import { SimpleDialog } from '../SimpleDialog/Dialog';

export default function SimpleModalForm<TModel>({
  open,
  isFetching,
  children,
  maxWidth,
  title,
  icon,
  titleSx,
  headerSx,
  contentSx,
  onSubmit,
  onClose,
  isLoading,
  fullScreen,
  subTitle,
}: SimpleFormProps<TModel> & PropsWithChildren) {
  return (
    <SimpleDialog open={open} maxWidth={maxWidth} disableEscapeKeyDown fullWidth fullScreen={fullScreen}>
      {isFetching ? (
        <Box sx={{ p: 4, width: '100%' }}>
          <Stack direction="row" justifyContent="center">
            <CircularProgress />
          </Stack>
        </Box>
      ) : (
        <>
          <AppBar position="relative" color="default">
            <StyledDialogToolbar sx={{ ...headerSx }}>
              <Box sx={{ display: 'flex', gap: 1, width: '100%', alignItems: 'end', flex: 1 }}>
                <StyledDialogToolbarTitle sx={{ ...titleSx }} variant="h6">
                  {icon ?? icon} {title}{' '}
                </StyledDialogToolbarTitle>
                {subTitle && (
                  <Typography fontSize="11px" fontStyle="italic" color="#505050" sx={{ mb: '3px' }}>
                    {subTitle}
                  </Typography>
                )}
              </Box>

              <StyledDialogToolbarCancelIcon color="inherit" edge="start" onClick={onClose}>
                <Iconify icon="mingcute:close-line" />
              </StyledDialogToolbarCancelIcon>
            </StyledDialogToolbar>
          </AppBar>

          <Box
            component="form"
            onSubmit={onSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: fullScreen ? '100%' : 'auto',
              overflow: 'auto',
            }}
          >
            <StyledDialogContent
              sx={{ ...contentSx, flexGrow: fullScreen ? 1 : undefined, overflow: 'auto' }}
            >
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
                  {children}
                </Box>
              </Grid>
            </StyledDialogContent>
            <Divider sx={{ mx: 2 }} />
            <DialogActions sx={{ py: '1rem', mb: fullScreen ? 2 : 0 }}>
              <CancelButton handleCancel={onClose} isSubmitting={isLoading} />
              <SubmitButton loading={isLoading} />
            </DialogActions>
          </Box>
        </>
      )}
    </SimpleDialog>
  );
}
