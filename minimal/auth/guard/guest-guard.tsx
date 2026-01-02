import { useState, useEffect } from 'react';

import { useSearchParams } from '@minimal/hooks';

import { CONFIG } from '@/global-config';

import { SplashScreen } from '@minimal/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export function GuestGuard({ children }: GuestGuardProps) {
  const { loading, authenticated, User: user } = useAuthContext();
  const searchParams = useSearchParams();

  // const returnTo = user?.Role != 'Student' ? CONFIG.auth.redirectPath : CONFIG.auth.studentRedirectPath;

  const returnTo = searchParams.size > 0 ? searchParams.get('returnTo') : CONFIG.auth.redirectPath;

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    // if (user?.Role != 'Student' ? authenticated : studentAuthenticated) {
    //   // Redirect authenticated users to the returnTo path
    //   // Using `window.location.href` instead of `router.replace` to avoid unnecessary re-rendering
    //   // that might be caused by the AuthGuard component
    //   window.location.href = returnTo;
    //   return;
    // }
    if (authenticated) {
      // Redirect authenticated users to the returnTo path
      // Using `window.location.href` instead of `router.replace` to avoid unnecessary re-rendering
      // that might be caused by the AuthGuard component
      const s = searchParams.get('returnTo');

      window.location.href = returnTo!;
      return;
    }
    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
