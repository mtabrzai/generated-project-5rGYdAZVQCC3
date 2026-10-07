import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants';

/**
 * ProtectedRoute component
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Children to render if authenticated
 * @param {string} [props.redirectTo] - Path to redirect to if not authenticated
 * @returns {React.ReactElement}
 */
const ProtectedRoute = ({ children, redirectTo = ROUTES.LOGIN }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;