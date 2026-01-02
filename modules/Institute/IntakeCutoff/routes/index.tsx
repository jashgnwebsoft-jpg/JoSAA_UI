import type { RouteObject } from 'react-router';

import { lazy } from 'react';

const List = lazy(() => import('../pages/IntakeListPage'));

export const IntakeRoutes: RouteObject = {
  index: true,
  element: <List />,
};
