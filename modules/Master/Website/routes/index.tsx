import type { RouteObject } from 'react-router';

import { lazy } from 'react';

const List = lazy(() => import('../pages/WebsiteListPage'));

export const WebsiteRoutes: RouteObject = {
  index: true,
  element: <List />,
};
