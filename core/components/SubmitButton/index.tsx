import type { LoadingButtonProps } from '@mui/lab';

import React from 'react';

import { LoadingButton } from '@mui/lab';

type SubmitButtonProps = Omit<LoadingButtonProps, 'children' | 'variant' | 'color' | 'type'>;

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading = false, ...rest }) => (
  <LoadingButton
    loading={loading}
    variant="contained"
    color="primary"
    type="submit"
    {...rest}
    sx={{ fontWeight: 400 }}
  >
    Submit
  </LoadingButton>
);

export default SubmitButton;
