import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const ListPage = lazy(() => import('../pages/ReportingCenterListPage'));

export const ReportingCenterRoutes: RouteObject = {
  index: true,
  element: <ListPage />,
};
