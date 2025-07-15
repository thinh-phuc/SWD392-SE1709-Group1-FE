import NotFound from '@/pages/not-found';
// import path from 'path';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);

const SignInPage = lazy(() => import('@/pages/auth/signin'));
const HomePage = lazy(() => import('@/pages/HomePage/index'));
const RegisterPage = lazy(() => import('@/pages/auth/register'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage/index'));
const ProfileForm = lazy(
  () => import('@/pages/ProfilePage/components/ProfileForm')
);
const CreateBranch = lazy(() => import('@/pages/BranchPage/CreateBranch'));
const BranchList = lazy(() => import('@/pages/BranchPage/BranchList'));
// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          path: '/',
          element: <HomePage />,
          index: true
        },
        {
          path: '/profile',
          element: <ProfilePage />,
          index: true
        },
        {
          path: '/profile-form',
          element: <ProfileForm />
        },
        // Thêm các route cho branch
        {
          path: '/branches/create',
          element: <CreateBranch />
        },
        {
          path: '/branches',
          element: <BranchList />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />
    },
    {
      path: '/register',
      element: <RegisterPage />
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
