import React from "react";
import MainNavbar from "../components/MainNavbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { getBatchwiseCompanies } from "../services/postRequest";
import CompaniesTable from "../components/CompaniesTable";
import Spinner from 'react-bootstrap/Spinner';

const DummyCompanies = [
  {
    id: 17,
    category: "software",
    companyName: "Saptanglabs",
    dateOfDrive: "2023-06-10",
    lastDateOfReg: "2023-06-07",
    Package: "10 LPA",
    role: "Fullstack",
    batch: "2020-2024",
  },
  {
    id: 6,
    category: "software",
    companyName: "gusa",
    dateOfDrive: "2023-06-10",
    lastDateOfReg: "2023-06-07",
    Package: "10 LPA",
    role: "Fullstack",
    batch: "2020-2024",
  },
  {
    id: 7,
    category: "software",
    companyName: "gusa",
    dateOfDrive: "2023-06-10",
    lastDateOfReg: "2023-06-07",
    Package: "10 LPA",
    role: "Fullstack",
    batch: "2020-2024",
  },
  {
    id: 12,
    category: "software",
    companyName: "gusa",
    dateOfDrive: "2023-06-10",
    lastDateOfReg: "2023-06-07",
    Package: "10 LPA",
    role: "Fullstack",
    batch: "2020-2024",
  },
  {
    id: 14,
    category: "software",
    companyName: "gusa",
    dateOfDrive: "2023-06-10",
    lastDateOfReg: "2023-06-07",
    Package: "10 LPA",
    role: "Fullstack",
    batch: "2020-2024",
  },
  {
    id: 15,
    category: "software",
    companyName: "gusa",
    dateOfDrive: "2023-06-10",
    lastDateOfReg: "2023-06-07",
    Package: "10 LPA",
    role: "Fullstack",
    batch: "2020-2024",
  },
  {
    id: 16,
    category: "software",
    companyName: "gusa",
    dateOfDrive: "2023-06-10",
    lastDateOfReg: "2023-06-07",
    Package: "10 LPA",
    role: "Fullstack",
    batch: "2020-2024",
  },
  {
    id: 3,
    category: "software",
    companyName: "gusa",
    dateOfDrive: "2023-06-10",
    lastDateOfReg: "2023-06-07",
    Package: "10 LPA",
    role: "Fullstack",
    batch: "2020-2024",
  },
];

const ShowCompanies = () => {
  //stste for companies
  const [companies, setCompanines] = useState([]);

  //state for neededBatch
  const [neededBatch, setNeededBatch] = useState({ batch: "" });

  //state for spinner
  const [spinner, setSpinner] = useState(false);
  const OnHandleChange = (event) => {
    const { name, value } = event.target;
    setNeededBatch({ ...neededBatch, [name]: value });
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();

    console.log(neededBatch);
    setSpinner(true);
    getBatchwiseCompanies(neededBatch)
      .then((res) => {
        if (res.data.Success) {
          setCompanines(res.data.Data);
          console.log(companies,res.data.Data);
          setSpinner(false);
        }
        else{
          window.alert(res.data.Message);
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("Error Occurred in getting Companies - Try Again");
      })
      .finally(() => {
        console.log("process Over");
        setSpinner(false);
      });
  };

  return (
    <>
      <MainNavbar />
      <Container style={{ marginTop: "4%" }}>
        <Row>
          <Col>
            <Card bg="light">
              <Form style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2} style={{ textAlign: "center" }}>
                    <strong>Batch</strong>
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control
                      type="text"
                      id="batch"
                      value={neededBatch.batch}
                      name="batch"
                      onChange={OnHandleChange}
                      placeholder="Filter with Batch(2020-2024)"
                      required
                    />
                  </Col>
                  <Col sm={5}>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ marginTop: "1%" }}
                    >
                      Get Companies
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "3%" }}>
          <Card>
            <h5 style={{marginLeft:"3%"}}>Companies</h5>
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
              <CompaniesTable TableData={companies} />
            )}
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default ShowCompanies;
