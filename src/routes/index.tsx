import NotFound from '@/pages/not-found';
import path from 'path';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);

const SignInPage = lazy(() => import('@/pages/auth/signin'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const ChatBot = lazy(() => import('@/pages/ChatBot/page'));
const StudentProfilePage = lazy(() => import('@/pages/StudentProfilePage'));

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
      )
    }
  ];

  const publicRoutes = [
    {
      path: '/',
      element: <RegisterPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/chat',
      element: <ChatBot />
    },
    {
      path: '/student-profile',
      element: <StudentProfilePage />
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
