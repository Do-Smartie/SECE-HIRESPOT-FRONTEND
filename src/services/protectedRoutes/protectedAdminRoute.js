import React from "react";
import { isAdmin,isAuthenticated } from "../Auth";
import { Navigate,Outlet } from "react-router-dom";

const ProtectedAdminRoutes = ()=>{
    var isauth = isAuthenticated();
    var isadmin = isAdmin();
    return(
        isauth && isadmin ?( <Outlet />):( <Navigate to='/home'/>)
    );
}

export default ProtectedAdminRoutes;