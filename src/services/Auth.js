import { getUserTypeOnLogin } from "./getRequset";



//checking for user authenticated or not
export const isAuthenticated =()=>{
    
    return  sessionStorage.getItem("isAuth")!=null && sessionStorage.getItem("isAuth");
    // return true;
}

export async function getCookie(){

    console.log('getCokkie',sessionStorage.getItem("userType"))

    if(sessionStorage.getItem("userType")===null){
            
            let resp = await getUserTypeOnLogin();  
            sessionStorage.setItem("userType",resp.data);
        
     }

}

//confirming user
export const isAdmin = ()=>{
    
    
    return sessionStorage.getItem('userType')=="Admin";
    // return true;
}

