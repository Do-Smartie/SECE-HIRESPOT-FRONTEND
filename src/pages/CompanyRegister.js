import {React, useState} from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import { registerToCompany } from "../services/postRequest";

const CompanyRegister = ()=>{
     
    const location = useLocation();
    const {_id,companyName,role,Package,batch} = location.state;
    // console.log(id,companyName);

    const navigate = useNavigate();

    const[spinner,setSpinner] = useState(false);

    //state for companyregister

    const[applicant,setApplicant] = useState({
        _id:_id,
        role :role,
        companyName:companyName,
        Package : Package,
        batch:batch,
        registerNumber:'',
        rollNumber:'',
        name : '',
        department : '',
        gender : '',
        dob : '',
        tenthPercent : '',
        twelthPercent : '',
        diplomaPercent:'',
        cgpa : '',
        noOfArrears : '',
        historyOfArrears : '',
        mobileNumber  : '',
        mailID : '',
        address : '',
        onePageResume : '',
        threePageResume : ''
    });

     //logic for onHandleChange

     const onHandleChange = (event)=>{
        const{name,value} = event.target;

        setApplicant({...applicant,[name]:value});
     }
    
     //logic for onHandleSubmit

     const onHandleSubmit = (event)=>{
        event.preventDefault();

        console.log(applicant);
        setSpinner(true);
        registerToCompany(applicant).then((res)=>{
            console.log(res);
            if(res.data.Success){
                setSpinner(false);
                let assume = window.prompt(res.data.Message);
                if(assume!=null){
                    navigate('/home'); 
                }
            }
            else{
                window.alert(res.data.Message);
            }
        }).catch((err)=>{
            console.log(err);
            window.alert(err.response.data.Message);
        }).finally(()=>{
            setSpinner(false);
        })

        setApplicant(
            {
                _id:_id,
                role :role,
                companyName:companyName,
                Package : Package,
                batch:batch,
                registerNumber:'',
                rollNumber:'',
                name : '',
                department : '',
                gender : '',
                dob : '',
                tenthPercent : '',
                twelthPercent : '',
                diplomaPercent:'',
                cgpa : '',
                noOfArrears : '',
                historyOfArrears : '',
                mobileNumber  : '',
                mailID : '',
                address : '',
                onePageResume : '',
                threePageResume : ''
            }
        )
     }
    return(
     <>
       <MainNavbar />
       <Container>
        <h1 style={{ marginTop: "3%", textAlign: "center",textTransform:"uppercase" }}>REGISTER FOR  {companyName}</h1>
        <Card bg="light">
           <Form  style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>Register No (12 Digit)</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="text"
                    value={applicant.registerNumber}
                    name="registerNumber"
                    onChange={onHandleChange}
                    placeholder="eg : 7228xxxxxx10"
                    required
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>Roll No (7 Digit)</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="text"
                    value={applicant.rollNumber}
                    name="rollNumber"
                    onChange={onHandleChange}
                    placeholder="eg : 20IT001"
                    required
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>Name of the Candidate(Initial at last)  </strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="text"
                    value={applicant.name}
                    name="name"
                    onChange={onHandleChange}
                    placeholder="Enter the Name-(In Capital)"
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
                    value={applicant.department}
                    name="department"
                    onChange={onHandleChange}
                    placeholder="eg : IT"
                    required
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>Gender</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Check
                    type="radio"
                    value="male"
                    name="gender"
                    label ="male"
                    checked = {applicant.gender === "male"}
                    onChange={onHandleChange}
                    required
                    />
                    <Form.Check
                    type="radio"
                    value="female"
                    name="gender"
                    label ="female"
                    checked = {applicant.gender === "female"}
                    onChange={onHandleChange}
                    required
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>Date Of Birth</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="date"
                    value={applicant.dob}
                    name="dob"
                    onChange={onHandleChange}
                    required
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>10th Percentage</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="number"
                    value={applicant.tenthPercent}
                    name="tenthPercent"
                    onChange={onHandleChange}
                    placeholder="eg : 80.28"
                    min={1}
                    max={100}
                    step={0.01}
                    required
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>12th Percentage(if not just ignore)</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="number"
                    value={applicant.twelthPercent}
                    name="twelthPercent"
                    onChange={onHandleChange}
                    placeholder="eg : 80.28 "
                    step={0.01}
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>Diploma Percentage(if not just ignore)</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="number"
                    value={applicant.diplomaPercent}
                    name="diplomaPercent"
                    onChange={onHandleChange}
                    placeholder="eg : 80.28 "
                    step={0.01}
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>CGPA out of 10(As on Date)</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="number"
                    value={applicant.cgpa}
                    name="cgpa"
                    onChange={onHandleChange}
                    placeholder="eg : 8.98"
                    min={1}
                    max={10}
                    step={0.01}
                    required
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>No of Arrears(As on Date)</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="number"
                    value={applicant.noOfArrears}
                    name="noOfArrears"
                    onChange={onHandleChange}
                    placeholder="eg : 2 (or) if not type 0"
                    min={0}
                    max={46}
                    required
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>History of Arrears(As on Date)</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="number"
                    value={applicant.historyOfArrears}
                    name="historyOfArrears"
                    onChange={onHandleChange}
                    placeholder="eg : 2 (or) if not type 0"
                    min={0}
                    max={46}
                    required
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>Mobile Number</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="number"
                    value={applicant.mobileNumber}
                    name="mobileNumber"
                    onChange={onHandleChange}
                    placeholder="eg : 98XXXXXX89"
                    required
                    />
                </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>Domain Mail ID</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="email"
                    value={applicant.mailID}
                    name="mailID"
                    onChange={onHandleChange}
                    placeholder="eg : abcd2020it@sece.ac.in"
                    required
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>Address</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="textarea"
                    value={applicant.address}
                    name="address"
                    onChange={onHandleChange}
                    placeholder="eg : 1/10 New Scheme road Pollachi"
                    required
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>onePage Resume Drive Link</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="url"
                    value={applicant.onePageResume}
                    name="onePageResume"
                    onChange={onHandleChange}
                    placeholder="drive link of your 1 pageresume"
                    required
                    />
                </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>threePage Resume Drive Link</strong>
                </Form.Label>
                <Col sm={5}>
                    <Form.Control
                    type="url"
                    value={applicant.threePageResume}
                    name="threePageResume"
                    onChange={onHandleChange}
                    placeholder="drive link of your 2(or)3 page resume"
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
                  processing...
                </button>
                ):(
                <Button variant="primary" type="submit">
                REGISTER
                </Button>)}
                
                
              </Col>
            </Row>
           </Form>
        </Card>
       </Container>
     </>   
    
    
    );
}

export default CompanyRegister;