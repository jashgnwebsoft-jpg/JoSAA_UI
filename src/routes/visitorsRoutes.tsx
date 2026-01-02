/* eslint-disable perfectionist/sort-imports */
import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { Suspense } from 'react';
import { usePathname } from '@minimal/hooks';
import {
  CollegeRoutes,
  HomeStateRoutes,
  CollegeCompareRoutes,
  CollegeInformationRoutes,
} from '@modules/Institute/College/routes';
import { VisitorsLayout } from '@minimal/layouts/dashboard/visitorsLayout';
import { WebsiteRoutes } from '@modules/Master/Website/routes';
import { DocumentRoutes } from '@modules/Master/Document/routes';
import {
  BranchRoutes,
  MotherBranchRoutes,
  BranchWiseCollegeRoutes,
  MotherBranchWiseCollegeRoutes,
} from '@modules/Institute/Branch/routes';
import { NewsRoutes, NewsByIDRoutes } from '@modules/Master/News/routes';
import { DashboardRoutes } from '@modules/Dashboard/routes';
import { AdmissionStepRoutes } from '@modules/Master/AdmissionStep/routes';
import { ReportingCenterRoutes } from '@modules/Institute/ReportingCenter/routes';
import {
  BranchWiseCutoffRoutes,
  CollegeWiseCutoffRoutes,
  MeritRankWiseCutOffRoutes,
} from '@modules/Institute/PreviousYearCutoffRowData/routes';
import { KeyDateRoutes } from '@modules/Master/Schedule/routes';
import { DashboardLayout } from '@minimal/layouts/dashboard/dashboardLayout';
import { LocaleRoutes } from '@modules/Master/Locale/routes';

// ----------------------------------------------------------------------

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense
      key={pathname}
      // fallback={<LoadingScreen />}
    >
      <Outlet />
    </Suspense>
  );
}

const visitorLayout = () => (
  <VisitorsLayout>
    <SuspenseOutlet />
  </VisitorsLayout>
);

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const visitorsRoutes: RouteObject[] = [
  {
    path: '/',
    element: dashboardLayout(),
    children: [DashboardRoutes],
  },
  {
    path: 'corona/2021',
    element: dashboardLayout(),
    children: [LocaleRoutes],
  },
  {
    path: 'josaa/branch',
    element: visitorLayout(),
    children: [BranchRoutes],
  },
  {
    path: 'josaa/cutoff',
    element: visitorLayout(),
    children: [MeritRankWiseCutOffRoutes],
  },
  {
    path: 'josaa/keydate',
    element: visitorLayout(),
    children: [KeyDateRoutes],
  },
  {
    path: 'josaa/admissionstep',
    element: visitorLayout(),
    children: [AdmissionStepRoutes],
  },
  {
    path: 'josaa/news',
    element: visitorLayout(),
    children: [NewsRoutes],
  },
  {
    path: 'josaa/document',
    element: visitorLayout(),
    children: [DocumentRoutes],
  },
  {
    path: 'josaa/website',
    element: visitorLayout(),
    children: [WebsiteRoutes],
  },
  {
    path: 'josaa/motherbranch',
    element: visitorLayout(),
    children: [MotherBranchRoutes],
  },
  {
    path: 'josaa/homestate',
    element: visitorLayout(),
    children: [HomeStateRoutes],
  },
  {
    path: 'josaa/college',
    element: visitorLayout(),
    children: [CollegeRoutes],
  },
  {
    path: 'josaa/reporting',
    element: visitorLayout(),
    children: [ReportingCenterRoutes],
  },
  {
    path: 'josaa/branchwisecutoff',
    element: visitorLayout(),
    children: [BranchWiseCutoffRoutes],
  },
  {
    path: 'josaa/collegewisecutoff',
    element: visitorLayout(),
    children: [CollegeWiseCutoffRoutes],
  },
  {
    path: 'josaa/collegecompare',
    element: visitorLayout(),
    children: [CollegeCompareRoutes],
  },
  {
    path: 'josaa/systembranchwisecollege/:systembranchID',
    element: visitorLayout(),
    children: [MotherBranchWiseCollegeRoutes],
  },
  {
    path: 'josaa/branchwisecollege/:branchID',
    element: visitorLayout(),
    children: [BranchWiseCollegeRoutes],
  },
  {
    path: 'josaa/collegeinformation/:collegeID',
    element: visitorLayout(),
    children: [CollegeInformationRoutes],
  },
  {
    path: 'josaa/news/:newsID',
    element: visitorLayout(),
    children: [NewsByIDRoutes],
  },
];
