import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

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
const ProfileEditForm = lazy(
  () => import('@/pages/ProfilePage/components/ProfileEditForm')
);
const StaffPage = lazy(() => import('@/pages/StaffPage/index'));
const BranchPage = lazy(() => import('@/pages/StaffPage/components/Branch'));
const MajorPage = lazy(() => import('@/pages/StaffPage/components/Major'));
const ScholarshipPage = lazy(
  () => import('@/pages/StaffPage/components/ScholarShip')
);
const AdmissionTypePage = lazy(
  () => import('@/pages/StaffPage/components/AdmisstionType')
);

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
        {
          path: '/staff',
          element: (
            <ProtectedRoute requiredRole={['Admin', 'Staff']}>
              <StaffPage />
            </ProtectedRoute>
          ),
          children: [
            {
              path: 'branches',
              element: <BranchPage />
            },
            {
              path: 'majors',
              element: <MajorPage />
            },
            {
              path: 'scholarships',
              element: <ScholarshipPage />
            },
            {
              path: 'admission-types',
              element: <AdmissionTypePage />
            }
          ]
        },
        {
          path: '/profile-edit/:id',
          element: <ProfileEditForm />
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
