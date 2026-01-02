import type { SxProps } from '@mui/material';
import type { PropsWithChildren, ReactNode } from 'react';

import { useEffect, useState } from 'react';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {
  AccordionDetails,
  AccordionSummary,
  accordionSummaryClasses,
  Alert,
  Box,
  Divider,
  Drawer,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

import { Scrollbar } from '@minimal/components/scrollbar';

import { useSimpleDataGrid } from '../SimpleDataGrid/SimpleDataGridContext';
import {
  StyledFilterAccordion,
  StyledFilterAccordionActionStack,
  StyledFilterAccordionApplyButton,
  StyledFilterAccordionCancelButton,
  StyledFilterAccordionTitle,
  StyledFilterDrawerActionBox,
  StyledFilterDrawerApplyButton,
  StyledFilterDrawerCancelButton,
  StyledFilterDrawerHeadingBox,
} from '../Styles';

type FilterProps = {
  onClear: () => void;
  isLoading: boolean;
  onSubmit: () => void;
  defaultExpand?: boolean;
  expandIcon?: ReactNode;
  titleSx?: SxProps;
  showFilterCount?: boolean;
  title?: string;
  filterCount?: number;
  drawerSx?: SxProps;
} & PropsWithChildren;

const SimpleFilterWrapper = ({
  children,
  onClear,
  onSubmit,
  isLoading,
  defaultExpand = false,
  expandIcon,
  titleSx,
  showFilterCount = true,
  title,
  filterCount,
  drawerSx,
}: FilterProps) => {
  const theme = useTheme();
  const { showFilter, setShowFilter, showDrawer } = useSimpleDataGrid();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (defaultExpand) {
      setShowFilter(true);
    }
  }, [defaultExpand, setShowFilter]);

  return (
    <>
      {showDrawer ? (
        <Drawer
          open={showFilter}
          onClose={() => setShowFilter(false)}
          anchor='right'
          slotProps={{ backdrop: { invisible: true } }}
          PaperProps={{ sx: { minWidth: '350px', ...drawerSx } }}
        >
          <StyledFilterDrawerHeadingBox>
            <Typography sx={{ fontSize: theme.typography.h6, fontWeight: 'bold' }}>
              Filter
            </Typography>
          </StyledFilterDrawerHeadingBox>

          <Divider sx={{ bgcolor: theme.palette.divider, mx: 2 }} />

          {/* Success Message */}
          {showSuccessMessage && (
            <Box sx={{ p: 2, pb: 0 }}>
              <Alert severity='success'>Filters cleared successfully!</Alert>
            </Box>
          )}
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
              <StyledFilterDrawerApplyButton
                variant='contained'
                fullWidth
                type='submit'
                loading={isLoading}
                disabled={isLoading}
              >
                Apply
              </StyledFilterDrawerApplyButton>
              <StyledFilterDrawerCancelButton
                variant='soft'
                fullWidth
                onClick={() => setShowFilter(false)}
              >
                Cancel
              </StyledFilterDrawerCancelButton>
            </StyledFilterDrawerActionBox>
          </Box>
        </Drawer>
      ) : (
        <StyledFilterAccordion
          expanded={showFilter}
          onChange={(_, newExpanded) => setShowFilter(newExpanded)}
          disableGutters
          elevation={1}
          defaultExpanded={defaultExpand}
        >
          <AccordionSummary
            aria-controls='panel1d-content'
            id='panel1d-header'
            expandIcon={
              expandIcon ? (
                expandIcon
              ) : (
                <ArrowForwardIosSharpIcon
                  sx={{ fontSize: '0.9rem', color: theme.palette.primary.main }}
                />
              )
            }
            sx={{
              backgroundColor: theme.palette.background.paper,
              flexDirection: 'row-reverse',
              [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
                {
                  transform: 'rotate(90deg)',
                },
              [`& .${accordionSummaryClasses.content}`]: {
                marginLeft: theme.spacing(1),
              },
              px: '1.5rem',
            }}
          >
            <StyledFilterAccordionTitle variant='h5' sx={{ ...titleSx }}>
              {title ? title : 'Filter'}{' '}
              {showFilterCount ? `(${filterCount ? filterCount : 0})` : null}
            </StyledFilterAccordionTitle>
          </AccordionSummary>
          <Divider sx={{ mb: 1, mx: 2 }} />

          {/* Success Message */}
          {showSuccessMessage && (
            <Box sx={{ px: 2, pb: 1 }}>
              <Alert severity='success'>Filters cleared!</Alert>
            </Box>
          )}
          <Box component='form' onSubmit={onSubmit} noValidate style={{ width: '100%' }}>
            <AccordionDetails sx={{ pb: 0, px: '1.5rem' }}>
              <Grid container spacing={2}>
                {children}
              </Grid>
            </AccordionDetails>
            <StyledFilterAccordionActionStack spacing={2}>
              <StyledFilterAccordionApplyButton
                variant='contained'
                type='submit'
                loading={isLoading}
              >
                Apply
              </StyledFilterAccordionApplyButton>
              <StyledFilterAccordionCancelButton
                variant='soft'
                onClick={() => setShowFilter(false)}
              >
                Cancel
              </StyledFilterAccordionCancelButton>
            </StyledFilterAccordionActionStack>
          </Box>
        </StyledFilterAccordion>
      )}
    </>
  );
};

export default SimpleFilterWrapper;
