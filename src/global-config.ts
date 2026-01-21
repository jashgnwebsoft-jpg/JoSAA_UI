import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  apiBaseUrl: string;
  auth: {
    method: 'jwt';
    skip: boolean;
    redirectPath: string;
  };
  dateTimePatterns: {
    dateTime: string;
    date: string;
    month_year_short_format: string;
    month_year_full_format: string;
    year: string;
    time: string;
    split: {
      dateTime: string;
      date: string;
    };
    paramCase: {
      dateTime: string;
      date: string;
      dateReverse: string;
      MonthYear: string;
    };
  };
  defaultPageSize: number;
  defaultPageSizeOptions?: number[];
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'JoSAA',
  appVersion: packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? '',
  // apiBaseUrl: 'http://localhost:5143',
  apiBaseUrl: 'https://api.all-india-admission.com',
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: '/admin',
  },
  dateTimePatterns: {
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
  },
  defaultPageSize: 100,
  defaultPageSizeOptions: [100, 500, 1000, 5000],
};
