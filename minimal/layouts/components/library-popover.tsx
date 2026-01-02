import type { Theme, SxProps } from '@mui/material/styles';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';

import { useState, useCallback, useEffect } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button, { buttonClasses } from '@mui/material/Button';

import { Label } from '@minimal/components/label';
import { Iconify } from '@minimal/components/iconify';
import { Scrollbar } from '@minimal/components/scrollbar';
import { CustomPopover } from '@minimal/components/custom-popover';

// ----------------------------------------------------------------------

export type LibraryPopoverProps = ButtonBaseProps & {
  data?: {
    Label: string;
    Value: string;
  }[];
  onSwitchLibrary: (LibraryID: string) => void;
  currentLibraryID?: string;
};

export function LibraryPopover({
  data = [],
  sx,
  onSwitchLibrary,
  currentLibraryID,
  ...other
}: LibraryPopoverProps) {
  const mediaQuery = 'sm';

  const { open, anchorEl, onClose, onOpen } = usePopover();

  const [workspace, setWorkspace] = useState(
    data.find(lib => lib.Value === currentLibraryID) || data[0]
  );

  useEffect(() => {
    const newWorkspace = data.find(lib => lib.Value === currentLibraryID) || data[0];
    setWorkspace(newWorkspace);
  }, [currentLibraryID, data]);

  const handleChangeWorkspace = useCallback(
    (newValue: (typeof data)[0]) => {
      setWorkspace(newValue);
      onSwitchLibrary(newValue.Value);
      onClose();
    },
    [onClose, onSwitchLibrary]
  );

  const buttonBg: SxProps<Theme> = {
    height: 1,
    zIndex: -1,
    opacity: 0,
    content: "''",
    borderRadius: 1,
    position: 'absolute',
    visibility: 'hidden',
    bgcolor: 'action.hover',
    width: 'calc(100% + 8px)',
    transition: theme =>
      theme.transitions.create(['opacity', 'visibility'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
    ...(open && {
      opacity: 1,
      visibility: 'visible',
    }),
  };

  const renderButton = () => (
    <ButtonBase
      disableRipple
      onClick={onOpen}
      sx={[
        {
          py: 0.5,
          gap: { xs: 0.5, [mediaQuery]: 1 },
          '&::before': buttonBg,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {/* <Box
        component='img'
        alt={workspace?.Label}
        // src={workspace?.logo}
        sx={{ width: 24, height: 24, borderRadius: '50%' }}
      /> */}

      <Box
        component='span'
        sx={{ typography: 'subtitle2', display: { xs: 'none', [mediaQuery]: 'inline-flex' } }}
      >
        {workspace?.Label}
      </Box>

      {/* <Label
        color={workspace?.plan === 'Free' ? 'default' : 'info'}
        sx={{
          height: 22,
          cursor: 'inherit',
          display: { xs: 'none', [mediaQuery]: 'inline-flex' },
        }}
      >
        {workspace?.plan}
      </Label> */}

      <Iconify width={16} icon='carbon:chevron-sort' sx={{ color: 'text.disabled' }} />
    </ButtonBase>
  );

  const renderMenuList = () => (
    <CustomPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      slotProps={{
        arrow: { placement: 'top-left' },
        paper: { sx: { mt: 0.5, ml: -1.55, width: 240 } },
      }}
    >
      <Scrollbar sx={{ maxHeight: 240 }}>
        <MenuList>
          {data.map(option => (
            <MenuItem
              key={option.Value}
              selected={option.Value === workspace?.Value}
              onClick={() => handleChangeWorkspace(option)}
              sx={{ height: 48 }}
            >
              {/* <Avatar alt={option.name} src={option.logo} sx={{ width: 24, height: 24 }} /> */}

              <Typography
                noWrap
                component='span'
                variant='body2'
                sx={{ flexGrow: 1, fontWeight: 'fontWeightMedium' }}
              >
                {option.Label}
              </Typography>

              {/* <Label color={option.plan === 'Free' ? 'default' : 'info'}>{option.plan}</Label> */}
            </MenuItem>
          ))}
        </MenuList>
      </Scrollbar>

      {/* <Divider sx={{ my: 0.5, borderStyle: 'dashed' }} /> */}

      {/* <Button
        fullWidth
        startIcon={<Iconify width={18} icon="mingcute:add-line" />}
        onClick={() => {
          onClose();
        }}
        sx={{
          gap: 2,
          justifyContent: 'flex-start',
          fontWeight: 'fontWeightMedium',
          [`& .${buttonClasses.startIcon}`]: {
            m: 0,
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        Create workspace
      </Button> */}
    </CustomPopover>
  );

  return (
    <>
      {renderButton()}
      {renderMenuList()}
    </>
  );
}
