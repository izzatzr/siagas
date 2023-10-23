import React from "react";
import { getUser } from "../../utils";
import Unauthorized from "../../routes/Unauthorized";

const Authorization = ({ children, roles }) => {
  const user = getUser();
  console.log("USER", roles)

  const userHasRequiredRole = user && roles.includes(user.name) ? true : false;

  if (!userHasRequiredRole) {
    return <Unauthorized />;
  }

  return children;
};

export default Authorization;
