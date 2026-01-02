import type { DialogProps } from '@mui/material/Dialog';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { SimpleDialog } from '../SimpleDialog/Dialog';

export type ConfirmDeleteProps = Omit<DialogProps, 'title' | 'content'> & {
  onClose: () => void;
  action: React.ReactNode;
  content?: React.ReactNode;
};

const ConfirBulkDelete = (props: ConfirmDeleteProps) => {
  const { open, action, content, onClose, ...other } = props;

  return (
    <SimpleDialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      {...other}
      sx={{ justifyContent: 'center' }}
    >
      {content && (
        <DialogContent sx={{ typography: 'body2', pt: 3, textAlign: 'center' }}>
          {' '}
          {content}{' '}
        </DialogContent>
      )}

      <DialogActions sx={{ justifyContent: 'center' }}>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </SimpleDialog>
  );
};

export default ConfirBulkDelete;
