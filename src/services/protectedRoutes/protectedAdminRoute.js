import React from "react";
import { isAdmin,isAuthenticated } from "../Auth";
import { Navigate,Outlet } from "react-router-dom";

const ProtectedAdminRoutes = ()=>{
    var isauth = isAuthenticated();
    var isadmin = isAdmin();
    var facultyPC = sessionStorage.getItem("userType") === "FacultyPC";
    return(
        isauth && (isadmin || facultyPC) ?( <Outlet />):( <Navigate to='/home'/>)
    );
}

export default ProtectedAdminRoutes;