import React, { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";

import "../profile.css";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import { getUser } from "../services/getRequset";
import { getDisableCGPA, updateUser,getEnableCGPA } from "../services/postRequest";


const Profile = () => {

  
 const[user,setUser] = useState({
  _id:'',
  oldUserName:'',
  username: "",
  email: "",
  password: "",
  regNo: "",
  rollNo :"",
  userType : "",
  batch: "",
  department: "",
  fullName : '',
  gender : '',
  dob : '',
  tenthPercent : '',
  twelthPercent : '',
  diplomaPercent:'',
  cgpa : '',
  noOfArrears : '',
  historyOfArrears : '',
  mobileNumber  : '',
  address : '',
  onePageResume : '',
  threePageResume : '',
  });

  const[newUser,setNewUser] = useState({
      _id:'',
      username: "",
      oldUserName:'',
      email: "",
      password: "",
      regNo: "",
      rollNo :"",
      userType : "",
      batch: "",
      department: "",
      fullName : '',
      gender : '',
      dob : '',
      tenthPercent : '',
      twelthPercent : '',
      diplomaPercent:'',
      cgpa : '',
      noOfArrears : '',
      historyOfArrears : '',
      mobileNumber  : '',
      address : '',
      onePageResume : '',
      threePageResume : '',
  });

  const[edit,setEdit] = useState(false);

  const[spinner,setSpinner] = useState(false);
  const[cgpaSpinner,setCgpaSpinner] = useState(false);
  //request for getting user Details
  useEffect(()=>{
      getUser().then((res)=>{
        console.log(res);
        if(res.data.Success){

            var data = res.data.Data[0];
            setUser({...data});
            setNewUser({...data});
            console.log(user);
            console.log(newUser);
        }
      }).catch((err)=>{
        console.log(err);
        window.alert("Error Occur in Loading - Please Reload Page");
      })
  },[]);

  //enabling edit option for cgpa
  
  const[disable,setDisable] = useState(false);
  const enableCgpaEdit =()=>{
     
    setCgpaSpinner(true);
    let batch = window.prompt("Enter The batch (Eg:2024)");
    if(batch === null || batch === ""){
       window.alert("You didn't given any batch please try Again");
       setCgpaSpinner(false);
       return;
    }
    var data = {
      department : user.department,
      batch : batch
    }
    console.log(data);
     getEnableCGPA(data).then((res)=>{
       if(res.data.Success){
          window.alert(res.data.Message);
          setCgpaSpinner(false);
          setDisable(true);
       }
     }).catch((err)=>{
      window.alert(err.response.data.Message);
     }).finally(()=>{
       setCgpaSpinner(false);
     })
       
  }

  //disable cgpa edit
  const disableCgpaEdit = ()=>{
      
    setCgpaSpinner(true);
    let batch = window.prompt("Enter The batch (Eg:2024)");
    if(batch === null || batch === ""){
       window.alert("You didn't given any batch please try Again");
       setCgpaSpinner(false);
       return;
    }
    var data = {
      department : user.department,
      batch : batch
    }
    console.log(data);
     getDisableCGPA(data).then((res)=>{
       if(res.data.Success){
          window.alert(res.data.Message);
          setCgpaSpinner(false);
          setDisable(false);
       }
     }).catch((err)=>{
      window.alert(err.response.data.Message);
     }).finally(()=>{
       setCgpaSpinner(false);
     })
       
  }

  //updating user deatails

  
  
  

  const OnHandleChange = (event)=>{

    const{name,value} = event.target;

    setNewUser({...newUser,[name]:value});
  }

  const onHandleSubmit = (event)=>{
    event.preventDefault();

    console.log(newUser);
    setSpinner(true);
    updateUser(newUser).then((res)=>{
        console.log(res);
        if(res.data.Success){
            window.alert(res.data.Message);
            setEdit(false);
            setSpinner(false);
        }
    }).catch((err)=>{
        console.log(err);
        window.alert("Error Occurred in Updating - Try Again");
    }).finally(()=>{
        console.log("process over");
        setSpinner(false);
    })
  }

  function toDate(dates){

    let date = new Date(dates);
    return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
  }

  return (
    <>
      <MainNavbar />
      <section class="bg-light">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 mb-4 mb-sm-5">
              <div class="card1 card-style1 border-0">
                <div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                  <div class="row align-items-center">
                    <div class="col-lg-6 mb-4 mb-lg-0">
                      <img src="user.png" alt="..." className="userProfileImg" />
                      <h3 style={{ marginLeft: "9%", marginTop: "4%" }}>
                        {user.username}
                      </h3>
                    </div>
                    <div class="col-lg-6 px-xl-10">
                      <div class="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                        <h3 class="h2 text-white mb-0">{user.username}</h3>
                        <span class="text-primary">{user.department}</span>
                      </div>
                      <ul class="list-unstyled mb-1-9">
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Username:
                          </span>{" "}
                          {user.username}
                        </li>
                        {sessionStorage.getItem('userType')==='Student' &&(
                          <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Full Name:
                          </span>{" "}
                          {user.fullName}
                        </li>
                        )}
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Email:
                          </span>{" "}
                          {user.email}
                        </li>
                        {sessionStorage.getItem('userType')==='Faculty' || sessionStorage.getItem('userType')==='Admin' || sessionStorage.getItem('userType')==='FacultyPC' ? (
                          <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Employee Number :
                          </span>{" "}
                          {user.rollNo}
                         </li>
                        ):(
                          <>
                           <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Register Number:
                          </span>{" "}
                          {user.regNo}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Date Of Birth:
                          </span>{" "}
                          {toDate(user.dob)}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Tenth Percent:
                          </span>{" "}
                          {user.tenthPercent}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Twelth Percent:
                          </span>{" "}
                          {user.twelthPercent}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Diploma Percent:
                          </span>{" "}
                          {user.diplomaPercent}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            CGPA:
                          </span>{" "}
                          {user.cgpa}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            No Of Arrears:
                          </span>{" "}
                          {user.noOfArrears}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            History Of Arrears:
                          </span>{" "}
                          {user.historyOfArrears}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Mobile Number:
                          </span>{" "}
                          {user.mobileNumber}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                           Batch:
                          </span>{" "}
                          {user.batch}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                           Registered Companies:
                          </span>{" "}
                          {user.RegistrationCompanyCount}
                        </li>
                        </>
                        )}
                        
                        <li class="display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Department:
                          </span>{" "}
                           {user.department}
                        </li>
                      </ul>
                      <ul class="social-icon-style1 list-unstyled mb-0 ps-0">
                        <li>
                          <a href="#!">
                            <i class="ti-twitter-alt"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <i class="ti-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <i class="ti-pinterest"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <i class="ti-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="row align-items-right" >
                       {sessionStorage.getItem('userType')==="Student" && (
                          <div className="col-lg-20 px-xl-70">
                          <Button variant="primary" style={{marginLeft:"80%"}} onClick={()=>{
                              setEdit(!edit)
                          }} >EDIT</Button>
                          </div>
                       )}
                        <br></br><br></br>
                        {sessionStorage.getItem('userType')==='FacultyPC' && (
                          <div className="col-lg-20 px-xl-70">
                           {cgpaSpinner ? (
                             <button className="btn btn-primary" style={{marginLeft:"80%"}} type="button" disabled>
                             <span
                               className="spinner-border spinner-border-sm"
                               role="status"
                               aria-hidden="true"
                             ></span>
                             Enabling...
                           </button>
                           ):(
                            <>
                              {disable ?(
                                <Button variant="primary" style={{marginLeft:"70%"}} onClick={disableCgpaEdit} >Disable CGPA EDIT</Button>
                              ):(
                                <Button variant="primary" style={{marginLeft:"70%"}} onClick={enableCgpaEdit} >Enable CGPA EDIT</Button>
                              )}
                            </>
                           )} 
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {edit?(
        <Container>
        <h1 style={{textAlign:"center"}}>UPDATE DETAILS</h1>
        <Card bg="light">
          <Form style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Username</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={newUser.username}
                  name="username"
                  onChange={OnHandleChange}
                  placeholder="Enter the User name"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Full Name</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={newUser.fullName}
                  name="fullName"
                  onChange={OnHandleChange}
                  placeholder="Enter the exact name for company Registration"
                  required
                />
              </Col>
            </Form.Group>
            {user.edit==="true" && (
              <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>CGPA</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={newUser.cgpa}
                  name="cgpa"
                  onChange={OnHandleChange}
                  placeholder="Enter the new CGPA"
                  required
                />
              </Col>
            </Form.Group>
            )}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Email</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="email"
                  value={newUser.email}
                  name="email"
                  onChange={OnHandleChange}
                  placeholder="Enter Your EmailID"
                  required
                />
              </Col>
            </Form.Group>
            <Row className="mb-3">
                <Col style={{ textAlign: "center" }}>
                  {spinner ? (
                    <button className="btn btn-primary" type="button" disabled>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Updating...
                    </button>
                  ) : (
                    <Button variant="primary" type="submit">
                      UPDATE PROFILE
                    </Button>
                  )}
                </Col>
              </Row> 
          </Form>
        </Card>
      </Container>
      ):null}
    </>
  );
};

export default Profile;
