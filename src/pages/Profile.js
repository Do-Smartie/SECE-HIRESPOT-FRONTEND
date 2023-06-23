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
import { updateUser } from "../services/postRequest";

const Profile = () => {

  
 const[user,setUser] = useState({
    username:'GURUPRASATH M',
    email: 'guruprasath.m2020it@sece.ac.in',
    password: "gusa",
    regNo: "722820205014",
    batch : '2023-2024',
    department : 'Information Technology'
  });

  const[edit,setEdit] = useState(false);

  const[spinner,setSpinner] = useState(false);
 
  //request for getting user Details
  useEffect(()=>{
      getUser().then((res)=>{
        console.log(res);
        if(res.Success){

            var data = res.data;
            setUser({data});
        }
      }).catch((err)=>{
        console.log(err);
        window.alert("Error Occur in Loading - Please Reload Page");
      })
  },[])


  //updating user deatails

  const OnHandleChange = (event)=>{

    const{name,value} = event.target;

    setUser({...user,[name]:value});
  }

  const onHandleSubmit = (event)=>{
    event.preventDefault();

    console.log(user);
    setSpinner(true);
    updateUser(user).then((res)=>{
        console.log(res);
        if(res.Success){
            window.alert(res.Message);
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
                      <img src="user.png" alt="..."  style={{height:"340px",width:"340px"}}/>
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
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Email:
                          </span>{" "}
                          {user.email}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Register Number:
                          </span>{" "}
                          {user.regNo}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                           Batch:
                          </span>{" "}
                          {user.batch}
                        </li>
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
                        <div className="col-lg-20 px-xl-70">
                        <Button variant="primary" style={{marginLeft:"80%"}} onClick={()=>{
                            setEdit(!edit)
                        }} >EDIT</Button>
                        </div>
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
                  value={user.username}
                  name="username"
                  onChange={OnHandleChange}
                  placeholder="Enter the User name"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Password</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={user.password}
                  name="password"
                  onChange={OnHandleChange}
                  placeholder="Enter the new password"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Email</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="email"
                  value={user.email}
                  name="email"
                  onChange={OnHandleChange}
                  placeholder="Enter Your EmailID"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Department</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={user.department}
                  name="department"
                  onChange={OnHandleChange}
                  placeholder="Enter Your Department(Eg- Information Technology)"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Batch</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={user.batch}
                  name="batch"
                  onChange={OnHandleChange}
                  placeholder="Enter Ypur Bacth(Eg - 2020-2024)"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Register Number</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={user.regNo}
                  name="regNo"
                  onChange={OnHandleChange}
                  placeholder="Enter Ypur Register No"
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
