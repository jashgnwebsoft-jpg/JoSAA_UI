import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  TextField,
  InputAdornment,
} from '@mui/material';
import type { GridValidRowModel } from '@mui/x-data-grid-pro';
import {
  ColumnsPanelTrigger,
  ToolbarButton,
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
} from '@mui/x-data-grid-pro';
import clsx from 'clsx';
import React from 'react';
import { useState, useCallback } from 'react';

import { Iconify } from '@minimal/components/iconify';

import ExportExcelDialog from '../ExcelExport';

import {
  StyledAddNewButton,
  StyledButtonGroup,
  StyledColumnButton,
  StyledGridToolbarContainer,
  StyledMenuItem,
  StyledXsColumnMenuItem,
  StyledxsScreenToolbar,
} from './Styles';
import type { ActionButtonProps, DataGridToolbarProps } from './types';

const BUTTON_WEIGHT = 400;

const ExtendedDataGridToolbar = <TFilterModel, TModel extends GridValidRowModel = any>(
  props: DataGridToolbarProps<TFilterModel, TModel>
) => {
  const { toolbar } = props;
  const {
    columns,
    actionButtons,
    addNew,
    handleExport,
    showFilter,
    filterModel,
    permissions,
    extraMainButtons,
  } = toolbar!;

  const theme = useTheme();
  const xsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Menu states
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);
  const [smallAnchorEl, setSmallAnchorEl] = useState<null | HTMLElement>(null);
  const [openExcelDialog, setOpenExcelDialog] = useState(false);

  // Simple derived values
  const [selectedExportColumns, setSelectedExportColumns] = useState<string[]>(
    columns.map(col => col.field)
  );

  const visibleActionButtons = actionButtons?.filter(button => button?.visible ?? true) ?? [];
  const visibleExtraMainButtons = extraMainButtons?.filter(button => button?.visible ?? true) ?? [];
  const exportMenuOpen = Boolean(exportAnchorEl);
  const smallMenuOpen = Boolean(smallAnchorEl);

  // Event handlers - only memoize if they have dependencies or are expensive
  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  const handleSmallMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setSmallAnchorEl(event.currentTarget);
  };

  const handleSmallMenuClose = () => {
    setSmallAnchorEl(null);
  };

  const handleExcelExport = () => {
    handleExportClose();
    setOpenExcelDialog(true);
  };

  const handleExcelDialogClose = () => {
    setOpenExcelDialog(false);
  };

  // Only memoize expensive operations with dependencies
  const handleFinalExport = useCallback(() => {
    if (handleExport) {
      handleExport(selectedExportColumns, filterModel);
    }
    setOpenExcelDialog(false);
  }, [handleExport, selectedExportColumns, filterModel]);

  // Shared Components - no memo needed for internal components
  const AddNewButton = () => (
    <StyledAddNewButton
      variant='contained'
      startIcon={<AddIcon />}
      color='success'
      onClick={addNew}
      aria-label='Add new item'
    >
      Add New
    </StyledAddNewButton>
  );

  const ColumnsPanel = () => <ColumnsPanelTrigger />;

  // Simple render functions - no memoization needed
  const renderActionButton = (button: ActionButtonProps, idx: number) => (
    <StyledMenuItem
      key={idx}
      onClick={button.action}
      sx={{ fontWeight: BUTTON_WEIGHT, px: '15px', ...button?.sx }}
      aria-label={`${button.label} action`}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {button.icon}
        {button.label}
      </Box>
    </StyledMenuItem>
  );

  // Shared Export Menu Component
  const ExportMenu = () => (
    <Menu anchorEl={exportAnchorEl} open={exportMenuOpen} onClose={handleExportClose}>
      <MenuItem onClick={handleExportClose} aria-label='Export as PDF'>
        Export as PDF
      </MenuItem>
      <MenuItem onClick={handleExcelExport} aria-label='Export as Excel'>
        Export as Excel
      </MenuItem>
    </Menu>
  );

  // Mobile Toolbar Component
  const MobileToolbar = () => (
    <StyledxsScreenToolbar>
      <IconButton
        onClick={handleSmallMenuClick}
        aria-label='Open toolbar menu'
        aria-expanded={smallMenuOpen}
        aria-haspopup='true'
      >
        <Iconify icon='mingcute:menu-fill' />
      </IconButton>

      <Menu
        anchorEl={smallAnchorEl}
        open={smallMenuOpen}
        onClose={handleSmallMenuClose}
        slotProps={{
          list: {
            'aria-labelledby': 'mobile-toolbar-button',
            role: 'menu',
          },
        }}
      >
        <StyledXsColumnMenuItem>
          <ColumnsPanel />
        </StyledXsColumnMenuItem>

        {(permissions?.showExport ?? true) && (
          <StyledMenuItem onClick={handleExportClick} aria-label='Export options'>
            <Iconify icon='solar:export-bold' />
            Export
          </StyledMenuItem>
        )}

        {visibleActionButtons.map(renderActionButton)}
      </Menu>

      <ExportMenu />

      {(permissions?.showFilter ?? true) && <AddNewButton />}
    </StyledxsScreenToolbar>
  );

  // Desktop Toolbar Component
  const DesktopToolbar = () => (
    <>
      <StyledButtonGroup variant='soft'>
        {visibleActionButtons.map((button, idx) => (
          <Button
            key={idx}
            startIcon={button.icon}
            onClick={button.action}
            sx={{ fontWeight: BUTTON_WEIGHT, px: '15px', ...button?.sx }}
            aria-label={`${button.label} action`}
          >
            {button.label}
          </Button>
        ))}
        <StyledColumnButton>
          {/* <ColumnsPanel /> */}
          <ColumnsPanelTrigger
            render={
              <ToolbarButton render={<Button startIcon={<VisibilityIcon />}> Columns</Button>} />
            }
          />
        </StyledColumnButton>

        {(permissions?.showExport ?? true) && (
          <Box>
            <Button
              id='export-button'
              startIcon={<Iconify icon='solar:export-linear' sx={{ color: '#637381' }} />}
              onClick={handleExportClick}
              sx={{ fontWeight: 600 }}
              aria-controls={exportMenuOpen ? 'export-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={exportMenuOpen ? 'true' : undefined}
            >
              Export
            </Button>

            <Menu
              id='export-menu'
              anchorEl={exportAnchorEl}
              open={exportMenuOpen}
              onClose={handleExportClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleExportClose}>Export as PDF</MenuItem>
              <MenuItem onClick={handleExcelExport}>Export as Excel</MenuItem>
            </Menu>
          </Box>
        )}

        {(permissions?.showFilter ?? true) && (
          <Button
            startIcon={<FilterListOutlinedIcon sx={{ color: '#637381' }} />}
            onClick={showFilter}
            sx={{ fontSize: 14, fontWeight: 400 }}
            aria-label='Show filters'
          >
            Filter
          </Button>
        )}
      </StyledButtonGroup>

      {(permissions?.showAdd ?? true) && <AddNewButton />}

      {visibleExtraMainButtons.map((button, idx) => (
        <StyledAddNewButton
          key={idx}
          variant='contained'
          startIcon={button.icon}
          color='success'
          onClick={button.action}
          sx={{ ...button?.sx }}
          aria-label={`${button.label} item`}
        >
          {button.label}
        </StyledAddNewButton>
      ))}
    </>
  );

  const SearchBar = () => (
    <QuickFilter
      render={(props, state) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <div
            className={clsx(
              'flex overflow-clip transition-all duration-300 ease-in-out',
              state.expanded ? 'w-48' : 'w-0'
            )}
          >
            <QuickFilterControl
              aria-label='Search'
              placeholder='Search'
              render={({ ...controlProps }) => (
                <TextField
                  {...controlProps}
                  variant='outlined'
                  size='small'
                  placeholder='Search…'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon fontSize='small' />
                      </InputAdornment>
                    ),
                    endAdornment:
                      state.expanded && state.value !== '' ? (
                        <QuickFilterClear
                          render={
                            <InputAdornment position='end'>
                              <CancelIcon fontSize='small' sx={{ cursor: 'pointer' }} />
                            </InputAdornment>
                          }
                        />
                      ) : null,
                  }}
                  sx={{
                    height: '36px !important',
                    '& .MuiInputBase-root': {
                      borderRadius: '8px',
                      paddingRight: '6px',
                      backgroundColor: '#f5f5f5',
                      height: '36px !important',
                    },
                    '& input': {
                      fontSize: '14px',
                      color: '#333',
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      borderRadius: '8px',
                    },
                  }}
                />
              )}
            />
          </div>
        </Box>
      )}
    />
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <StyledGridToolbarContainer>
        {/* <StyledGridToolbarQuickFilter /> */}
        <SearchBar />
        <Box sx={{ flexGrow: 1 }} />
        {xsScreen ? (
          <MobileToolbar />
        ) : (
          <>
            <StyledButtonGroup variant='soft'>
              {visibleActionButtons.map((button, idx) => (
                <Button
                  key={idx}
                  startIcon={button.icon}
                  onClick={button.action}
                  sx={{ fontWeight: BUTTON_WEIGHT, px: '15px', ...button?.sx }}
                  aria-label={`${button.label} action`}
                >
                  {button.label}
                </Button>
              ))}
              <StyledColumnButton>
                {/* <ColumnsPanel /> */}
                <ColumnsPanelTrigger
                  render={
                    <ToolbarButton
                      render={<Button startIcon={<VisibilityIcon />}> Columns</Button>}
                    />
                  }
                />
              </StyledColumnButton>

              {(permissions?.showExport ?? true) && (
                <Box>
                  <Button
                    id='export-button'
                    startIcon={<Iconify icon='solar:export-linear' sx={{ color: '#637381 ' }} />}
                    onClick={handleExportClick}
                    sx={{ fontWeight: 400 }}
                    aria-controls={exportMenuOpen ? 'export-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={exportMenuOpen ? 'true' : undefined}
                  >
                    Export
                  </Button>

                  <Menu
                    id='export-menu'
                    anchorEl={exportAnchorEl}
                    open={exportMenuOpen}
                    onClose={handleExportClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem onClick={handleExportClose}>Export as PDF</MenuItem>
                    <MenuItem onClick={handleExcelExport}>Export as Excel</MenuItem>
                  </Menu>
                </Box>
              )}

              {(permissions?.showFilter ?? true) && (
                <Button
                  startIcon={<FilterListOutlinedIcon sx={{ color: '#637381' }} />}
                  onClick={showFilter}
                  sx={{ fontSize: 14, fontWeight: 400 }}
                  aria-label='Show filters'
                >
                  Filter
                </Button>
              )}
            </StyledButtonGroup>

            {(permissions?.showAdd ?? true) && <AddNewButton />}

            {visibleExtraMainButtons.map((button, idx) => (
              <StyledAddNewButton
                key={idx}
                variant='contained'
                startIcon={button.icon}
                color='success'
                onClick={button.action}
                sx={{ ...button?.sx }}
                aria-label={`${button.label} item`}
              >
                {button.label}
              </StyledAddNewButton>
            ))}
          </>
        )}
      </StyledGridToolbarContainer>

      <ExportExcelDialog
        open={openExcelDialog}
        onClose={handleExcelDialogClose}
        title='Export to Excel'
        content='Choose the columns you want to include in the export.'
        columns={columns}
        selectedColumns={selectedExportColumns}
        setSelectedColumns={setSelectedExportColumns}
        action={
          <Button
            variant='contained'
            color='primary'
            onClick={handleFinalExport}
            sx={{ fontWeight: BUTTON_WEIGHT }}
            aria-label='Execute Excel export'
          >
            Export
          </Button>
        }
      />
    </Box>
  );
};

export default ExtendedDataGridToolbar;
