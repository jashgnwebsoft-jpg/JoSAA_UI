import { OperationResponse } from '@gnwebsoft/ui';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { SxProps } from '@mui/material';
import { Box, Button, IconButton, MenuItem, MenuList, Tooltip } from '@mui/material';
import { UseMutationResult } from '@tanstack/react-query';
import { usePopover } from 'minimal-shared/hooks';
import { useEffect, useState } from 'react';
import type { FC, MouseEvent, ReactNode } from 'react';

import { ConfirmDialog } from '@minimal/components/custom-dialog';
import { CustomPopover } from '@minimal/components/custom-popover';
import { Iconify } from '@minimal/components/iconify';

import { ApiError, ApiResponse } from '../../api/types';
import { EntityId } from '../../hooks/useListView';
import AuthorizedView from '../AuthorizedView';

type OptionsProps = {
  icon?: ReactNode;
  label?: string;
  action?: () => void;
  sx?: SxProps;
  tooltip?: string;
  visible?: boolean;
};

type ActionColumnProps = {
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
  moreOptions?: OptionsProps[];
  showInMenu?: boolean;
  deleteMutation?: UseMutationResult<ApiResponse<OperationResponse>, ApiError, EntityId, unknown>;
  selectedRowId: EntityId;
};

const ActionColumn: FC<ActionColumnProps> = ({
  onView,
  deleteMutation,
  canDelete,
  canEdit,
  canView,
  moreOptions,
  showInMenu = false,
  onEdit,
  selectedRowId,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { open, anchorEl, onClose, onOpen } = usePopover();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onOpen(event);
  };

  useEffect(() => {
    if (deleteMutation?.isSuccess) {
      setOpenDeleteDialog(false);
    }
  }, [deleteMutation?.isError, deleteMutation?.isSuccess, deleteMutation?.error]);

  return (
    <Box flexDirection='row' display='flex' alignItems='center' justifyContent='center'>
      {showInMenu ? (
        <IconButton color={open ? 'inherit' : 'default'} onClick={handleClick}>
          <Iconify icon='eva:more-vertical-fill' />
        </IconButton>
      ) : (
        <>
          <AuthorizedView show={canView}>
            <Box
              flexDirection='row'
              display='flex'
              alignItems='center'
              sx={{ color: 'info.main' }}
              onClick={() => {
                onView(String(selectedRowId));
              }}
            >
              <Tooltip title='View'>
                <IconButton color='default'>
                  <VisibilityIcon fontSize='small' sx={{ fontWeight: 85, fontSize: 21 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </AuthorizedView>

          <AuthorizedView show={canEdit}>
            <Box
              flexDirection='row'
              display='flex'
              alignItems='center'
              onClick={() => onEdit(String(selectedRowId))}
            >
              <Tooltip title='Edit'>
                <IconButton color='default'>
                  <EditIcon fontSize='small' sx={{ fontWeight: 85, fontSize: 21 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </AuthorizedView>
          <AuthorizedView show={canDelete}>
            <Box
              flexDirection='row'
              display='flex'
              alignItems='center'
              sx={{ color: 'error.main' }}
              onClick={() => {
                setOpenDeleteDialog(true);
              }}
            >
              <Tooltip title='Delete'>
                <IconButton color='inherit'>
                  <DeleteIcon fontSize='small' sx={{ fontWeight: 85, fontSize: 21 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </AuthorizedView>
          {moreOptions?.map(
            (option, idx) =>
              (option?.visible ?? true) && (
                <Tooltip title={option.tooltip} key={`tooltip-${idx}`}>
                  <IconButton
                    key={`ic-${idx}`}
                    onClick={option.action}
                    sx={{ fontWeight: 400, px: '15px', ...option?.sx }}
                  >
                    {option.icon}
                  </IconButton>
                </Tooltip>
              )
          )}
        </>
      )}

      <CustomPopover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
        sx={{ '& .MuiPopover-paper': { borderRadius: '0px' } }}
      >
        <MenuList>
          <AuthorizedView show={canView}>
            <MenuItem
              onClick={() => {
                onView(String(selectedRowId));
                onClose();
              }}
            >
              <VisibilityIcon fontSize='small' sx={{ fontWeight: 85, fontSize: 21 }} />
              View
            </MenuItem>
          </AuthorizedView>

          <AuthorizedView show={canEdit}>
            <MenuItem
              onClick={() => {
                onEdit(String(selectedRowId));
                onClose();
              }}
            >
              <EditIcon fontSize='small' sx={{ fontWeight: 85, fontSize: 21 }} />
              Edit
            </MenuItem>
          </AuthorizedView>
          <AuthorizedView show={canDelete}>
            <MenuItem
              sx={{ color: 'error.main' }}
              onClick={() => {
                setOpenDeleteDialog(true);
                onClose();
              }}
            >
              <DeleteIcon fontSize='small' sx={{ fontWeight: 85, fontSize: 21 }} />
              Delete
            </MenuItem>
          </AuthorizedView>

          {moreOptions?.map(
            (option, idx) =>
              (option?.visible ?? true) && (
                <MenuItem key={idx} onClick={option.action} sx={{ fontWeight: 400, ...option?.sx }}>
                  {option.icon}
                  {option.label}
                </MenuItem>
              )
          )}
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        title='Delete'
        content='Are you sure you want to delete this record?'
        action={
          <Button
            variant='contained'
            color='error'
            onClick={() => deleteMutation?.mutate(selectedRowId)}
          >
            Delete
          </Button>
        }
      />
    </Box>
  );
};

export default ActionColumn;
