import type { ReactNode } from 'react';

import {
  Box,
  Stack,
  AppBar,
  Button,
  Dialog,
  Toolbar,
  IconButton,
  Typography,
  DialogActions,
  DialogContent,
  CircularProgress,
} from '@mui/material';

import type { ModalComponentProps } from './ModalcomponentProps';
import { Iconify } from '../../../minimal/components/iconify';
import { SimpleDialog } from '../SimpleDialog/Dialog';

type ModalDialogProps<TModel> = {
  open: boolean;
  isFetching: boolean;
  data: TModel | undefined;
  Component: React.FC<ModalComponentProps<TModel>>;
  footer?: ReactNode;
  header?: ReactNode;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
  handleClose: () => void;
  modalTitle: string;
  isFooterShow?: boolean;
};

export default function ModalDialog<TModel>({
  open,
  isFetching,
  data,
  Component,
  maxWidth,
  handleClose,
  modalTitle,
  isFooterShow,
}: ModalDialogProps<TModel>) {
  return (
    <SimpleDialog
      open={open}
      maxWidth={maxWidth}
      onClose={handleClose}
      fullWidth
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
          mt: 5,
        },
      }}
    >
      {isFetching ? (
        <Box
          sx={{
            p: 4,
          }}
        >
          <Stack direction='row' justifyContent='center'>
            <CircularProgress />
          </Stack>
        </Box>
      ) : (
        <>
          <AppBar position='relative' color='default' sx={{ bgcolor: 'lightgray' }}>
            <Toolbar>
              <Typography variant='h6' sx={{ flex: 1 }}>
                {modalTitle}
              </Typography>

              <IconButton color='inherit' edge='start' onClick={handleClose}>
                <Iconify icon='mingcute:close-line' />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* <DialogTitle>{modalTitle}</DialogTitle> */}
          <DialogContent sx={{ color: 'text.secondary', bgcolor: '#f5f5f5' }}>
            <Component data={data!} />
          </DialogContent>

          {isFooterShow ? (
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Save changes
              </Button>
            </DialogActions>
          ) : (
            <></>
          )}
        </>
      )}
    </SimpleDialog>
  );
}
