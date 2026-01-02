import type { UseSetStateReturn } from 'minimal-shared/hooks';

import { useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// ----------------------------------------------------------------------

import type { ChipProps } from '@mui/material/Chip';
import type { Theme, SxProps } from '@mui/material/styles';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Iconify } from '@minimal/components/iconify';
import { ICalendarFilters } from './tyeps/calendar';
import { fDateRangeShortLabel } from '@minimal/utils/format-time';

// ----------------------------------------------------------------------

export const chipProps: ChipProps = { size: 'small', variant: 'soft' };

export type FiltersResultProps = React.ComponentProps<'div'> & {
  totalResults: number;
  onReset?: () => void;
  sx?: SxProps<Theme>;
};

export function FiltersResult({
  sx,
  onReset,
  children,
  totalResults,
  ...other
}: FiltersResultProps) {
  return (
    <ResultRoot sx={sx} {...other}>
      <ResultLabel>
        <strong>{totalResults}</strong>
        <span> results found</span>
      </ResultLabel>

      <ResultContent>
        {children}

        <Button
          color='error'
          onClick={onReset}
          startIcon={<Iconify icon='solar:trash-bin-trash-bold' />}
        >
          Clear
        </Button>
      </ResultContent>
    </ResultRoot>
  );
}

// ----------------------------------------------------------------------

export type FilterBlockProps = React.ComponentProps<'div'> & {
  label: string;
  isShow: boolean;
  sx?: SxProps<Theme>;
  children: React.ReactNode;
};

export function FiltersBlock({ label, children, isShow, sx, ...other }: FilterBlockProps) {
  if (!isShow) {
    return null;
  }

  return (
    <BlockRoot sx={sx} {...other}>
      <BlockLabel>{label}</BlockLabel>
      <BlockContent>{children}</BlockContent>
    </BlockRoot>
  );
}

// ----------------------------------------------------------------------

const BlockRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.vars.palette.divider}`,
}));

const BlockLabel = styled('span')(({ theme }) => ({
  height: 24,
  lineHeight: '24px',
  fontSize: theme.typography.subtitle2.fontSize,
  fontWeight: theme.typography.subtitle2.fontWeight,
}));

const BlockContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

// ----------------------------------------------------------------------

const ResultRoot = styled('div')``;

const ResultLabel = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  marginBottom: theme.spacing(1.5),
  '& span': { color: theme.vars.palette.text.secondary },
}));

const ResultContent = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

type Props = FiltersResultProps & {
  filters: UseSetStateReturn<ICalendarFilters>;
};

export function CalendarFiltersResult({ filters, totalResults, sx }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveColor = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.colors.filter(item => item !== inputValue);

      updateFilters({ colors: newValue });
    },
    [updateFilters, currentFilters.colors]
  );

  const handleRemoveDate = useCallback(() => {
    updateFilters({ startDate: null, endDate: null });
  }, [updateFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={() => resetFilters()} sx={sx}>
      <FiltersBlock label='Colors:' isShow={!!currentFilters.colors.length}>
        {currentFilters.colors.map(item => (
          <Chip
            {...chipProps}
            key={item}
            label={
              <Box
                sx={[
                  theme => ({
                    ml: -0.5,
                    width: 18,
                    height: 18,
                    bgcolor: item,
                    borderRadius: '50%',
                    border: `solid 1px ${varAlpha(theme.vars.palette.common.whiteChannel, 0.24)}`,
                  }),
                ]}
              />
            }
            onDelete={() => handleRemoveColor(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock
        label='Date:'
        isShow={Boolean(currentFilters.startDate && currentFilters.endDate)}
      >
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(currentFilters.startDate, currentFilters.endDate)}
          onDelete={handleRemoveDate}
        />
      </FiltersBlock>
    </FiltersResult>
  );
}
