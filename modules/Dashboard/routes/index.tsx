import type { RouteObject } from 'react-router';

import { lazy } from 'react';

const List = lazy(() => import('../pages/DashboardPage'));

export const DashboardRoutes: RouteObject = {
  index: true,
  element: <List />,
};
