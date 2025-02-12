import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const StudentRoute = () => {
  const { user, userRole } = useAuth();

  if (!user || userRole !== 'student') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const AdminRoute = () => {
  const { user, userRole } = useAuth();

  if (!user || userRole !== 'admin') {
    return <Navigate to="/admin-login" />;
  }

  return <Outlet />;
};
