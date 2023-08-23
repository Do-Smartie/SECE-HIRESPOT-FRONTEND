import React from "react";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { exportAsXLSX } from "../services/ExcelFileDownload";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableContainer,
} from "@mui/material";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Funnel, FunnelFill } from "react-bootstrap-icons";
import { useState } from "react";


const RegisteredStudentsTable = (props)=>{

    const [schema, setSchema] = useState({
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
        placed :'',
        onePageResume : '',
        threePageResume : ''
      });
    
      //boolstate for filter
  const [boolFilter, setBoolFilter] = useState(false);

  function filter(attr, value) {
    schema[attr] = value.toLowerCase();
    setSchema({ ...schema });
  }

  let table;

  if(!boolFilter)
  table=props.TableData;

  else
  table = props.TableData.filter((row) => {
    return (
      row.name.toLowerCase().indexOf(schema.name) === 0 &&
      row.registerNumber.toLowerCase().indexOf(schema.registerNumber) === 0 &&
      row.rollNumber.toLowerCase().indexOf(schema.rollNumber) === 0 &&
      row.gender.toLowerCase().indexOf(schema.gender) === 0 &&
      row.department.toLowerCase().indexOf(schema.department) === 0 &&
      row.dob.toLowerCase().indexOf(schema.dob) === 0 &&
      row.tenthPercent.toLowerCase().indexOf(schema.tenthPercent) === 0 &&
      row.twelthPercent.toLowerCase().indexOf(schema.twelthPercent) === 0 &&
      row.diplomaPercent.toLowerCase().indexOf(schema.diplomaPercent) === 0 &&
      row.cgpa.toLowerCase().indexOf(schema.cgpa) === 0 &&
      row.noOfArrears.toLowerCase().indexOf(schema.noOfArrears) === 0 &&
      row.historyOfArrears.toLowerCase().indexOf(schema.historyOfArrears) === 0 &&
      row.mobileNumber.toLowerCase().indexOf(schema.mobileNumber) === 0 &&
      row.mailID.toLowerCase().indexOf(schema.mailID) === 0 &&
      row.address.toLowerCase().indexOf(schema.address) === 0 &&
      row.onePageResume.toLowerCase().indexOf(schema.onePageResume) === 0 &&
      row.threePageResume.toLowerCase().indexOf(schema.threePageResume) === 0 &&
      row.placed.toLowerCase().indexOf(schema.placed)===0
    );
  })

  //logic for downloading detail as excel file

  const downlaodXLSX = () => {
   
    exportAsXLSX(table, props.companyName);
  };

    return(
        <Container>
      <Row>
        <Col>{boolFilter ? <Button onClick={()=>setBoolFilter(false)} variant="outline-primary"><strong><FunnelFill  /><span>  Filter</span></strong></Button>  : <Button onClick={()=>setBoolFilter(true)} variant="outline-primary"><strong><Funnel /><span>   Filter</span></strong></Button> }</Col>
        <Col style={{ textAlign: "right" }}>
          <Button
            variant="success"
            style={{ backgroundColor: "lightgreen" }}
            onClick={downlaodXLSX}
          >
            EXPORT AS XLSX
          </Button>
        </Col>
      </Row>
      <Row>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Register No</strong></TableCell>
              <TableCell><strong>Roll No</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Gender</strong></TableCell>
              <TableCell><strong>Deparment</strong></TableCell>
              <TableCell><strong>Placed</strong></TableCell>
              <TableCell><strong>DOB</strong></TableCell>
              <TableCell><strong>10TH %</strong></TableCell>
              <TableCell><strong>12TH %</strong></TableCell>
              <TableCell><strong>Diploma %</strong></TableCell>
              <TableCell><strong>CGPA</strong></TableCell>
              <TableCell><strong>No Of Arrears</strong></TableCell>
              <TableCell><strong>History Of Arrears</strong></TableCell>
              <TableCell><strong>Mobile No</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>One Page Resume</strong></TableCell>
              <TableCell><strong>Two Page Resume</strong></TableCell>
            </TableHead>
            <TableBody>
              {boolFilter && (
                <TableRow>
                  <TableCell>
                    <input
                      placeholder="Name"
                      onChange={(event) => {
                        filter("name", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Register No"
                      onChange={(event) => {
                        filter("registerNumber", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Roll No"
                      onChange={(event) => {
                        filter("rollNumber", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Email"
                      onChange={(event) => {
                        filter("mailID", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Gender"
                      onChange={(event) => {
                        filter("gender", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Department"
                      onChange={(event) => {
                        filter("department", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="NotPlaced or Company name"
                      onChange={(event) => {
                        filter("placed", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="DOB"
                      onChange={(event) => {
                        filter("dob", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="10TH %"
                      onChange={(event) => {
                        filter("tenthPercent", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="12TH %"
                      onChange={(event) => {
                        filter("twelthPercent", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Diploma"
                      onChange={(event) => {
                        filter("diplomaPercent", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="CGPA"
                      onChange={(event) => {
                        filter("cgpa", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="No Of Arrears"
                      onChange={(event) => {
                        filter("noOfArrears", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="History of Arrears"
                      onChange={(event) => {
                        filter("historyOfArrears", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Mobile Number"
                      onChange={(event) => {
                        filter("mobileNumber", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Address"
                      onChange={(event) => {
                        filter("address", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="One Page Resume"
                      onChange={(event) => {
                        filter("onePageResume", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Three Page Resume"
                      onChange={(event) => {
                        filter("threePageResume", event.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
              )}
              {table.map((row) => {
                return (
                  <TableRow className="tableRow" >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.registerNumber}</TableCell>
                    <TableCell>{row.rollNumber}</TableCell>
                    <TableCell>{row.mailID}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.dob}</TableCell>
                    <TableCell>{row.tenthPercent}</TableCell>
                    <TableCell>{row.twelthPercent}</TableCell>
                    <TableCell>{row.diplomaPercent}</TableCell>
                    <TableCell>{row.cgpa}</TableCell>
                    <TableCell>{row.noOfArrears}</TableCell>
                    <TableCell>{row.historyOfArrears}</TableCell>
                    <TableCell>{row.mobileNumber}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.onePageResume}</TableCell>
                    <TableCell>{row.threePageResume}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Row>
    </Container>
    );
}

export default RegisteredStudentsTable;