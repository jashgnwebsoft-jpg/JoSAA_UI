import type { ButtonProps } from '@mui/material';

import React from 'react';

import { Button } from '@mui/material';

const CancelButton: React.FC<ButtonProps> = ({
  children = 'Cancel',
  variant = 'outlined',
  sx,
  ...rest
}) => (
  <Button variant={variant} sx={{ width: '6rem', ...sx }} {...rest}>
    {children}
  </Button>
);

export default CancelButton;
