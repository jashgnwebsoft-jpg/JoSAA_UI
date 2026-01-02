import { useState, useEffect } from 'react';

import { CONFIG } from 'src/global-config';

import { useAuthContext } from '../hooks';
import { useSearchParams } from '../../hooks';
import { SplashScreen } from '../../components/loading-screen';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export function StudentGuestGuard({ children }: GuestGuardProps) {
  const { loading, studentAuthenticated: studentAuthenticated, User } = useAuthContext();

  const searchParams = useSearchParams();
  // const returnTo = searchParams.get('returnTo') || CONFIG.auth.redirectPath;
  const returnTo = User?.Path;
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    if (studentAuthenticated) {
      // Redirect authenticated users to the returnTo path
      // Using `window.location.href` instead of `router.replace` to avoid unnecessary re-rendering
      // that might be caused by the AuthGuard component
      window.location.href = returnTo;
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentAuthenticated, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
