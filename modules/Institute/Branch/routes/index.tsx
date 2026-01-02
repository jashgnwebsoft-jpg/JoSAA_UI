import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const BranchListPage = lazy(() => import('../pages/BranchListPage'));
// const MotherBranchListPage = lazy(() => import('../pages/MotherBranchListPage'));
const MotherBranchListPage = lazy(() => import('../view/MotherBranchListPageView'));
const MotherBranchWiseCollegeListPage = lazy(
  () => import('../pages/MotherBranchWiseCollegeListPage')
);
const BranchWiseCollegeListPage = lazy(() => import('../pages/BranchWiseCollegeListPage'));

export const BranchRoutes: RouteObject = {
  index: true,
  element: <BranchListPage />,
};

export const MotherBranchRoutes: RouteObject = {
  index: true,
  element: <MotherBranchListPage />,
};

export const MotherBranchWiseCollegeRoutes: RouteObject = {
  index: true,
  element: <MotherBranchWiseCollegeListPage />,
};

export const BranchWiseCollegeRoutes: RouteObject = {
  index: true,
  element: <BranchWiseCollegeListPage />,
};
