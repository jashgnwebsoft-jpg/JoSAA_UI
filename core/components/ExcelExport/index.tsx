import {
  AppBar,
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

import { Iconify } from '@minimal/components/iconify';

import type { ExportExcelDialogProps } from './types';
import { SimpleDialog } from '../SimpleDialog/Dialog';

const ExportExcelDialog = (props: ExportExcelDialogProps) => {

  const {
    open,
    title,
    content,
    action,
    onClose,
    columns,
    selectedColumns,
    setSelectedColumns = () => { },
    ...other
  } = props;

  const theme = useTheme();

  const handleToggle = (field: string) => {
    if (selectedColumns?.includes(field)) {
      setSelectedColumns(selectedColumns?.filter((f) => f !== field));
    } else {
      setSelectedColumns([...selectedColumns, field]);
    }
  };

  const handleSelectAll = () => {
    setSelectedColumns(columns?.map((col) => col.field));
  };

  const handleClear = () => {
    setSelectedColumns([]);
  };

  return (
    <SimpleDialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 1,
          },
        },
      }}
      {...other}
    >
      <AppBar position="relative" color="default">
        <Toolbar
          sx={{
            p: 0,
            minHeight: '52px',
            '&.MuiToolbar-root': {
              minHeight: '52px',
              px: 2,
            },
            bgcolor: '#f5f5f5',
            borderBottom: '1px solid #e7e7e7',
          }}
        >
          <Typography
            variant="h6"
            sx={{ flex: 1, ml: 0, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {title}
          </Typography>

          <IconButton
            color="inherit"
            edge="start"
            sx={{
              borderRadius: '7px',
              bgcolor: `${theme.palette.error.main} !important`,
              color: 'white',
              height: '28px',
              p: '4px',
            }}
            onClick={onClose}
          >
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ typography: 'body2', mt: '5', p: 2 }}>
        {content && <Box mb={2}>{content}</Box>}

        {columns && columns.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedColumns.length === columns.length}
                  indeterminate={
                    selectedColumns.length > 0 && selectedColumns.length < columns.length
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setSelectedColumns(columns.map((col) => col.field));
                    } else {
                      setSelectedColumns([]);
                    }
                  }}
                />
              }
              label="Select All"
            />
            <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
            {columns.map(
              (col) =>
                col?.headerName !== 'Actions' && (
                  <FormControlLabel
                    key={col.field}
                    control={
                      <Checkbox
                        checked={selectedColumns.includes(col.field)}
                        onChange={() => handleToggle(col.field)}
                      />
                    }
                    label={col.headerName}
                  />
                )
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ mt: 0, py: 1.5, px: 2, borderTop: '1px solid #f0f0f0' }}>
        {action}
      </DialogActions>
    </SimpleDialog>
  );
}

export default ExportExcelDialog;