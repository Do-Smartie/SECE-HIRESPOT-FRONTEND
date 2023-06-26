import { getUserTypeOnLogin } from "./getRequset";



//checking for user authenticated or not
export const isAuthenticated =()=>{
    console.log(sessionStorage.getItem("isAuth"))
    return  sessionStorage.getItem("isAuth")!=null && sessionStorage.getItem("isAuth");
    // return true;
}

export async function getCookie(){

    if(sessionStorage.getItem("userType")==undefined){
            console.log("bla");
            let resp = await getUserTypeOnLogin();
            sessionStorage.setItem("userType",resp.data);
        
     }

}

//confirming user
export const isAdmin = ()=>{
    
    // 
    console.log('isAdmin',sessionStorage.getItem("userType")=="Admin");
    return sessionStorage.getItem('userType')=="Admin";
    // return true;
}

