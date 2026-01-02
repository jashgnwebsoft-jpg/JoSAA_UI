import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const AdmissionStepPage = lazy(() => import('../pages/AdmissionStepPage'));

export const AdmissionStepRoutes: RouteObject = {
  index: true,
  element: <AdmissionStepPage />,
};
