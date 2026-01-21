import '@/global.css';

import dayjs from 'dayjs';
import { useEffect } from 'react';
import utc from 'dayjs/plugin/utc';
import { usePathname } from '@minimal/hooks';
import timezone from 'dayjs/plugin/timezone';
import { AuthProvider } from '@minimal/auth/context/jwt';
import { themeConfig, ThemeProvider } from '@minimal/theme';
import { ProgressBar } from '@minimal/components/progress-bar';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MotionLazy } from '@minimal/components/animate/motion-lazy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SettingsDrawer, defaultSettings, SettingsProvider } from '@minimal/components/settings';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import MuiXLicense from './MuiXLicense';
import { Snackbar } from '../minimal/components/snackbar';

dayjs.extend(utc);
dayjs.extend(timezone);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
          <ReactQueryDevtools initialIsOpen={false} />
          <SettingsProvider defaultSettings={defaultSettings}>
            <ThemeProvider
              modeStorageKey={themeConfig.modeStorageKey}
              defaultMode={themeConfig.defaultMode}
            >
              <MotionLazy>
                <Snackbar />
                <ProgressBar />
                <SettingsDrawer defaultSettings={defaultSettings} />
                {children}
                <MuiXLicense />
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
