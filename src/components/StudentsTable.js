import React, { useState} from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
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

const StudentsTable = (props) => {
  const [schema, setSchema] = useState({
    email: "",
    regNo: "",
    batch: "",
    rollNo: "",
    department: "",
    username: "",
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
      row.username.toLowerCase().indexOf(schema.username) == 0 &&
      row.email.toLowerCase().indexOf(schema.email) == 0 &&
      row.regNo.toLowerCase().indexOf(schema.regNo) == 0 &&
      row.rollNo.toLowerCase().indexOf(schema.rollNo) == 0 &&
      row.batch.toLowerCase().indexOf(schema.batch) == 0 &&
      row.department.toLowerCase().indexOf(schema.department) == 0
    );
  })

  

  const navigate = useNavigate();
  const gotoUser = (user) => {
    navigate("/userAttendedCompanies", { state: { user: user } });
  };

  //logic for downloading detail as excel file

  const downlaodXLSX = () => {
   
    exportAsXLSX(table, table[0].batch);
  };
 
  return (
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
              <TableCell><strong>User Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Register No</strong></TableCell>
              <TableCell><strong>Roll No</strong></TableCell>
              <TableCell><strong>Batch</strong></TableCell>
              <TableCell><strong>Deparment</strong></TableCell>
            </TableHead>
            <TableBody>
              {boolFilter && (
                <TableRow>
                  <TableCell>
                    <input
                      placeholder="User Name"
                      onChange={(event) => {
                        filter("username", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Email"
                      onChange={(event) => {
                        filter("email", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Register No"
                      onChange={(event) => {
                        filter("regNo", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Roll No"
                      onChange={(event) => {
                        filter("rollNo", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Batch"
                      onChange={(event) => {
                        filter("batch", event.target.value);
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
                </TableRow>
              )}
              {table.map((row) => {
                return (
                  <TableRow className="tableRow" onClick={() => gotoUser(row)}>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.regNo}</TableCell>
                    <TableCell>{row.rollNo}</TableCell>
                    <TableCell>{row.batch}</TableCell>
                    <TableCell>{row.department}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Row>
    </Container>
  );
};

export default StudentsTable;
