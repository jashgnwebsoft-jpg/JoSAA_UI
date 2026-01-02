import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { JSX, memo, useMemo } from 'react';
import { FilterChip } from './FilterChip';

interface FilterDisplayProps<TFilterModel> {
  friendlyFilter: Record<string, { Label: string; Value: unknown }>;
  onFriendlyFilterChange?: (fieldKey: keyof TFilterModel) => void;
}

export const ProgramsFilterDisplay = memo(
  <TFilterModel extends Record<string, unknown>>(props: FilterDisplayProps<TFilterModel>) => {
    const { friendlyFilter, onFriendlyFilterChange } = props;

    // Memoize delete handlers to prevent recreation
    const deleteHandlers = useMemo(() => {
      if (!onFriendlyFilterChange) return {};

      const handlers: Record<string, () => void> = {};
      for (const key of Object.keys(friendlyFilter)) {
        handlers[key] = () => onFriendlyFilterChange(key as keyof TFilterModel);
      }
      return handlers;
    }, [onFriendlyFilterChange, friendlyFilter]);

    // Memoize chip list to prevent unnecessary recalculations
    const chipList = useMemo(() => {
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
  }
);

ProgramsFilterDisplay.displayName = 'FilterDisplay';

export type { FilterDisplayProps };
