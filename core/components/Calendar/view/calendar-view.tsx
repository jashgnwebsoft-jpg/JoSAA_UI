import type { Theme, SxProps } from '@mui/material/styles';

import Calendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Card from '@mui/material/Card';

import { useCalendar } from '../hooks/use-calendar';
import { fDate } from '@minimal/utils/format-time';
import { CalendarRoot } from '../styles';
import { ICalendarFilters } from '../types/calendar';
import { CalendarToolbar } from '../calendar-toolbar';
import { event } from '@modules/Master/Schedule/types';

// ----------------------------------------------------------------------
type Props = {
  events: event[] | undefined;
  eventsLoading: boolean;
};

export function CalendarView(props: Props) {
  const { events, eventsLoading } = props;

  const openFilters = useBoolean();

  const filters = useSetState<ICalendarFilters>({ colors: [], startDate: null, endDate: null });
  const { state: currentFilters } = filters;

  const {
    calendarRef,
    /********/
    view,
    date,
    /********/
    onDatePrev,
    onDateNext,
    onDateToday,
    onChangeView,
    onInitialView,
  } = useCalendar();

  useEffect(() => {
    onInitialView();
  }, [onInitialView]);

  const canReset =
    currentFilters.colors.length > 0 || (!!currentFilters.startDate && !!currentFilters.endDate);

  const flexStyles: SxProps<Theme> = {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <>
      <Card
        sx={{
          ...flexStyles,
          minHeight: '50vh',
          mb: 3,
        }}
      >
        <CalendarRoot
          sx={{
            ...flexStyles,
            '.fc.fc-media-screen': { flex: '1 1 auto' },
          }}
        >
          <CalendarToolbar
            date={fDate(date)}
            view={view}
            canReset={canReset}
            loading={eventsLoading}
            onNextDate={onDateNext}
            onPrevDate={onDatePrev}
            onToday={onDateToday}
            onChangeView={onChangeView}
            onOpenFilters={openFilters.onTrue}
          />

          <Calendar
            ref={calendarRef}
            initialDate={date}
            initialView={view}
            headerToolbar={false}
            weekends
            aspectRatio={3}
            dayMaxEventRows={3}
            eventDisplay='block'
            editable={false}
            selectable={false}
            droppable={false}
            eventResizableFromStart={false}
            events={events}
            plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin]}
          />
        </CalendarRoot>
      </Card>
    </>
  );
}
