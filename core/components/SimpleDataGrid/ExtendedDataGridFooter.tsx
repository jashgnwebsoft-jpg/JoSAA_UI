import { Box, Menu, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
  GridPagination,
  gridRowSelectionStateSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid-pro';
import { useState } from 'react';

import {
  StyledDatagridFooter,
  StyledFooterAction,
  StyledFooterActionBox,
  StyledFooterActionMenuItem,
  StyledFooterButton,
  StyledFooterButtonBox,
} from '@components/Styles';

import type { DataGridFooterProps } from './types';

const ExtendedDataGridFooter = (props: DataGridFooterProps) => {
  const { footer } = props;
  const actionButtons = footer?.actionButtons;

  const theme = useTheme();
  const xsScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const apiRef = useGridApiContext();
  const rowsCount = apiRef.current?.getRowsCount();

  const selectedRows = useGridSelector(apiRef, gridRowSelectionStateSelector);
  const selectedCount = selectedRows.ids.size;

  return (
    <StyledDatagridFooter>
      <StyledFooterActionBox>
        <Typography variant='body2' sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          Total Rows:
          <Typography variant='body2' component='span' fontWeight='bold'>
            {/* {rowsCount} */}
            {footer?.totalCount ? footer?.totalCount : rowsCount}
          </Typography>
          {selectedCount > 0 && (
            <>
              | Selected:
              <Typography
                variant='body2'
                sx={{ fontWeight: 'bold', color: '#078dee', bgcolor: '#078dee1f', px: '4px' }}
              >
                {selectedCount}
              </Typography>
            </>
          )}
        </Typography>

        {selectedCount > 0 &&
          (xsScreen ? (
            <Box>
              <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                {actionButtons?.map((button, idx: number) => (
                  <StyledFooterActionMenuItem key={idx} onClick={button.action}>
                    <StyledFooterAction>
                      {button.icon}
                      {button.label}
                    </StyledFooterAction>
                  </StyledFooterActionMenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <StyledFooterButtonBox>
              {actionButtons?.map((button, idx: number) => (
                <StyledFooterButton
                  variant='soft'
                  key={idx}
                  startIcon={button.icon}
                  onClick={button.action}
                  sx={{ ...button?.sx }}
                >
                  {button.label}
                </StyledFooterButton>
              ))}
            </StyledFooterButtonBox>
          ))}
      </StyledFooterActionBox>
      <GridPagination />
    </StyledDatagridFooter>
  );
};

export default ExtendedDataGridFooter;
