import React from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import { Label, LabelProps } from '@minimal/components/label';

export interface StatusLabelProps extends Omit<LabelProps, 'children' | 'color'> {
  value: boolean | string | null;
  successColor?: LabelProps['color'];
  errorColor?: LabelProps['color'];
  successText?: React.ReactNode;
  errorText?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const StatusLabel: React.FC<StatusLabelProps> = ({
  value,
  variant = 'soft',
  successColor = 'success',
  errorColor = 'error',
  successText = 'Yes',
  errorText = 'No',
  sx,
  ...other
}) => {
  return (
    <Label variant={variant} color={value ? successColor : errorColor} sx={sx} {...other}>
      {value ? successText : errorText}
    </Label>
  );
};
