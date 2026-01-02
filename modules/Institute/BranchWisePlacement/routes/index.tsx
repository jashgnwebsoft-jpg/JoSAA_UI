import { lazy } from 'react';
import { RouteObject } from 'react-router';

const BranchWisePlacement = lazy(() => import('../pages/BranchWisePlacementListPage'));

export const BranchWisePlacementRoutes: RouteObject = {
  index: true,
  element: <BranchWisePlacement />,
};
