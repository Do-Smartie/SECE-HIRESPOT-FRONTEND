import React, { useState } from "react";
import MainNavbar from "../components/MainNavbar";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import { getComapnyNamesFeedBack, getComapnyNamesForAddPlacedStudentsPage, getCompanyDetailsFeedBack, getCompanydetailsForAddplacedStudentspage, getStudentDetailsForAddPlacedStudentPage } from "../services/postRequest";
import AptitudeReviewForm from "../components/AptitudeReviewForm";
import CodingRoundReviewForm from "../components/CodingRoundReviewForm";
import TechHrReviewForm from "../components/TechHrReviewForm";
import GDRoundReviewForm from "../components/GDRoundReviewForm";
import HackathonReview from "../components/HackathonReview";
import PersonalHrReviewForm from "../components/PersonalHRReviewForm";

const AddReviews = () => {

const[companyNames,setCompanyNames] = useState([]);
const[roles,setRoles] = useState([]);
const[packages,setPackages] = useState([]);

const[previewData,setPreviewData] = useState({

    roundNo:'',
    batch:'',
    companyName:'',
    role:'',
    nameOfTheRound:'',
    Package:''
})

  const OnHandleChange = (event) => {

    const{name,value} = event.target;
     setPreviewData({...previewData,[name]:value});
  };

  //for getting companyName
  
  const getComapanyNames = (event)=>{
      
    const batch = event.target.value;
    if(batch===""){
        window.alert("Please fill Your Batch Field.");
        return;
    }
    sessionStorage.setItem('batch',batch);
    console.log("inside getComapnynames",batch);
    const data = {
      batch:batch
    }
    getComapnyNamesFeedBack(data).then((res)=>{
       
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

    if(company===""){
        window.alert("Please fill the Company Names Field.");
        return;
    }
    sessionStorage.setItem('company',company);
    const data = {
      companyName:company,
      batch:previewData.batch
    }
    console.log("inside getCompanyDetails",company,previewData.batch);
    getCompanyDetailsFeedBack(data).then((res)=>{
       
        if(res.data.Success){
           setRoles(res.data.roles);
           setPackages(res.data.packages);
        }
    })
}

const setAllInitialState = ()=>{
     setPreviewData({
        roundNo:'',
        batch:'',
        companyName:'',
        role:'',
        nameOfTheRound:'',
        Package:''
    })
}

  return (
    <>
      <MainNavbar />
      <Container style={{ marginTop: "4%" }}>
        <h3 style={{textAlign:"center"}}>Add Review</h3>
        <Row>
          <Col>
            <Card bg="light">
              <Form style={{ marginTop: "3%" }}>
              <h5>To fill below details</h5>
                <Form.Group as={Row} className="mb-3">
                  <Col sm={2}>
                    <Form.Control as="input" type="number" min={1}  onChange={OnHandleChange}  style={{marginTop:"3%"}} name="roundNo" value={previewData.roundNo}  placeholder="Round Nubmer" required>
                    </Form.Control>
                  </Col>
                  <Col sm={3}>
                    <Form.Control
                      as="select"
                      aria-label="Default select example"
                      name="batch"
                      onChange={(e)=>{
                        OnHandleChange(e);
                        getComapanyNames(e);
                      }}
                      style={{marginTop:"3%"}}
                      value={previewData.batch}
                      required
                    >
                      <option value="">Batch of the students</option>
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
                  <Col sm={3}>
                <Form.Control
                  as='select'
                  value={previewData.companyName}
                  name="companyName"
                  onChange={(e)=>{
                    OnHandleChange(e);
                    getCompanydetails(e);
                  }}
                  style={{marginTop:"3%"}}
                  placeholder
                  required
                >
                  <option value="">Select Company Name</option>
                  {companyNames.map((val)=>{
                      return <option value={val}>{val}</option>
                  })}
                </Form.Control>
              </Col>
              <Col sm={2}>
              <Form.Control
                  as='select'
                  value={previewData.role}
                  name="role"
                  onChange={(e)=>{
                    OnHandleChange(e);
                  }}
                  style={{marginTop:"3%"}}
                  placeholder
                  required
                >
                  <option value="">Select a Role</option>
                  {roles.map((val)=>{
                      return <option value={val}>{val}</option>
                  })}
                </Form.Control>
              </Col>
              <Col sm={3}>
              <Form.Control
                  as='select'
                  value={previewData.Package}
                  name="Package"
                  onChange={(e)=>{
                    OnHandleChange(e);
                  }}
                  style={{marginTop:"3%"}}
                  placeholder
                  required
                >
                  <option value="">Select a Package</option>
                  {packages.map((val)=>{
                      return <option value={val}>{val}</option>
                  })}
                </Form.Control>
                </Col>
                <Col sm={3}>
                    <Form.Control
                      as="select"
                      aria-label="Default select example"
                      name="nameOfTheRound"
                      onChange={OnHandleChange}
                      style={{marginTop:"3%"}}
                      value={previewData.nameOfTheRound}
                      required
                    >
                      <option value="">Type Of Round</option>
                      <option value="MCQ">MCQ</option>
                      <option value="Coding Round">Coding Round</option>
                      <option value="Group Discussion">Group Discussion</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Technical HR">Technical HR</option>
                      <option value="Personal HR">Personal HR</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>

        {previewData.nameOfTheRound === "MCQ" && (
            <>
            <h5 style={{marginTop:"4%"}}>Continue You Review for {previewData.nameOfTheRound} for {previewData.companyName}:</h5>
            <AptitudeReviewForm previewData={previewData} setAllInitialState={setAllInitialState} />
            </>
        )}
         {previewData.nameOfTheRound === "Coding Round" && (
            <>
            <h5 style={{marginTop:"4%"}}>Continue You Review for {previewData.nameOfTheRound} for {previewData.companyName}:</h5>
            <CodingRoundReviewForm previewData={previewData}  setAllInitialState={setAllInitialState} />
            </>
        )}
         {previewData.nameOfTheRound === "Technical HR" && (
            <>
            <h5 style={{marginTop:"4%"}}>Continue You Review for {previewData.nameOfTheRound} for {previewData.companyName}:</h5>
            <TechHrReviewForm previewData={previewData}  setAllInitialState={setAllInitialState} />
            </>
        )}
        {previewData.nameOfTheRound === "Group Discussion" && (
            <>
            <h5 style={{marginTop:"4%"}}>Continue You Review for {previewData.nameOfTheRound} for {previewData.companyName}:</h5>
            <GDRoundReviewForm previewData={previewData}  setAllInitialState={setAllInitialState} />
            </>
        )}
        {previewData.nameOfTheRound === "Hackathon" && (
            <>
            <h5 style={{marginTop:"4%"}}>Continue You Review for {previewData.nameOfTheRound} for {previewData.companyName}:</h5>
            <HackathonReview previewData={previewData}  setAllInitialState={setAllInitialState} />
            </>
        )}
        {previewData.nameOfTheRound === "Personal HR" && (
            <>
            <h5 style={{marginTop:"4%"}}>Continue You Review for {previewData.nameOfTheRound} for {previewData.companyName}:</h5>
            <PersonalHrReviewForm previewData={previewData}  setAllInitialState={setAllInitialState} />
            </>
        )}
      </Container>
    </>
  );
};

export default AddReviews;
