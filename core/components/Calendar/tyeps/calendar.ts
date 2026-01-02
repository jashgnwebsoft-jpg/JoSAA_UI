import type { SWRConfiguration } from 'swr';

import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/lib/axios';
import { Dayjs } from 'dayjs';

// ----------------------------------------------------------------------

const enableServer = false;

const CALENDAR_ENDPOINT = endpoints.calendar;

const swrOptions: SWRConfiguration = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

type EventsData = {
  events: ICalendarEvent[];
};

export function useGetEvents() {
  const { data, isLoading, error, isValidating } = useSWR<EventsData>(
    CALENDAR_ENDPOINT,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(() => {
    const events = data?.events.map((event: { color: any }) => ({
      ...event,
      textColor: event.color,
    }));

    return {
      events: events || [],
      eventsLoading: isLoading,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !isValidating && !data?.events.length,
    };
  }, [data?.events, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createEvent(eventData: ICalendarEvent) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { eventData };
    await axios.post(CALENDAR_ENDPOINT, data);
  }

  /**
   * Work in local
   */

  mutate(
    CALENDAR_ENDPOINT,
    currentData => {
      const currentEvents: ICalendarEvent[] = currentData?.events;

      const events = [...currentEvents, eventData];

      return { ...currentData, events };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateEvent(eventData: Partial<ICalendarEvent>) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { eventData };
    await axios.put(CALENDAR_ENDPOINT, data);
  }

  /**
   * Work in local
   */

  mutate(
    CALENDAR_ENDPOINT,
    currentData => {
      const currentEvents: ICalendarEvent[] = currentData?.events;

      const events = currentEvents.map(event =>
        event.id === eventData.id ? { ...event, ...eventData } : event
      );

      return { ...currentData, events };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function deleteEvent(eventId: string) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { eventId };
    await axios.patch(CALENDAR_ENDPOINT, data);
  }

  /**
   * Work in local
   */

  mutate(
    CALENDAR_ENDPOINT,
    currentData => {
      const currentEvents: ICalendarEvent[] = currentData?.events;

      const events = currentEvents.filter(event => event.id !== eventId);

      return { ...currentData, events };
    },
    false
  );
}

export type ICalendarFilters = {
  colors: string[];
  startDate: IDatePickerControl;
  endDate: IDatePickerControl;
};

export type ICalendarDate = string | number;

export type ICalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type ICalendarRange = {
  start: ICalendarDate;
  end: ICalendarDate;
} | null;

export type ICalendarEvent = {
  id: string;
  color: string;
  title: string;
  allDay: boolean;
  description: string;
  end: ICalendarDate;
  start: ICalendarDate;
};
export type IPaymentCard = {
  id: string;
  cardType: string;
  primary?: boolean;
  cardNumber: string;
};

export type IAddressItem = {
  id?: string;
  name: string;
  company?: string;
  primary?: boolean;
  fullAddress: string;
  phoneNumber?: string;
  addressType?: string;
};

export type IDateValue = string | number | null;

export type IDatePickerControl = Dayjs | null;

export type ISocialLink = {
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
};
