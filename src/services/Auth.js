import { getUserTypeOnLogin } from "./getRequset";



//checking for user authenticated or not
export const isAuthenticated =()=>{
    console.log(sessionStorage.getItem("isAuth"))
    return  sessionStorage.getItem("isAuth")!=null && sessionStorage.getItem("isAuth");
    // return true;
}


//confirming user
export const isAdmin = async()=>{
    
    // if(sessionStorage.getItem("userType")==undefined){
    //     console.log("bla");
    //     let resp = await getUserTypeOnLogin();
    //     sessionStorage.setItem("userType",resp.data);
    // }

    // return sessionStorage.getItem('userType')=="Admin";
    return true;
}

