import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';
import { GuestGuard } from '@minimal/auth/guard';
import { AuthSplitLayout } from '@minimal/layouts/auth-split';
import { SplashScreen } from '@minimal/components/loading-screen';

// ----------------------------------------------------------------------

/** **************************************
 * Jwt
 *************************************** */
const Jwt = {
  SignInPage: lazy(() => import('src/pages/auth/jwt/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/jwt/sign-up')),
};

// ----------------------------------------------------------------------

export const authRoutes: RouteObject[] = [
  {
    path: 'admin',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <AuthSplitLayout
              slotProps={{
                section: { title: 'Hi, Welcome back' },
              }}
            >
              <Jwt.SignInPage />
            </AuthSplitLayout>
          </GuestGuard>
        ),
      },
    ],
  },
];
