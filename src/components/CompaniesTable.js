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

const CompaniesTable = (props) => {
  const [schema, setSchema] = useState({
    companyName: "",
    dateOfDrive: "",
    batch: "",
    role: "",
    Package: "",
    category :""
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
      row.dateOfDrive.toLowerCase().indexOf(schema.dateOfDrive) === 0 &&
      row.Package.toLowerCase().indexOf(schema.Package) === 0 &&
      row.role.toLowerCase().indexOf(schema.role) === 0 &&
      row.companyName.toLowerCase().indexOf(schema.companyName) === 0 &&
      row.batch.toLowerCase().indexOf(schema.batch) === 0 &&
      row.category.toLowerCase().indexOf(schema.category) === 0
    );
  })

  

  const navigate = useNavigate();
  const gotoCompany = (company) => {
    navigate("/registeredStudents", { state: { company: company } });
  };

  //logic for downloading detail as excel file

  const downlaodXLSX = () => {
   
    exportAsXLSX(table, table[0].batch);
  };
 
  return (
    <Container>
      <Row style={{marginTop:'3%'}}>
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
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Company Name</strong></TableCell>
              <TableCell><strong>Package</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Batch</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
            </TableHead>
            <TableBody>
              {boolFilter && (
                <TableRow>
                  <TableCell>
                    <input
                      placeholder="Date"
                      onChange={(event) => {
                        filter("dateOfDrive", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Comapany Name"
                      onChange={(event) => {
                        filter("companyName", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Package"
                      onChange={(event) => {
                        filter("Package", event.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      placeholder="Role"
                      onChange={(event) => {
                        filter("role", event.target.value);
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
                      placeholder="Category"
                      onChange={(event) => {
                        filter("category", event.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
              )}
              {table.map((row) => {
                return (
                  <TableRow className="tableRow" onClick={() => gotoCompany(row)}>
                    <TableCell>{row.dateOfDrive}</TableCell>
                    <TableCell>{row.companyName}</TableCell>
                    <TableCell>{row.Package}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.batch}</TableCell>
                    <TableCell>{row.category}</TableCell>
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

export default CompaniesTable;
