import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import MainNavbar from "../components/MainNavbar";
import { addPlacedDetails } from "../services/postRequest";

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

  //boolstate spinner

  const [spinner, setSpinner] = useState(false);
  const OnHandleChange = (event) => {
    const { name, value } = event.target;

    setPlacedStudentsDetails({ ...placedStudentDetails, [name]: value });
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();

    console.log(placedStudentDetails);
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

    setPlacedStudentsDetails({
      companyName: "",
      fullName: "",
      regNo: "",
      rollNo: "",
      Package: "",
      department: "",
      batch: "",
      role:''
    });
  };
  return (
    <>
      <MainNavbar />
      <Container>
        <h1 style={{ textAlign: "center" }}>Add Placed Students</h1>
        <Card bg="light">
          <Form style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>CompanyName</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={placedStudentDetails.companyName}
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
                  type="text"
                  value={placedStudentDetails.role}
                  name="role"
                  onChange={OnHandleChange}
                  placeholder="Enter The Role -(eg: FullStack)"
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
                  type="number"
                  value={placedStudentDetails.Package}
                  name="Package"
                  onChange={OnHandleChange}
                  placeholder="Enter The Package Of Company without LPA"
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
                <strong>Roll Number</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={placedStudentDetails.rollNo}
                  name="rollNo"
                  onChange={OnHandleChange}
                  placeholder="Enter The Registration No of Student"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Batch</strong>
              </Form.Label>
              <Col sm={5}>
              <Form.Control as='select' value={placedStudentDetails.batch} aria-label="Default select example" name="batch" onChange={OnHandleChange}>
                <option>Batch of the student</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
                <option value="2031">2031</option>
                <option value="2032">2032</option>
                <option value="2033">2033</option>
                <option value="2034">2034</option>
              </Form.Control>
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
