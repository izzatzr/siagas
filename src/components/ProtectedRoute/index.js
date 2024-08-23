import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../utils';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isTokenExpired = () => {
    const token = getToken();
    if (!token) return true;

    const currentTime = Date.now();
    return token.token_expired_at * 1000 < currentTime;
  };

  if (!isLoggedIn || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
