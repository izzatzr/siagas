import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken, getUser } from "../../utils";
import Unauthorized from "../../routes/Unauthorized";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((state) => state);

  const isTokenExpired = () => {
    const token = getToken();
    const currentTime = Date.now();

    return token.token_expired_at * 1000 < currentTime;
  };

  if (!auth.isLoggedIn || isTokenExpired()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
