import { useState, useEffect } from 'react';
import { useRouter, usePathname } from '@minimal/hooks';

import { CONFIG } from 'src/global-config';

import { useAuthContext } from '../hooks';
import { SplashScreen } from '../../components/loading-screen';
import { paths } from '../../../src/paths';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

const signInPaths = {
  jwt: paths.admin.login,
};

export function StudentAuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { studentAuthenticated: studentAuthenticated, loading } = useAuthContext();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    if (!studentAuthenticated) {
      const signInPath = '/';
      const redirectPath = signInPath;

      router.replace(redirectPath);

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
