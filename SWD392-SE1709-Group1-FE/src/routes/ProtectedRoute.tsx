import helpers from '@/helpers/index';

function ProtectedRoute({ children }) {
  const isAuthenticated = () => !!helpers.cookie_get('AT');

  const isAuth = isAuthenticated();

  if (!isAuth) {
    return (window.location.href = '/login');
  }

  return children;
}

export default ProtectedRoute;
