import type { RouteObject } from 'react-router';

import { lazy } from 'react';

const List = lazy(() => import('../pages/KeyDate'));

export const KeyDateRoutes: RouteObject = {
  index: true,
  element: <List />,
};
