import axios from "axios";


//axois call for getting companies
export const getCompanies = async()=>{
    return await axios.get(process.env.REACT_APP_BACKEND_API+"/sece/placements/companies",{withCredentials:true});
}


//await axios request for getting user details

export const getUser = async()=>{
    return await axios.get(process.env.REACT_APP_BACKEND_API+"/sece/user/profile",{withCredentials:true});
}

//await axios get request for getting counts

export const getCounts = async()=>{
    return await axios.get(process.env.REACT_APP_BACKEND_API+"/sece/admin/dashboard/counts",{withCredentials:true});
}

//await axios for getting user Deatails

export const getFaculties = async()=>{

    return await axios.get(process.env.REACT_APP_BACKEND_API+"/sece/admin/facultydetails",{withCredentials:true});
}

//getting counts for Counter
export const getCounterData = async()=>{

    return await axios.get(process.env.REACT_APP_BACKEND_API+"/sece/users/home/counts",{withCredentials:true});
}

//getting completedCompanyDetails for home

export const getCompletedCompaniesDetailsForHome = async()=>{

    return await axios.get(process.env.REACT_APP_BACKEND_API+"/sece/users/home/completedcompanydetails",{withCredentials:true})
}

//getuserType on Login

export const getUserTypeOnLogin = async()=>{

    console.log('Hello')

    return await axios.get(process.env.REACT_APP_BACKEND_API+"/sece/user/type",{withCredentials:true});
}

//logout user

export const logOut = async()=>{

    return await axios.get(process.env.REACT_APP_BACKEND_API+"/sece/user/logout",{withCredentials:true});
}