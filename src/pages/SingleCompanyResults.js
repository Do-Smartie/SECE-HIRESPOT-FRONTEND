import React from "react";
import MainNavbar from "../components/MainNavbar";
import { useLocation } from "react-router-dom";
import DownloadResult from "../components/DownloadResult";

const SingleCompanyResults = ()=>{
    
    const location = useLocation();
    const{companyName,batch} = location.state || {};
    return(
        <>
         <MainNavbar />
         <DownloadResult companyName={companyName} batch={batch}/>
        </>
    );
}

export default SingleCompanyResults;