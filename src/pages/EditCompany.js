import MainNavbar from "../components/MainNavbar";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import ReactDOM from "react-dom";
import { useState } from "react";


import {  isCompanyUpdated } from "../services/companyServices";
import { editCompany } from "../services/postRequest.js";
import { useLocation, useNavigate } from "react-router-dom";

const EditCompany = (props)=>{


    
  const navigate = useNavigate();


  //getting state from companycard

  const location = useLocation();
  const{currCompany} = location.state;

    //state for company deatails
  const [companyDetails, setCompanyDetails] = useState(
    { 
      _id : currCompany._id,
      companyName: currCompany.companyName,
      role: currCompany.role,
      Package: currCompany.Package,
      category: currCompany.category,
      batch : currCompany.batch,
      dateOfDrive: currCompany.dateOfDrive,
      lastDateOfReg: currCompany.lastDateOfReg,
    }
  );
  console.log(currCompany);

  //state for spinner
  const[spinner,setSpinner] = useState(false);

  //onChange logic for companyDeatails
  const OnHandleChange = (event) => {
    const { name, value } = event.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };


  //onSubmit logic for form data
  const onHandleSubmit = (event) => {
    event.preventDefault();
    
    console.log(companyDetails);

    //spinner works
    setSpinner(true);

    //calling axios post funtion for adding company
    editCompany(companyDetails)
      .then((res) => {
        console.log(res);
        if(isCompanyUpdated(res.data.Message)){
            window.alert(res.data.Message);
            setSpinner(false);
            navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("Error Occur in Updating Company Detail - Try Again");
      })
      .finally(() => {
        console.log("process over");
        setSpinner(false);
      });

    //setting companyDetails to initial state
    setCompanyDetails({
      companyName: currCompany.companyName,
      role: currCompany.role,
      Package: currCompany.Package,
      category: currCompany.category,
      batch : currCompany.batch,
      dateOfDrive: currCompany.dateOfDrive,
      lastDateOfReg: currCompany.lastDateOfReg,
    });
  };


  
    return(
        <>
        <MainNavbar />
        <Container>
        <h1 style={{ marginTop: "3%", textAlign: "center" }}>UPDATION IN COMPANY-{currCompany.companyName}</h1>
        <Card bg="light">
          <Form style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>CompanyName</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={companyDetails.companyName}
                  name="companyName"
                  onChange={OnHandleChange}
                  placeholder="Enter The Company name-(eg : Google)"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Role</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  name="role"
                  value={companyDetails.role}
                  onChange={OnHandleChange}
                  type={"text"}
                  placeholder="Enter The Role-(eg : Fullstack Developer)"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Package</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={companyDetails.Package}
                  name="Package"
                  onChange={OnHandleChange}
                  placeholder="Enter The Package-(eg : 12LPA (or) 12L-CTC)"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Category</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={companyDetails.category}
                  name="category"
                  onChange={OnHandleChange}
                  placeholder="Enter The Category of Company-(eg : Software (or) Hardware)"
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
                  value={companyDetails.batch}
                  name="batch"
                  onChange={OnHandleChange}
                  placeholder="Enter The Batch-(eg : 2020-2024)"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Date of Drive</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="date"
                  name="dateOfDrive"
                  value={companyDetails.dateOfDrive}
                  onChange={OnHandleChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Last Date for Registration</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="date"
                  name="lastDateOfReg"
                  value={companyDetails.lastDateOfReg}
                  onChange={OnHandleChange}
                  required
                />
              </Col>
            </Form.Group>
            <Row className="mb-3">

              <Col style={{ textAlign: "center" }}>
                {spinner?(
                  <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Updating...
                </button>
                ):(
                <Button variant="primary" type="submit">
                 UPDATE DETAILS
                 </Button>)}
                
                
              </Col>
            </Row>
          </Form>
        </Card>
        <Row style={{ marginTop: "4%" }}>
          <Col>
            <hr
              style={{ border: "3px solid #004E9B", borderRadius: "5px" }}
            ></hr>
          </Col>
        </Row>
      </Container>
        </>
    );
}


export default EditCompany;