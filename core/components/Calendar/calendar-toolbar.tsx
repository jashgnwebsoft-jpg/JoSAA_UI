import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { CustomPopover } from '@minimal/components/custom-popover';
import { Iconify } from '@minimal/components/iconify';
import { ICalendarView } from './types/calendar';
import { IDateValue } from './types/common';

// ----------------------------------------------------------------------

// const VIEW_OPTIONS = [
//   { value: 'dayGridMonth', label: 'Month', icon: 'mingcute:calendar-month-line' },
//   { value: 'timeGridWeek', label: 'Week', icon: 'mingcute:calendar-week-line' },
//   { value: 'timeGridDay', label: 'Day', icon: 'mingcute:calendar-day-line' },
//   { value: 'listWeek', label: 'Agenda', icon: 'fluent:calendar-agenda-24-regular' },
// ] as const;

// ----------------------------------------------------------------------

type Props = {
  loading: boolean;
  canReset: boolean;
  view: ICalendarView;
  date: IDateValue;
  onToday: () => void;
  onNextDate: () => void;
  onPrevDate: () => void;
  onOpenFilters: () => void;
  onChangeView: (newView: ICalendarView) => void;
};

export function CalendarToolbar({
  date,
  view,
  loading,
  onToday,
  onNextDate,
  onPrevDate,
  onChangeView,
}: Props) {
  const menuActions = usePopover();

  // const selectedItem = VIEW_OPTIONS[3];

  // const renderMenuActions = () => (
  //   <CustomPopover
  //     open={menuActions.open}
  //     anchorEl={menuActions.anchorEl}
  //     onClose={menuActions.onClose}
  //     slotProps={{ arrow: { placement: 'top-left' } }}
  //   >
  //     <MenuList>
  //       {VIEW_OPTIONS.map(viewOption => (
  //         <MenuItem
  //           key={viewOption.value}
  //           selected={viewOption.value === view}
  //           onClick={() => {
  //             menuActions.onClose();
  //             onChangeView(viewOption.value);
  //           }}
  //         >
  //           <Iconify icon={viewOption.icon} />
  //           {viewOption.label}
  //         </MenuItem>
  //       ))}
  //     </MenuList>
  //   </CustomPopover>
  // );

  return (
    <>
      <Box
        sx={{
          p: 2.5,
          pr: 2,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          size='small'
          color='inherit'
          startIcon={<Iconify icon='fluent:calendar-agenda-24-regular' />}
        >
          Agenda
        </Button>

        <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={onPrevDate}>
            <Iconify icon='eva:arrow-ios-back-fill' />
          </IconButton>

          <Typography variant='h6'>{date}</Typography>

          <IconButton onClick={onNextDate}>
            <Iconify icon='eva:arrow-ios-forward-fill' />
          </IconButton>
        </Box>

        <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
          <Button size='small' color='error' variant='contained' onClick={onToday}>
            Today
          </Button>
        </Box>

        {loading && (
          <LinearProgress
            color='inherit'
            sx={{
              left: 0,
              width: 1,
              height: 2,
              bottom: 0,
              borderRadius: 0,
              position: 'absolute',
            }}
          />
        )}
      </Box>

      {/* {renderMenuActions()} */}
    </>
  );
}
