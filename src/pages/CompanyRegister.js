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
    const {_id,companyName,role,Package,batch,dateOfDrive} = location.state;
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
        dateOfDrive:dateOfDrive,
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
                dateOfDrive:dateOfDrive,
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