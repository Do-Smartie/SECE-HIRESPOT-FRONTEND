import React, { useState } from "react";
import MainNavbar from "../components/MainNavbar";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import { changePassword } from "../services/postRequest";
import { useNavigate } from "react-router-dom";

const FotgotPassword = ()=>{

    const[forgotPassword,setForgotPassword] = useState({
        username:'',
        email : '',
        newpassword : '',
        confirmnewpassword : ''
    })
    const navigate = useNavigate();
    const[spinner,setSpinner] = useState(false);
    const[valid,setValid] = useState(false);

    const OnHandleChange = (event)=>{
        const{name,value} = event.target;
        setForgotPassword({...forgotPassword,[name]:value});
    }
    
    const onHandleSubmit = (event)=>{
        event.preventDefault();
        console.log(forgotPassword);

        const user ={
          username : forgotPassword.username,
          email : forgotPassword.email,
          newpassword : forgotPassword.newpassword
        }
        if(forgotPassword.newpassword === forgotPassword.confirmnewpassword){
          setValid(false);
          changePassword(user).then((res)=>{
             if(res.status == 200){
                window.alert(res.Message);
                navigate('/login');
             }
             else if(res.status == 401){
               window.alert(res.Massage);
             }
          }).catch((err)=>{
            window.alert(err.Message);
            navigate('/404pageNotFound');
          }).finally(()=>{
            console.log('process Over');
          })
        }
        else{
          setValid(true);
          return;
        }

        setForgotPassword({
          username:'',
          email : '',
          newpassword : '',
          confirmnewpassword : ''
      })
    }

    return(
        <>
        <MainNavbar />
        <Container>
         <h1 style={{textAlign:"center"}}>Forgot Password</h1>
         <Card bg="light">
           <Form style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
           <Form.Group as={Row} className="mb-3">
               <Form.Label column sm={2} style={{ textAlign: "center" }}>
                 <strong>Email</strong>
               </Form.Label>
               <Col sm={5}>
                 <Form.Control
                   type="text"
                   value={forgotPassword.email}
                   name="username"
                   onChange={OnHandleChange}
                   placeholder="Enter your username-(eg : abcd.sece.ac.in)"
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
                   value={forgotPassword.email}
                   name="email"
                   onChange={OnHandleChange}
                   placeholder="Enter your EmailID-(eg : abcd.sece.ac.in)"
                   required
                 />
               </Col>
             </Form.Group>
             <Form.Group as={Row} className="mb-3">
               <Form.Label column sm={2} style={{ textAlign: "center" }}>
                 <strong>New Password</strong>
               </Form.Label>
               <Col sm={5}>
                 <Form.Control
                   type="password"
                   value={forgotPassword.newPassword}
                   name="newPassword"
                   onChange={OnHandleChange}
                   placeholder="Enter New Password"
                   required
                 />
               </Col>
             </Form.Group>
             <Form.Group as={Row} className="mb-3">
               <Form.Label column sm={2} style={{ textAlign: "center" }}>
                 <strong>Confirm New Password</strong>
               </Form.Label>
               <Col sm={5}>
                 <Form.Control
                   type="password"
                   value={forgotPassword.confirmNewPassword}
                   name="confirmNewPassword"
                   onChange={OnHandleChange}
                   placeholder="Enter New Passsword Correctly"
                   required
                 />
                 {valid && (<span style={{color:'red'}}>wrong password</span>)}
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
                     Processing...
                   </button>
                 ) : (
                   <Button variant="primary" type="submit">
                     Change Password
                   </Button>
                 )}
               </Col>
             </Row>
           </Form>
         </Card>
       </Container>
        </>
    );
}

export default FotgotPassword;