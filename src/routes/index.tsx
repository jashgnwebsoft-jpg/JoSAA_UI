import type { RouteObject } from 'react-router';

import { lazy } from 'react';

import { authRoutes } from './auth';
import { visitorsRoutes } from './visitorsRoutes';

// ----------------------------------------------------------------------

const Page404 = lazy(() => import('@/pages/error/404'));

export const routesSection: RouteObject[] = [
  // {
  //   path: '/',
  //   element: <Navigate to={CONFIG.auth.redirectPath} replace />,
  // },
  ...visitorsRoutes,

  // Auth
  ...authRoutes,

  // Dashboard
  // ...adminRoutes,
  // No match
  { path: '*', element: <Page404 /> },
];
