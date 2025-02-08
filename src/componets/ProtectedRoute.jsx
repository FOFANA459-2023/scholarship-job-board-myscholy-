import { Navigate } from 'react-router-dom';
import { useAuth } from '../componets/AuthContext';

export const StudentRoute = ({ children }) => {
  const { user, userRole } = useAuth();
  
  if (!user || userRole !== 'student') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, userRole } = useAuth();
  
  if (!user || userRole !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}; 