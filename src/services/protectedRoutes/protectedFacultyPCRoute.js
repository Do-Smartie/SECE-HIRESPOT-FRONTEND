import React from "react";
import { isAuthenticated } from "../Auth";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedFacultyPCRoute =()=>{

    var isAuth = isAuthenticated();

    var isFacultyPc = sessionStorage.getItem('userType')==='FacultyPC';
    // var isFacultyPc = true;

    return(

        isAuth && isFacultyPc ?(<Outlet />):(<Navigate to='/' />)
    )
}

export default ProtectedFacultyPCRoute;