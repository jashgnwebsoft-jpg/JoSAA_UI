import { useState, useEffect } from 'react';

import { paths } from '@/paths';
import { useRouter, usePathname } from '@minimal/hooks';

import { CONFIG } from '@/global-config';

import { SplashScreen } from '@minimal/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------
type AuthGuardProps = {
  children: React.ReactNode;
};

const signInPaths = {
  jwt: paths.admin.login,
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { authenticated, loading } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const createRedirectPath = (currentPath: string) => {
    const queryString = new URLSearchParams({ returnTo: pathname }).toString();
    return `${currentPath}?${queryString}`;
  };

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }
    if (!authenticated) {
      const { method } = CONFIG.auth;

      const signInPath = signInPaths[method];
      const redirectPath = signInPath;

      router.replace(redirectPath);

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
