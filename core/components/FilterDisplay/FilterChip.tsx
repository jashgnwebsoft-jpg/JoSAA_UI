import Chip from '@mui/material/Chip';
import { memo } from 'react';

// Individual chip component to prevent unnecessary rerenders of sibling chips
export const FilterChip = memo(
  ({
    fieldKey,
    filter,
    onDelete,
  }: {
    fieldKey: string;
    filter: { Label: string; Value: unknown };
    onDelete?: () => void;
  }) => {
    const hasValue = filter.Value !== null && filter.Value !== undefined && filter.Value !== '';
    const label = `${fieldKey.replace('PK', '')}: ${filter.Label}`;

    return (
      <Chip
        key={fieldKey}
        label={label}
        variant={hasValue ? 'filled' : 'outlined'}
        size='small'
        onDelete={hasValue ? onDelete : undefined}
      />
    );
  }
);

FilterChip.displayName = 'FilterChip';
