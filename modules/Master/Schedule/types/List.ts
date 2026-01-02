import { ICalendarDate } from '@core/components/Calendar/types/calendar';
import { z } from 'zod';

export const KeyDateSchema = z.object({});

export type KeyDateRequest = z.infer<typeof KeyDateSchema>;

export type KeyDateResponse = {
  ScheduleID: string;
  ScheduleTitle: string;
  ScheduleStartDate: string | null;
  ScheduleEndDate: string | null;
  isCompleted: boolean | null;
  ColorCode: number;
};

export type event = {
  textColor: string;
  id: string;
  color: string;
  title: string;
  allDay: boolean;
  description: string;
  end: ICalendarDate;
  start: ICalendarDate;
};
