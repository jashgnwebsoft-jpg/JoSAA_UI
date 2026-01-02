// /* eslint-disable perfectionist/sort-imports */
// import type { RouteObject } from 'react-router';

// import { Outlet } from 'react-router';
// import { lazy, Suspense } from 'react';
// import { CONFIG } from '@/global-config';
// import { usePathname } from '@minimal/hooks';
// import { AuthGuard } from '@minimal/auth/guard';
// import { DashboardLayout } from '@minimal/layouts/dashboard';
// import { LoadingScreen } from '@minimal/components/loading-screen';
// import { ModuleRoutes } from '@modules/Security/Module/routes';
// import { SubModuleRoutes } from '@modules/Security/SubModule/routes';
// import { UserRoutes } from '@modules/Security/User/routes';
// import { RoleRoutes } from '@modules/Security/Role/routes';
// import { RoleWiseOperationRoutes } from '@modules/Security/Permissions/routes';
// import { SettingRoutes } from '@modules/Security/Setting/routes';
// import { CollegeRoutes } from '@modules/Institute/College/routes';

// // ----------------------------------------------------------------------

// const IndexPage = lazy(() => import('@/pages/dashboard/one'));

// // ----------------------------------------------------------------------

// function SuspenseOutlet() {
//   const pathname = usePathname();
//   return (
//     <Suspense key={pathname} fallback={<LoadingScreen />}>
//       <Outlet />
//     </Suspense>
//   );
// }

// const adminLayout = () => (
//   <DashboardLayout>
//     <SuspenseOutlet />
//   </DashboardLayout>
// );

// export const adminRoutes: RouteObject[] = [
//   {
//     path: 'admin',
//     element: CONFIG.auth.skip ? adminLayout() : <AuthGuard>{adminLayout()}</AuthGuard>,
//     children: [{ element: <IndexPage />, index: true }],
//   },

//   {
//     path: 'admin/Institute',
//     element: CONFIG.auth.skip ? adminLayout() : <AuthGuard>{adminLayout()}</AuthGuard>,
//     children: [CollegeRoutes],
//   },

//   {
//     path: 'admin/Security',
//     element: CONFIG.auth.skip ? adminLayout() : <AuthGuard>{adminLayout()}</AuthGuard>,
//     children: [
//       SettingRoutes,
//       RoleWiseOperationRoutes,
//       RoleRoutes,
//       UserRoutes,
//       ModuleRoutes,
//       SubModuleRoutes,
//     ],
//   },
// ];
