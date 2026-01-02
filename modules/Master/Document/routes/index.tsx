import type { RouteObject } from 'react-router';

import { lazy } from 'react';

const List = lazy(() => import('../pages/DocumnetListPage'));

export const DocumentRoutes: RouteObject = {
  index: true,
  element: <List />,
};
