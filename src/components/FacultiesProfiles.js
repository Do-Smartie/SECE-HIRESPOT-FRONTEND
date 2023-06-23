import React from "react";
import MainNavbar from "./MainNavbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteUser } from "../services/postRequest";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import "../App.css";

const FacultiesProfiles = ()=>{
  const location = useLocation();
  const navigate = useNavigate();
  const{user} = location.state;
  const [boolRemoveButton, setBoolRemoveButton] = useState(false); 
  const DeleteUser = () => {
    setBoolRemoveButton(true);
    const data = {
      _id: user._id,
    };
    let text = "Are you sure You want to delete this account ?";
    if (window.confirm(text) === true) {
      deleteUser(data)
        .then((res) => {
          if (res.Success) {
            window.alert(res.Message);
            navigate("/showFaculties");
            setBoolRemoveButton(false);
          }
        })
        .catch((err) => {
          window.alert(
            "Error occurred in Account deletion ,Please try again later"
          );
        })
        .finally(() => {
          console.log("process completed");
          setBoolRemoveButton(false);
        });
    }
  };
    return(
        <>
          <MainNavbar />
          <Container style={{marginTop:"4%"}}>
            <Row>
              <Col  xs={7} md={8} >
              <Card bg='light'  className="profileCardMob">
                <Row className="justify-content-md-center">
                <Col xs={2} md={2}>
                  <img
                    src="user.png"
                    alt="profile"
                    style={{
                      height: "75px",
                      width: "75px",
                      marginLeft: "4%",
                      marginTop: "6%",
                    }}
                  ></img>
                </Col>
                <Col md="auto">
                  <h6>User Name : {user.username}</h6>
                  <h6>Register No : {user.rollNo}</h6>
                  <h6>Department : {user.department}</h6>
                  <h6>Email : {user.email}</h6>
                </Col>
                <Col xs lg="2" >
                  {boolRemoveButton ? (
                    <Spinner
                      animation="border"
                      role="status"
                      className='profileRemoveButton'
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={DeleteUser}
                      className='profileRemoveButton'
                    >
                      Remove Account
                    </Button>
                  )}
                </Col>
                   </Row>
                </Card>
              </Col>
                
            </Row>
          </Container>
        </>
    );
}

export default FacultiesProfiles;