import "../App.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { isAdmin } from "../services/Auth";
import dayjs from 'dayjs';

import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import ProgressBar from "./progressBar";



const CompanyCard = (props) => {
  const { _id,companyName, role, Package, batch,category, lastDateOfReg,dateOfDrive,RegistrationCount} = props.company;

  const barValue = props.barVal;

  const{getCompDetail} = props;


  const buttonRender = () => {
    if (isAdmin()) {
      return (
        <>
          <Col xs={6}>
          <Link to='/singleCompanyresult' state={{companyName:companyName,batch:batch}}>
            <Button variant="outline-success" size="sm">Results</Button>
            </Link>
          </Col>
          <Col xs={6} style={{ textAlign: "right" }}>
            <Link to='/editCompany' state={{currCompany:props.company}}>
            <Button className="primary" size="sm">Edit</Button>
            </Link>
          </Col>
        </>
      );
    } else {
      return (
        <>
          <Col xs={6}></Col>
          <Col xs={6} style={{ textAlign: "right" }}>
            <Link to='/singleCompanyresult' state={{companyName:companyName,batch:batch}}>
            <Button variant="outline-success" size="sm">Results</Button>
            </Link>
            
          </Col>
        </>
      );
    }
  };

  return (
    <div className="comCard p-3 mb-2">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div className="icon">
            {" "}
            <img src="/loginLogo.jpg" alt='image not loading' className="iconimg"></img>{" "}
          </div>
          <div className="ms-2 c-details">
            <h4 className="mb-0" style={{textTransform:"uppercase",fontFamily:"fantasy"}}>{companyName}</h4> <span>{dayjs(dateOfDrive).format("DD/MM/YYYY")}</span>
          </div>
        </div>
        <div className="badge">
          {" "}
          <span>{category}</span>{" "}
        </div>
      </div>
      <div className="mt-3">
        {/* <div className="col" style={{ color: "#004E9B" }}>
          <h5 style={{fontSize:"22px",fontFamily:"fantasy"}}>
            Welcome Leadership Team From<br></br>
          </h5>
          <h4 style={{textAlign:"center",fontSize:"20",textTransform:"uppercase",fontFamily:"fantasy",color:"red"}}> {companyName}</h4>
        </div> */}
        <h7 style={{textTransform:"uppercase"}} className="text2"><strong>Role : {role}</strong></h7><br></br>
        <h7 style={{textTransform:"uppercase"}} className="text2"><strong>Package : {Package}</strong></h7>
        <h7 style={{textTransform:"uppercase"}} className="text2"><strong>Batch : {batch}</strong></h7>
      </div>
      <div className="mt-2">
          <ProgressBar barValue={barValue} />
         
          <div className="mt-1">
            <span className="text1">
              {barValue+1} Applied <span className="text2">of 600 capacity</span>
            </span>{" "}
          </div>

          <Row style={{marginTop:"3%"}}>
            {buttonRender()}
          </Row>
        </div>
      <span className="top"  id="span"></span>
      <span className="right" id="span"></span>
      <span className="bottom" id="span"></span>
      <span className="left" id="span"></span>
    </div>
  );
};

export default CompanyCard;
