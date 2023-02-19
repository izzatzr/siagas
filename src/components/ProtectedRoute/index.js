import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const {auth} = useSelector((state) => state);

  return !auth.isLoggedIn ?  <Navigate to={"/login"} /> : children;
};

export default ProtectedRoute;
