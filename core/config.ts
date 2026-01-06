export type ConfigValue = {
  apiBaseUrl: string;
  defaultPageSize: number;
};

export const Config: ConfigValue = {
  defaultPageSize: 100,
  apiBaseUrl: 'http://localhost:5143',
  // apiBaseUrl: 'https://api.all-india-admission.com',
};

export const dateTimePatterns = {
  dateTime: 'DD MMM YYYY h:mm A', // 17 Apr 2022 12:00 am
  date: 'DD MMM YYYY', // 17 Apr 2022
  month_year_short_format: 'MMM YYYY',
  month_year_full_format: 'MMMM YYYY',
  year: 'YYYY',
  time: 'h:mm a', // 12:00 am
  split: {
    dateTime: 'DD/MM/YYYY h:mm A', // 17/04/2022 12:00 am
    date: 'DD/MM/YYYY', // 17/04/2022
  },
  paramCase: {
    dateTime: 'DD-MM-YYYY h:mm A', // 17-04-2022 12:00 am
    date: 'DD-MM-YYYY', // 17-04-2022
    dateReverse: 'YYYY-MM-DD', // 2022-04-17 for compare date
    MonthYear: 'MMM-YYYY',
  },
};
