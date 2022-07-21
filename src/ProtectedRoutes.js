import React from "react";
import Cookies from "js-cookie";

import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = Cookies.get("token");
  if (user) {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoutes = (props: any) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
