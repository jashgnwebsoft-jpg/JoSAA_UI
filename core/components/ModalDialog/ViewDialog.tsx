import type { ReactNode } from 'react';

import { AppBar, Dialog, Toolbar, IconButton, DialogContent } from '@mui/material';
import { Iconify } from '../../../minimal/components/iconify';
import { SimpleDialog } from '../SimpleDialog/Dialog';

type ModalDialogProps = {
  open: boolean;
  url: string | null;
  footer?: ReactNode;
  header?: ReactNode;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
  handleClose: () => void;
};

export default function ViewDialog({ open, url, maxWidth, handleClose }: ModalDialogProps) {
  if (url == null) {
    return <></>;
  }
  return (
    <SimpleDialog open={open} maxWidth={maxWidth} onClose={handleClose} fullWidth>
      <>
        <AppBar position='relative' color='default' sx={{ bgcolor: 'lightgray' }}>
          <Toolbar>
            <IconButton color='inherit' edge='end' onClick={handleClose}>
              <Iconify icon='mingcute:close-line' />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* <DialogTitle>{modalTitle}</DialogTitle> */}
        <DialogContent
          sx={{ color: 'text.secondary', bgcolor: '#f5f5f5', height: '800px' }}
          dividers
        >
          <iframe
            // style={{ position: 'relative', top: 0, right: 0 }}
            src={url}
            width='100%'
            height='100%'
          />
        </DialogContent>
      </>
    </SimpleDialog>
  );
}
