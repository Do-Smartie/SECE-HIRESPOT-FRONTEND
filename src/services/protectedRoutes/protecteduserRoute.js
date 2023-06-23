import React from "react";
import { isAdmin,isAuthenticated } from "../Auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedUserRoutes = () => {
  var isauth = isAuthenticated();
  return isauth  ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedUserRoutes;
