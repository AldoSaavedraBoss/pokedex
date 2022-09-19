import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  return <>{children}</>;
};
