import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import MainNavbar from "../components/MainNavbar";
import { getFaculties } from "../services/getRequset";
import Spinner from "react-bootstrap/Spinner";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableContainer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Funnel, FunnelFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";

const dummyFaculties = [
  {
    username: "Mr.Jhon Augustine",
    rollNo: "9988776655450",
    department: "Information Technology",
    email: "jhonaugustine@sece.ac.in",
  },
  {
    username: "Mr.Prakash",
    rollNo: "9988776655443",
    department: "Information Technology",
    email: "prakash@sece.ac.in",
  },
  {
    username: "Mrs.Jayapratha",
    rollNo: "99887766554454",
    department: "Information Technology",
    email: "jayapratha@sece.ac.in",
  },
  {
    username: "Mr.Vasanth",
    rollNo: "9988776655444",
    department: "Information Technology",
    email: "vasanth@sece.ac.in",
  },
];

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);

  const [spinner, setSpinner] = useState(true);
  const navigate = useNavigate();

  //boolstate for filter
  const [boolFilter, setBoolFilter] = useState(false);

  useEffect(() => {
    setSpinner(true);
    getFaculties()
      .then((res) => {
        if (res.Success) {
          setFaculty(res.data);
          setSpinner(false);
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("Error Ocuurred in Loading , Reload Again");
      })
      .finally(() => {
        console.log("process over");
        setSpinner(false);
      });
  }, []);

  //shema for filter
  const [schema, setSchema] = useState({
    email: "",
    rollNo: "",
    department: "",
    username: "",
  });
  //logic for filter
  function filter(attr, value) {
    schema[attr] = value.toLowerCase();
    setSchema({ ...schema });
  }
  let table;

  if(!boolFilter)
  table=dummyFaculties;

  else
  table = dummyFaculties.filter((row) => {
    return (
      row.username.toLowerCase().indexOf(schema.username) == 0 &&
      row.email.toLowerCase().indexOf(schema.email) == 0 &&
      row.rollNo.toLowerCase().indexOf(schema.rollNo) == 0 &&
      row.department.toLowerCase().indexOf(schema.department) == 0
    );
  })

  //navigate to profile with state
  const gotoFaculty = (user) => {
    navigate("/showFaultiesProfiles", { state: { user: user } });
  };

  return (
    <>
      <MainNavbar />
      <Container style={{ marginTop: "4%" }}>
        <h3>Faculties</h3>
        <Card>
            <Row>
            <Col style={{marginTop:'2%',marginLeft:'3%'}}>
            {boolFilter ? (
              <Button
                onClick={() => setBoolFilter(false)}
                variant="outline-primary"
              >
                <strong>
                  <FunnelFill />
                  <span> Filter</span>
                </strong>
              </Button>
            ) : (
              <Button
                onClick={() => setBoolFilter(true)}
                variant="outline-primary"
              >
                <strong>
                  <Funnel />
                  <span> Filter</span>
                </strong>
              </Button>
            )}
          </Col>
            </Row>
            <hr style={{ border: "3px solid #004E9B", borderRadius: "5px" }}></hr>
          
          {spinner ? (
            <Spinner
              animation="border"
              role="status"
              style={{ marginLeft: "50%" }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>
                    <strong>User Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Roll No</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Department</strong>
                  </TableCell>
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
                      <TableRow
                        className="tableRow"
                        onClick={() => gotoFaculty(row)}
                      >
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.rollNo}</TableCell>
                        <TableCell>{row.department}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Faculty;
