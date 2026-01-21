import { useQuery } from '@tanstack/react-query';
import { keyDateByYearQueries, keyDateQueries } from './query';
import { event, KeyDateResponse } from '../types';
import dayjs from 'dayjs';

const color = ['#8e33ff', '#003768', '#ffab00', '#22c55e', '#00b8d9'];

const mapKeyDateToEvent = (item: KeyDateResponse): event => ({
  id: item.ScheduleID,
  title: item.ScheduleTitle,

  start: item.ScheduleStartDate ? dayjs.utc(item.ScheduleStartDate).toISOString() : 0,

  end: item.ScheduleEndDate ? dayjs.utc(item.ScheduleEndDate).toISOString() : 0,
  allDay:
    !!item.ScheduleEndDate &&
    dayjs.utc(item.ScheduleEndDate).diff(dayjs.utc(item.ScheduleStartDate), 'day') === 1,

  color: color[item?.ColorCode % color.length],
  textColor: '#ffffff',
  description: item.isCompleted ? 'Completed' : 'Pending',
});

export function useSelectKeyDateQuery(enabled: boolean = true) {
  return useQuery({
    ...keyDateQueries.Get(),
    enabled,
    select: result => result?.data,
    // select: result => result?.data?.map((item: KeyDateResponse) => mapKeyDateToEvent(item)),
  });
}

export function useSelectKeyDateByYearQuery(id: number, enabled: boolean = true) {
  return useQuery({
    ...keyDateByYearQueries.Get(id),
    enabled,
    select: result => result?.data,
  });
}
