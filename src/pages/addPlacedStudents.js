import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import MainNavbar from "../components/MainNavbar";
import { addPlacedDetails, getComapnyNamesForAddPlacedStudentsPage, getCompanydetailsForAddplacedStudentspage, getStudentDetailsForAddPlacedStudentPage } from "../services/postRequest";

const AddPlacedStudents = () => {
  const [placedStudentDetails, setPlacedStudentsDetails] = useState({
    companyName: "",
    fullName: "",
    regNo: "",
    rollNo: "",
    Package: "",
    department: "",
    batch: "",
    role:''
  });
 
  const[companyNames,setCompanyNames] = useState([]);
  const[roles,setRoles] = useState([]);
  const[packages,setPackages] = useState([]);
   
  //for getting companyName
  
  const getComapanyNames = (event)=>{
      
      const batch = event.target.value;
      sessionStorage.setItem('batch',batch);
      console.log("inside getComapnynames",batch);
      const data = {
        batch:batch
      }
      getComapnyNamesForAddPlacedStudentsPage(data).then((res)=>{
         
        if(res.data.Success){
            setCompanyNames(res.data.Data);
         }
         else{
          window.alert(res.data.Message);
         }
      }).catch((err)=>{
         
        console.log(err);
      })
  }


  //for getting companydeatails

  const getCompanydetails = (event)=>{
      
      const company = event.target.value;
      sessionStorage.setItem('company',company);
      const data = {
        companyName:company,
        batch:placedStudentDetails.batch
      }
      console.log("inside getCompanyDetails",company,placedStudentDetails.batch);
      getCompanydetailsForAddplacedStudentspage(data).then((res)=>{
         
          if(res.data.Success){
             setRoles(res.data.roles);
             setPackages(res.data.packages);
          }
      })
  }

  const getStudentDetails = (event)=>{
     const rollNo = event.target.value;
     const data = {
       rollNo:rollNo,
       batch :placedStudentDetails.batch
     }
     console.log("inside getStudentDetails",rollNo);

     getStudentDetailsForAddPlacedStudentPage(data).then((res)=>{

              if(res.data.Success){
                  setPlacedStudentsDetails({
                    rollNo : res.data.Data[0].rollNo,
                    regNo : res.data.Data[0].regNo,
                    fullName : res.data.Data[0].fullName,
                    department:res.data.Data[0].department
                  })
              }
     })
  }

  //logic for clear session

  const clearSession = ()=>{
      sessionStorage.removeItem('batch');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('package');
      sessionStorage.removeItem('company');
      setPlacedStudentsDetails({
        batch:'',
        companyName:'',
        role:'',
        Package:''
      })
  }
   
  //boolstate spinner

  const [spinner, setSpinner] = useState(false);
  const OnHandleChange = (event) => {
    const { name, value } = event.target;

    setPlacedStudentsDetails({ ...placedStudentDetails, [name]: value });
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();

    console.log(placedStudentDetails);
    placedStudentDetails.companyName = sessionStorage.getItem('company');
    placedStudentDetails.batch = sessionStorage.getItem('batch');
    placedStudentDetails.Package = sessionStorage.getItem('package');
    placedStudentDetails.role = sessionStorage.getItem('role');
    setPlacedStudentsDetails(placedStudentDetails)
    console.log(placedStudentDetails.Package,placedStudentDetails.companyName,placedStudentDetails.role);
    setSpinner(true);
    addPlacedDetails(placedStudentDetails).then((res)=>{
         
        if(res.data.Success){
            window.alert(res.data.Message);
            setSpinner(false);
        }
        else{
          window.alert(res.data.Message);
        }
    }).catch((err)=>{

        window.alert(err.response.data.Message);
    }).finally(()=>{
        setSpinner(false);
    })
    setPlacedStudentsDetails(placedStudentDetails);
    setPlacedStudentsDetails({...placedStudentDetails,
      fullName: "",
      regNo: "",
      rollNo: "",
      department: "",
    });
    console.log(placedStudentDetails);
  };
  return (
    <>
      <MainNavbar />
      <Container>
        <h1 style={{ textAlign: "center" }}>Add Placed Students</h1>
        <Card bg="light">
         <Row style={{marginTop:"2%",textAlign:"right"}}>
          <Col style={{textAlign:"right",marginRight:"4%"}}>
          <Button variant="success" onClick={clearSession}>
                  Finish
          </Button>
          </Col>  
         </Row>
          <Form style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Batch</strong>
              </Form.Label>
              <Col sm={5}>
              <Form.Control as='select' value={placedStudentDetails.batch}  aria-label="Default select example" name="batch" onChange={(e)=>{
                 OnHandleChange(e);
                 getComapanyNames(e);
              }}>
                <option>Batch of the student</option>
                <option value="2020-2024">2020-2024</option>
                <option value="2021-2025">2021-2025</option>
                <option value="2022-2026">2022-2026</option>
                <option value="2023-2027">2023-2027</option>
                <option value="2024-2028">2024-2028</option>
                <option value="2025-2029">2025-2029</option>
                <option value="2026-2030">2026-2030</option>
                <option value="2027-2031">2027-2031</option>
                <option value="2028-2032">2028-2032</option>
                <option value="2029-2033">2029-2033</option>
                <option value="2030-2034">2030-2034</option>
              </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>CompanyName</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  as='select'
                  value={placedStudentDetails.companyName}
                  name="companyName"
                  onChange={(e)=>{
                    OnHandleChange(e);
                    getCompanydetails(e);
                  }}
                  placeholder
                  required
                >
                  <option>Select Company Name</option>
                  {companyNames.map((val)=>{
                      return <option value={val}>{val}</option>
                  })}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Role</strong>
              </Form.Label>
              <Col sm={5}>
              <Form.Control
                  as='select'
                  value={placedStudentDetails.role}
                  name="role"
                  onChange={(e)=>{
                    OnHandleChange(e);
                    sessionStorage.setItem('role',e.target.value);
                  }}
                  placeholder
                  required
                >
                  <option>Select a Role</option>
                  {roles.map((val)=>{
                      return <option value={val}>{val}</option>
                  })}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Package</strong>
              </Form.Label>
              <Col sm={5}>
              <Form.Control
                  as='select'
                  value={placedStudentDetails.Package}
                  name="Package"
                  onChange={(e)=>{
                    OnHandleChange(e);
                    sessionStorage.setItem('package',e.target.value);
                  }}
                  placeholder
                  required
                >
                  <option>Select a Package</option>
                  {packages.map((val)=>{
                      return <option value={val}>{val}</option>
                  })}
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Roll Number</strong>
              </Form.Label>                                                                            
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={placedStudentDetails.rollNo}
                  name="rollNo"
                  onChange={(e)=>{
                    OnHandleChange(e);
                    if(e.target.value.length == 7){
                      getStudentDetails(e);
                    }
                  }}
                  pattern="[0-9]{2}[A-Z]{2}[0-9]{3}"
                  placeholder="Enter The Roll No of Student"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Student Name</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={placedStudentDetails.fullName}
                  name="fullName"
                  onChange={OnHandleChange}
                  placeholder="Enter The student full name-(eg: Ravi K)"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Registration Number</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={placedStudentDetails.regNo}
                  name="regNo"
                  onChange={OnHandleChange}
                  placeholder="Enter The Registration No of Student"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Department</strong>
              </Form.Label>
                <Col sm={5}>
              <Form.Control as='select'
                aria-label="Default select example"
                name="department"
                value={placedStudentDetails.department}
                onChange={OnHandleChange}
              >
                <option>Department</option>
                <option value="IT">IT</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="AIDS">AIDS</option>
                <option value="MECH">MECH</option>
                <option value="CCE">CCE</option>
                <option value="AIML">AIML</option>
                <option value="CSBS">CSBS</option>
              </Form.Control>
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
                    Adding...
                  </button>
                ) : (
                  <Button variant="primary" type="submit">
                    PROCEED TO ADD
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default AddPlacedStudents;
