import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: '1rem',
  },
}));

// ----------------------------------------------------------------------

export interface SimpleDialogProps extends DialogProps {}

export const SimpleDialog: React.FC<SimpleDialogProps> = props => {
  return <StyledDialog {...props} />;
};
