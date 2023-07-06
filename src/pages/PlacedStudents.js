import React, { useEffect, useState } from "react";
import "../App.css";
import MainNavbar from "../components/MainNavbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import { getPlacedStudents } from "../services/postRequest";
import Spinner from 'react-bootstrap/Spinner';
import PlacedStudentsTable from "../components/PlacedStudentsTable";


const dummyStudents = [
    {
        registerNumber:'722820205014',
        rollNumber:'20IT014',
        name : 'Guruprasath M',
        department : 'Information Technology',
        gender : 'Male',
        dob : '12/03/2003',
        tenthPercent : '81%',
        twelthPercent : '68%',
        diplomaPercent:'',
        cgpa : '8.97',
        noOfArrears : '0',
        historyOfArrears : '0',
        mobileNumber  : '8056993814',
        mailID : 'guruprasath.m2020it2sece.ac.in',
        address : '1/58 mahalaximi nagar samathur',
        onePageResume : 'https://///.........logo',
        threePageResume : 'https://:sdfgertyui'
      },
      {
        registerNumber:'722820205014',
        rollNumber:'20IT014',
        name : 'Sanjai Ragul M',
        department : 'Information Technology',
        gender : 'Male',
        dob : '25/12/2002',
        tenthPercent : '81%',
        twelthPercent : '78%',
        diplomaPercent:'',
        cgpa : '8.97',
        noOfArrears : '0',
        historyOfArrears : '0',
        mobileNumber  : '8056993814',
        mailID : 'sanjairagul.m2020it2sece.ac.in',
        address : '1/58 mahalaximi nagar vallakundapuram',
        onePageResume : 'https://///.........logo',
        threePageResume : 'https://:sdfgertyui'
      },
      {
        registerNumber:'722820205014',
        rollNumber:'20IT014',
        name : 'Sanjai Ragul M',
        department : 'Information Technology',
        gender : 'Male',
        dob : '25/12/2002',
        tenthPercent : '81%',
        twelthPercent : '78%',
        diplomaPercent:'',
        cgpa : '8.97',
        noOfArrears : '0',
        historyOfArrears : '0',
        mobileNumber  : '8056993814',
        mailID : 'sanjairagul.m2020it2sece.ac.in',
        address : '1/58 mahalaximi nagar vallakundapuram',
        onePageResume : 'https://///.........logo',
        threePageResume : 'https://:sdfgertyui'
      }
]

const PlacedStudents = () => {


   const location = useLocation();
   
   const{company} = location.state;
   console.log(company.companyName);

   //state for students
   const[placedStudents,setPlacedStudents] = useState([]);

   //boolstate for spinner

   const[spinner,setSpinner ] = useState(false);


   //logic for getting registered students

   useEffect(()=>{
        
       const data = {
        companyName : company.companyName,
        role : company.role,
        batch : company.batch
       }
       setSpinner(true);
       getPlacedStudents(data).then((res)=>{
           if(res.data.Success){
            setPlacedStudents(res.data.StudentDetails);  
             setSpinner(false);
           }
       }).catch((err)=>{
        console.log(err);
        window.alert(err.response.data.Message);
       }).finally(()=>{
        console.log("process Over");
        setSpinner(false);
       })
        
   },[])
   

  return (
    <>
      <MainNavbar />
      <Container style={{marginTop:"4%"}}>
        <Row>
            <Col md={{ span: 5, offset: 3 }}>
            <div className="comCard p-3 mb-2">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <div className="icon">
                  {" "}
                  <img
                    src="/loginLogo.jpg"
                    alt="logo"
                    className="iconimg"
                  ></img>{" "}
                </div>
                <div className="ms-2 c-details">
                  <h4
                    className="mb-0"
                    style={{
                      textTransform: "uppercase",
                      fontFamily: "fantasy",
                    }}
                  >
                    {company.companyName}
                  </h4>{" "}
                  <span>{dayjs(company.dateOfDrive).format("DD/MM/YYYY")}</span>
                </div>
              </div>
              <div className="badge">
                {" "}
                <span>{company.category}</span>{" "}
              </div>
            </div>
            <div className="mt-3">
              <h7 style={{ textTransform: "uppercase" }} className="text2">
                <strong>Role : {company.role}</strong>
              </h7>
              <br></br>
              <h7 style={{ textTransform: "uppercase" }} className="text2">
                <strong>Package : {company.Package}</strong>
              </h7>
              <br></br>
              <h7 style={{ textTransform: "uppercase" }} className="text2">
                <strong>Placed count : {placedStudents.length}</strong>
              </h7>
              <br></br>
            </div>
            <span id="span"></span>
            <span id="span"></span>
            <span id="span"></span>
            <span id="span"></span>
          </div>
            </Col>
          
        </Row>
        <Row style={{marginTop:"4%"}}>
            <Card>
            <h5 style={{marginLeft:"3%"}}>Placed Students</h5>
            <hr style={{ border: "3px solid #004E9B", borderRadius: "5px" }}></hr>
            {spinner ? (
                <Spinner animation="border" role="status" style={{marginLeft:"50%"}}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ):(
               <PlacedStudentsTable TableData={placedStudents} comapnyName = {company.comapnyName}/>
            )}
            </Card> 
        </Row>
      </Container>
    </>
  );
};

export default PlacedStudents;
