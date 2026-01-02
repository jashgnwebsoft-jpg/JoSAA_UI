import { varAlpha } from 'minimal-shared/utils';

import { LoadingButton } from '@mui/lab';
import {
  Accordion,
  Box,
  Button,
  ButtonGroup,
  DialogContent,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { QuickFilter, Toolbar as ToolbarContainer } from '@mui/x-data-grid-pro';

export const dataGridStyles = {
  pt: '0px !important',
  fontSize: 14,
  height: '100%',
  backgroundColor: 'transparent',

  // minHeight: { xs: '617px', sm: '645px', md: '645px' },
  // maxHeight: { xs: '750px', sm: '100%', md: '100% ' },
  overflow: 'auto',
  '.MuiDataGrid-cell': {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiDataGrid-filler > div': {
    backgroundColor: 'transparent',
  },
  '& .MuiDataGrid-row:hover': {
    cursor: 'pointer',
  },
  '.MuiTextField-root': {
    height: '1.5rem',
  },
  '.MuiTextField-root input': {
    pt: '0px',
    pb: '0px',
    height: '1.3rem',
  },
  '.MuiTextField-root label': {
    top: '-4px',
  },
  '& .MuiDataGrid-toolbarContainer': {
    px: 0,
  },
  '& .MuiDataGrid-overlayWrapper': {
    height: '200px',
  },
  '& .MuiTablePagination-selectLabel': {
    display: 'block',
  },
  '& .MuiTablePagination-input': {
    display: 'inline-flex !important',
  },

  '& .MuiDataGrid-toolbarQuickFilter .MuiOutlinedInput-root': {
    height: '2rem',
    minHeight: '2rem',
    alignItems: 'center',
  },
  '& .MuiDataGrid-toolbarQuickFilter input': {
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    height: '1.3rem',
  },
  '& .MuiDataGrid-toolbarQuickFilter label': {
    top: '-4px',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#f5f5f5',
    borderTop: '1px solid #e1e4e6',
    height: '48px !important',
  },
  '& .MuiSelect-select.MuiInputBase-input': {
    fontSize: '14px !important',
  },
};

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  paddingRight: '15px',
  paddingLeft: '15px',
  backgroundColor: varAlpha(theme.vars.palette.grey['200Channel']),
  fontWeight: 600,
  '&:hover': {
    backgroundColor: varAlpha(theme.vars.palette.grey['300Channel']),
  },
}));

export const StyledButtonBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  padding: '2.4px 12px',
  backgroundColor: varAlpha(theme.vars.palette.grey['200Channel']),
  fontWeight: 400,
  '&:hover': {
    backgroundColor: varAlpha(theme.vars.palette.grey['300Channel']),
  },
}));

export const StyledDivider = styled(Divider)(() => ({
  marginRight: 2,
  marginLeft: 2,
}));

export const StyledHeaderCell = styled('span')(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const StyledDatagridFooter = styled(Box)(({ theme }) => ({
  borderTop: '1px solid #e1e4e6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  paddingTop: theme.spacing(0),

  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(2.5),
  },

  '& .MuiTablePagination-root': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      width: 'auto',
      justifyContent: 'flex-end',
    },
  },
}));

export const StyledDatagridMainBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  paddingBottom: 0,
  width: '100%',
  height: '100%',
  minHeight: 0,
}));

export const StyledGridToolbarQuickFilter = styled(QuickFilter)(() => ({
  '.MuiDataGrid-root .MuiTextField-root': {
    height: '36px !important',
  },
  '& .MuiInputBase-root': {
    borderRadius: '8px',
    padding: '6px 10px',
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
  '&.MuiTextField-root': {
    height: '36px !important',
  },
}));

export const StyledxsScreenToolbar = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

export const StyledMenuItem = styled(MenuItem)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

export const StyledXsColumnMenuItem = styled(MenuItem)(() => ({
  backgroundColor: 'transparent',
  paddingRight: '5px',
  paddingLeft: '5px',
  borderRight: 'none',
  fontWeight: `400 !important`,

  '&.MuiButton-root .MuiButton-sizeSmall': {
    borderRight: '0px',
    paddingRight: '6px',
    paddingLeft: '6px',
    fontWeight: `400 !important`,
  },
}));

export const StyledAddNewButton = styled(Button)(() => ({
  fontSize: 14,
  fontWeight: 400,
}));

export const StyledButtonGroup = styled(ButtonGroup)(() => ({
  backgroundColor: '#f5f5f5',
  border: '1px solid #ddd',
  paddingTop: '0px',
  paddingBottom: '0px',
  '& .MuiButton-root': {
    backgroundColor: 'transparent',
    color: '#000',
    height: '36px',
    '&:hover': {
      backgroundColor: '#eaeaea',
    },
  },
  '& .MuiButtonGroup-grouped:not(:last-of-type)': {
    borderRight: '1px solid #c0d6ec',
  },
}));

export const StyledGridToolbarContainer = styled(ToolbarContainer)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',
  paddingBottom: '1rem',
  paddingTop: '0px',
  paddingRight: '0rem',
  paddingLeft: '0rem',
  // flexWrap: 'wrap',
  position: 'relative', // 👈 add this
  overflow: 'visible',
}));

export const StyledColumnButton = styled(Box)(() => ({
  backgroundColor: 'transparent',
  // paddingRight: '5px',
  // paddingLeft: '5px',
  borderRight: 'none',

  '&:hover': {
    backgroundColor: '#d0e4f7',
  },
  '& .MuiButton-root': {
    fontWeight: 400,
  },
  '& .MuiSvgIcon-root': {
    color: '#637381',
  },
  '&.MuiButton-root .MuiButton-sizeSmall': {
    borderRight: '0px',
    // paddingRight: '6px',
    // paddingLeft: '6px',
    fontWeight: '400 !important',
  },
}));

export const StyledActiveFilterMainBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fdf5e8',
  display: 'flex',
  flexWrap: 'wrap',
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingRight: '1rem',
  paddingLeft: '1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const StyledActiveFilterLeftBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
  width: '92%',
}));

export const StyledActiveFilterValue = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  border: '1px dashed #999',
  borderRadius: '5px',
  paddingTop: '4px',
  paddingBottom: '4px',
  paddingLeft: '8px',
  paddingRight: '8px',
  backgroundColor: '#fdf5e8',
  width: 'max-content',
}));

export const StyledActiveFilterRightBox = styled(Box)(() => ({
  display: 'flex',
  gap: '8px',
  width: '8%',
}));

export const StyledActiveFilterEditButton = styled(Button)(() => ({
  fontWeight: 'bold',
  color: '#078dee',
}));

export const StyledFooterActionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
  width: 'auto',
  justifyContent: 'normal',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    justifyContent: 'space-between',
  },
}));

export const StyledFooterMenuButton = styled(Button)(() => ({
  fontWeight: 400,
}));

export const StyledFooterActionMenuItem = styled(MenuItem)(() => ({
  fontWeight: 400,
}));

export const StyledFooterAction = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

export const StyledFooterButtonBox = styled(Box)(() => ({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
}));

export const StyledFooterButton = styled(Button)(() => ({
  fontWeight: 400,
  border: '1px solid #ddd',
}));

export const StyledDialogToolbar = styled(Toolbar)(() => ({
  padding: 0,
  minHeight: '52px',
  '&.MuiToolbar-root': {
    minHeight: '52px',
    paddingRight: '1rem',
    paddingLeft: '1rem',
  },
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #e7e7e7',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledDialogToolbarTitle = styled(Typography)(() => ({
  marginLeft: '0px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

export const StyledDialogToolbarCancelIcon = styled(IconButton)(({ theme }) => ({
  borderRadius: '7px',
  backgroundColor: `${theme.palette.error.main} !important`,
  color: 'white',
  height: '28px',
  padding: '4px',
}));

export const StyledDialogContent = styled(DialogContent)(() => ({
  color: 'text.secondary',
  padding: '0px',
}));

export const StyledFilterDrawerHeadingBox = styled(Box)(() => ({
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledFilterDrawerActionBox = styled(Box)(() => ({
  display: 'flex',
  paddingTop: '1rem',
  width: '100%',
}));

export const StyledFilterDrawerApplyButton = styled(LoadingButton)(() => ({
  backgroundColor: '#1976d2',
  borderRadius: 0,
  height: '3rem',
  fontWeight: 400,
}));

export const StyledFilterDrawerCancelButton = styled(Button)(() => ({
  borderRadius: 0,
  height: '3rem',
  fontWeight: 400,
  color: 'black',
}));

export const StyledFilterAccordionApplyButton = styled(LoadingButton)(() => ({
  backgroundColor: '#1976d2',
  borderRadius: 0,
  fontWeight: 400,
  width: '6rem',
}));

export const StyledFilterAccordionCancelButton = styled(Button)(() => ({
  borderRadius: 0,
  fontWeight: 400,
  color: 'black',
  width: '6rem',
}));

export const StyledFilterAccordion = styled(Accordion)(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
  marginBottom: '1rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
}));

export const StyledFilterAccordionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

export const StyledFilterAccordionActionStack = styled(Stack)(({ theme }) => ({
  paddingTop: '16px',
  paddingBottom: '12px',
  paddingRight: '1.5rem',
  paddingLeft: '1.5rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));
