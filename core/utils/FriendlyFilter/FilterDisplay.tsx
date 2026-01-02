import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { memo, useMemo } from 'react';

interface FilterDisplayProps<TFilterModel extends Record<string, unknown>> {
  friendlyFilter: Record<string, { Label: string; Value: unknown }> | null | undefined;
  onFriendlyFilterChange?: (fieldKey: keyof TFilterModel) => void;
}

// Individual chip component to prevent unnecessary rerenders of sibling chips
const FilterChip = memo(
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

export const FilterDisplay = <TFilterModel extends Record<string, unknown>>(
  props: FilterDisplayProps<TFilterModel>
) => {
  const { friendlyFilter, onFriendlyFilterChange } = props;

  // Memoize delete handlers to prevent recreation
  const deleteHandlers = useMemo(() => {
    if (!onFriendlyFilterChange || !friendlyFilter) return {};

    const handlers: Record<string, () => void> = {};
    (Object.keys(friendlyFilter) as Array<keyof TFilterModel>).forEach(key => {
      handlers[key as string] = () => onFriendlyFilterChange(key);
    });
    return handlers;
  }, [onFriendlyFilterChange, friendlyFilter]);

  // Memoize chip list to prevent unnecessary recalculations
  const chipList = useMemo(() => {
    if (!friendlyFilter) return [];

    return Object.entries(friendlyFilter).map(([key, filter]) => (
      <FilterChip
        key={key}
        fieldKey={key}
        filter={filter as { Label: string; Value: unknown }}
        onDelete={deleteHandlers[key]}
      />
    ));
  }, [friendlyFilter, deleteHandlers]);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Active Filters
        </Typography>
        <Box display='flex' gap={1} flexWrap='wrap'>
          {chipList}
        </Box>
      </CardContent>
    </Card>
  );
};

FilterDisplay.displayName = 'ProgramsFilterDisplay';

export type { FilterDisplayProps as ProgramsFilterDisplayProps };
