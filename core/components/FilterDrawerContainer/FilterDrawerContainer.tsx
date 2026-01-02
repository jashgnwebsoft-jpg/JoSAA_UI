import { Drawer, Typography, Divider, Box, Grid, useTheme, Button } from '@mui/material';
import { PropsWithChildren } from 'react';

import { Scrollbar } from '@minimal/components/scrollbar';

import {
  StyledFilterDrawerActionBox,
  StyledFilterDrawerApplyButton,
  StyledFilterDrawerCancelButton,
  StyledFilterDrawerHeadingBox,
} from '../Styles';

type FilterDrawerContainerProps = {
  onSubmit: () => void;
  keepOpen: boolean;
  setOpenFilter: (open: boolean) => void;
  onClearAll?: () => void;
};

export const FilterDrawerContainer = (props: PropsWithChildren<FilterDrawerContainerProps>) => {
  const theme = useTheme();

  const { keepOpen, onSubmit, setOpenFilter, children, onClearAll } = props;

  return (
    <Drawer
      open={keepOpen}
      onClose={() => setOpenFilter(false)}
      anchor='right'
      slotProps={{
        backdrop: { invisible: true },
        paper: {
          sx: { minWidth: '350px' },
        },
      }}
    >
      <StyledFilterDrawerHeadingBox>
        <Typography sx={{ fontSize: theme.typography.h6, fontWeight: 'bold' }}>Filter</Typography>
        <Button sx={{ fontSize: theme.typography.body2, color: '#1976d2' }} onClick={onClearAll}>
          Clear All
        </Button>
      </StyledFilterDrawerHeadingBox>

      <Divider sx={{ bgcolor: theme.palette.divider, mx: 2 }} />

      <Box component='form' onSubmit={onSubmit} noValidate style={{ width: '100%' }}>
        <Scrollbar
          sx={{
            p: 2,
            gap: 2,
            flexWrap: 'wrap',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            overflow: 'auto',
            height: 'calc(100dvh - 133px)',
          }}
        >
          <Grid container spacing={2}>
            {children}
          </Grid>
        </Scrollbar>
        <StyledFilterDrawerActionBox>
          <StyledFilterDrawerApplyButton variant='contained' fullWidth type='submit'>
            Apply
          </StyledFilterDrawerApplyButton>
          <StyledFilterDrawerCancelButton
            variant='soft'
            fullWidth
            onClick={() => setOpenFilter(false)}
          >
            Cancel
          </StyledFilterDrawerCancelButton>
        </StyledFilterDrawerActionBox>
      </Box>
    </Drawer>
  );
};

