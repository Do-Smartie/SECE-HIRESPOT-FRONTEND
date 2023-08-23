import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { downloadDriveResult } from "../services/postRequest";
import { isAdmin } from "../services/Auth";
import { Link } from "react-router-dom";

const DownloadResult = (props) => {
     
    
    var isadmin = isAdmin();
    //state for resultdeatail
    const[resultDetail,setResultDetail] = useState({
        companyName : !props ? '' : props.companyName,
        batch : !props ? '' : props.batch,
        role : !props ? '':props.role,
        roundNumber : ''
        
    });
    
    const[spinner,setSpinner] = useState(false);
    console.log(props.companyName,props.batch,props.role);
    console.log(resultDetail);
    
    const OnHandleChange =(event)=>{
        const{name,value} = event.target;

        setResultDetail({...resultDetail,[name]:value});
    }

    const onHandleSubmit = (event)=>{
        event.preventDefault();
        resultDetail.role = props.role;
        setResultDetail({...resultDetail})
        console.log(resultDetail);
        
        setSpinner(true);
        downloadDriveResult(resultDetail).then((res)=>{
            console.log(res);
            if(res.data.Success===false){
              window.alert(res.data.Message);
              return;
            }
            else{
              window.location.href = process.env.REACT_APP_BACKEND_API+"/sece/results/"+res.data;
              setSpinner(false);
            }
        }).catch((err)=>{
            console.log(err);
            window.alert("Error occurred in Downloading - Try Again");
        }).finally(()=>{
            console.log("process over");
            setSpinner(false);
        })
        setResultDetail({
            companyName : !props ? '' : props.companyName,
            batch : !props ? '' : props.batch,
            roundNumber : ''
        })
    }
  return (
    <Container>
      <h1>Download Results</h1>
      <Card bg="light">
        <Form style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} style={{ textAlign: "center" }}>
              <strong>CompanyName</strong>
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="text"
                value={resultDetail.companyName}
                name="companyName"
                onChange={OnHandleChange}
                placeholder="Enter The Company name-(eg : Google)"
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
                value={resultDetail.batch}
                name="batch"
                onChange={OnHandleChange}
                placeholder="Enter The Batch-(eg : 2020-2024)"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} style={{ textAlign: "center" }}>
              <strong>Round</strong>
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="number"
                value={resultDetail.roundNumber}
                name="roundNumber"
                onChange={OnHandleChange}
                placeholder="Enter The Round No-(eg : 1 (or) 2)"
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
                    Downloading...
                  </button>
                ) : (
                  <Button variant="primary" type="submit">
                    Download
                  </Button>
                )}
              </Col>
              <Col>
              {isadmin && props ?(
               <Link to="/addDriveResults" state={{companyName:props.companyName,batch:props.batch,role:props.role}}>
                 <Button variant="primary" >
                    ADD RESULSTS
                  </Button>
               </Link>
            ):null}
              </Col>
            </Row>
            
        </Form>
      </Card>
    </Container>
  );
};

export default DownloadResult;
