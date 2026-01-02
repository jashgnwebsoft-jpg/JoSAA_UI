import type { AuthState, LoginResponse } from '../../types';

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import axios, { endpoints } from '@/lib/axios';

import { JWT_STORAGE_KEY } from './constant';
import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './utils';
import { DefaultPermissions } from '../../DefaultPermissions';
import { toast } from 'sonner';
import { api } from '@gnwebsoft/ui';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    User: null,
    loading: true,
    Menu: null,
    UserPermissions: DefaultPermissions,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(JWT_STORAGE_KEY);
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        // setSession(accessToken, refreshToken);

        // const response = await fetch('http://localhost:5143/api/Demo/manage/info', {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${localStorage.getItem('serviceToken')}`,
        //   },
        // });

        // var data = await response.json();

        const response = await api.get<AuthState>(endpoints.auth.me);

        // const res = await axios.get(endpoints.auth.me);
        const user = response.apiData?.User;
        const menu = response.apiData?.Menu;
        const userPermissions =
          response.apiData?.UserPermissions != null
            ? response.apiData?.UserPermissions
            : DefaultPermissions;

        setState({
          User: { ...user, accessToken },
          Menu: menu,
          loading: false,
          UserPermissions: userPermissions,
        });
        // setMenu(menu1 || []);
      } else {
        setState({ User: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ User: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.User ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      User: state.User ? state.User : null,
      checkUserSession,
      loading: status === 'loading',
      Menu: status !== 'loading' && state.Menu ? state.Menu : null,
      UserPermissions:
        status !== 'loading' && state.UserPermissions ? state.UserPermissions : DefaultPermissions,
      authenticated: status === 'authenticated' && state.User?.Role != 'Student',
      unauthenticated: status === 'unauthenticated',
      studentAuthenticated: status === 'authenticated' && state.User?.Role === 'Student',
      studentUnauthenticated: status === 'unauthenticated' && state.User?.Role === 'Student',
    }),
    [checkUserSession, state.User, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
