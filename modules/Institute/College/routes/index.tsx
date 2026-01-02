import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const HomeStateListPage = lazy(() => import('../pages/HomeStateListPage'));
const CollegeListPage = lazy(() => import('../pages/CollegeListPage'));
const CollegeInformationPage = lazy(() => import('../pages/CollegeInformationPage'));
const CollegeComparePage = lazy(() => import('../pages/CollegeComparePage'));

export const HomeStateRoutes: RouteObject = {
  index: true,
  element: <HomeStateListPage />,
};

export const CollegeRoutes: RouteObject = {
  index: true,
  element: <CollegeListPage />,
};

export const CollegeInformationRoutes: RouteObject = {
  index: true,
  element: <CollegeInformationPage />,
};

export const CollegeCompareRoutes: RouteObject = {
  index: true,
  element: <CollegeComparePage />,
};
