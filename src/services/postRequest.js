import axios from 'axios'


//register request
export const register = async(data)=>{
    console.log(process.env.REACT_APP_BACKEND_API);
    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/user/register",data,{withCredentials:true});
}

//login request
export const login = async(data)=>{
    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/user/login",data,{withCredentials:true});
}

//Add company request

export const addComapny = async(data)=>{
    
    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/admin/addcompanydetails",data,{withCredentials:true});
}

//upload JD request

export const UploadJD = async(file)=>{
    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/admin/uploadcompanyjd",file,{withCredentials:true});
}

//company registration request

export const registerToCompany = async(data)=>{
    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/user/registercompany",data,{withCredentials:true});

}

//Add Drive results request
export const addDriveResult = async(details)=>{
    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/admin/addresultdetails",details,{withCredentials:true});
}

//uploading or storing results of drive
export const uploadResults = async(file)=>{
    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/admin/uploadresultfile",file,{withCredentials:true});
}

//download result of the drive

export const downloadDriveResult = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/user/resultdownload",data,{withCredentials:true});
}

//downloading JD file

export const getJD = async(companyName,role,batch)=>{
    
    const data = {
        companyName : companyName,
        role : role,
        batch : batch
    }

    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/user/jdfiledownload",data,{withCredentials:true});
}

//request for updating user details

export const updateUser = async(user)=>{
    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/user/editprofile",user,{withCredentials:true});
}

//post api request for edit company

export const editCompany = async(data)=>{
      
    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/admin/editcompany',data,{withCredentials:true});
}

//delete user account from DB

export const deleteUser = async(user)=>{
    
    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/user/delete/account",user,{withCredentials:true});
}

//post request for getting batch wise students

export const getStudents = async(studentBatch)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/admin/showusers",studentBatch,{withCredentials:true});
}

//post request for getting particular student company details

export const getUserCompanyDetails = async(studentData)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/admin/showuserdetails",studentData,{withCredentials:true});
}

//post request for getting batch wise Piplinedcompanies

export const getBatchwisePipelinedCompanies = async(companyBatch)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/admin/showpiplinedcompanies",companyBatch,{withCredentials:true});
}

//post request for getting batch wise Completedcompanies

export const getBatchwiseCompletedCompanies = async(companyBatch)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/admin/showcompletedcompanies",companyBatch,{withCredentials:true});
}

//post request for  getting registered students of particular company

export const getRegisteredStudents = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/admin/showregisteredstudents",data,{withCredentials:true});
}

//post request for  getting placed students of particular company

export const getPlacedStudents = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/admin/showplacedstudents",data,{withCredentials:true})
}

//getting enable permmision for cgpa update

export const getEnableCGPA = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/facultypc/profile/enablecgpaupdate",data,{withCredentials:true})
}

//getting enable permmision for cgpa update

export const getDisableCGPA = async(data)=>{
    return await axios.post(process.env.REACT_APP_BACKEND_API+"/sece/facultypc/profile/disablecgpaupdate",data,{withCredentials:true})
}

//change password

export const changePassword = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/user/forgotpassword',data,{withCredentials:true});
}


//post route for addPlacedStudents page for geting available companies

export const getComapnyNamesForAddPlacedStudentsPage = async(batch)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/admin/getcompanynamesforaddplacedpalcedstudentspage',batch,{withCredentials:true});
}

//post request for getting company deatails for addplaced students details
export const getCompanydetailsForAddplacedStudentspage = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/admin/getcompanydetailsforaddplacedstudentspage',data,{withCredentials:true});
}

//post request for getting students details for addPlacedStudents details
export const getStudentDetailsForAddPlacedStudentPage = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/admin/getstudentdetailsfotaddplacedstudentspage',data,{withCredentials:true});
}

//post route for addingPlaced student details

export const addPlacedDetails = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/pc/addplaceddetails',data,{withCredentials:true});
}

// post request for adding apti round review of Students about the compnay

export const addAptiReview = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/students/addaptireview',data,{withCredentials:true});
}

// post request for adding coding round review of Students about the compnay

export const addCodingReview = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/students/addcodingroundreview',data,{withCredentials:true});
}

// post request for adding Tech Hr round review of Students about the compnay

export const addTechHrReview = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/students/addtechhrreview',data,{withCredentials:true});
}

// post request for adding GD round review of Students about the compnay

export const addGDReview = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/students/addgdreview',data,{withCredentials:true});
}

// post request for adding Hackathon round review of Students about the compnay

export const addHackathonReview = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/students/addhackathonreview',data,{withCredentials:true});
}

// post request for adding PersonalHR round review of Students about the compnay

export const addPersonalReview = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/students/addpersonalhrreview',data,{withCredentials:true});
}

// post Route for getting comapny names for Students Feedback
export const getComapnyNamesFeedBack = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/students/getcompanynamesforfeedback',data,{withCredentials:true});
}

// post Route for getting comapny roles and Packages for Students Feedback
export const getCompanyDetailsFeedBack = async(data)=>{

    return await axios.post(process.env.REACT_APP_BACKEND_API+'/sece/students/getcompanydetailsforfeedback',data,{withCredentials:true});
}




