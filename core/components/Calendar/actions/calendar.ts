import axios, { endpoints, fetcher } from '@/lib/axios';
import { useMemo } from 'react';
import { ICalendarEvent } from '../types/calendar';
import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

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
    const events = data?.events?.map(event => ({ ...event, textColor: event.color }));

    return {
      events: events || [],
      eventsLoading: isLoading,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !isValidating && !data?.events?.length,
    };
  }, [data?.events, error, isLoading, isValidating]);

  return memoizedValue;
}
