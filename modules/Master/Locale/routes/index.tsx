import type { RouteObject } from 'react-router';

import { lazy } from 'react';

const List = lazy(() => import('../pages/List'));

export const LocaleRoutes: RouteObject = {
  index: true,
  element: <List />,
};
