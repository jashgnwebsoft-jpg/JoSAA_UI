import type { RouteObject } from 'react-router';

import { lazy } from 'react';

const List = lazy(() => import('../pages/NewsListPage'));
const NewsByID = lazy(() => import('../pages/NewsByID'));

export const NewsRoutes: RouteObject = {
  index: true,
  element: <List />,
};

export const NewsByIDRoutes: RouteObject = {
  index: true,
  element: <NewsByID />,
};
