import type { RouteObject } from 'react-router';

import { lazy } from 'react';

const CurrentYearWiseCutoffList = lazy(() => import('../pages/CurrentYearWiseCutoffListPage'));
const PreviousYearWiseCutoffList = lazy(() => import('../pages/PreviousYearWiseCutoffListPage'));
const RoundWiseChart = lazy(() => import('../pages/RoundWiseChart'));
const MeritRankWiseCutOff = lazy(() => import('../pages/MeritRankWiseCutOff'));
const BranchWiseCutOff = lazy(() => import('../pages/BranchWiseCutoffListPage'));
const CollegeWiseCutOff = lazy(() => import('../pages/CollegeWiseCutoffListPage'));

export const CurrentYearWiseCutoffRoutes: RouteObject = {
  index: true,
  element: <CurrentYearWiseCutoffList />,
};

export const PreviousYearWiseCutoffRoutes: RouteObject = {
  index: true,
  element: <PreviousYearWiseCutoffList />,
};

export const RoundWiseChartRoutes: RouteObject = {
  index: true,
  element: <RoundWiseChart />,
};

export const MeritRankWiseCutOffRoutes: RouteObject = {
  index: true,
  element: <MeritRankWiseCutOff />,
};

export const BranchWiseCutoffRoutes: RouteObject = {
  index: true,
  element: <BranchWiseCutOff />,
};

export const CollegeWiseCutoffRoutes: RouteObject = {
  index: true,
  element: <CollegeWiseCutOff />,
};
