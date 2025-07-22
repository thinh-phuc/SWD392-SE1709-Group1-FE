import helpers from '@/helpers/index';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ children, requiredRole }) {
  const isAuthenticated = () => !!helpers.cookie_get('AT');
  const isAuth = isAuthenticated();

  if (!isAuth) {
    window.location.href = '/login';
    return null;
  }

  if (requiredRole) {
    try {
      const token = helpers.cookie_get('AT');
      if (!token) {
        window.location.href = '/login';
        return null;
      }
      const decoded: any = jwtDecode(token);
      const role = decoded?.role;
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole];
      if (!allowedRoles.includes(role)) {
        window.location.href = '/profile';
        return null;
      }
    } catch {
      window.location.href = '/login';
      return null;
    }
  }

  return children;
}

export default ProtectedRoute;
