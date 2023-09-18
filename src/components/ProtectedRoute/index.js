import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken, getUser } from "../../utils";
import Unauthorized from "../../routes/Unauthorized";

const ProtectedRoute = ({ children, roles }) => {
  const { auth } = useSelector((state) => state);
  const user = getUser();

  const isTokenExpired = () => {
    const token = getToken();
    const currentTime = Date.now();

    return token.token_expired_at * 1000 < currentTime;
  };

  const userHasRequiredRole = user && roles.includes(user.name) ? true : false;

  if (!auth.isLoggedIn || isTokenExpired()) {
    return <Navigate to="/login" />;
  }

  // if (auth.isLoggedIn && !userHasRequiredRole) {
  //   return <Unauthorized />;
  // }

  return children;
};

export default ProtectedRoute;
