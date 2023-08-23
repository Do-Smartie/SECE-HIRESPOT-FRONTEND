import React, { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteUser, getUserCompanyDetails } from "../services/postRequest";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import UserAttendedCompanyTables from "../components/UserAttendedCompanyTables";
import Spinner from "react-bootstrap/Spinner";
import "../App.css";

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
];

const UserAttendedCompanies = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [attendedCompanies, setAttendedCompanies] = useState([]);
  const [boolConfirm, setBoolConfirm] = useState(false);
  const [boolRemoveButton, setBoolRemoveButton] = useState(false);
  const { user } = location.state;
  // console.log(user);
  const userData = {
    rollNo: user.rollNo,
    batch: user.batch,
  };

  useEffect(() => {
    const studentData = {
      rollNo: user.rollNo,
      batch: user.batch,
    };
    setBoolConfirm(true);
    getUserCompanyDetails(studentData)
      .then((res) => {
        console.log(res);
        if (res.data.Success) {
          setAttendedCompanies(res.data.CompanyData);
          setBoolConfirm(false);
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("Error Occurred in Loading - Reload Again");
      })
      .finally(() => {
        setBoolConfirm(false);
      });
  }, []);

  console.log("inside userCompamies", userData);

  const DeleteUser = () => {
    setBoolRemoveButton(true);
    const data = {
      _id: user._id,
    };
    let text = "Are you sure You want to delete this account ?";
    if (window.confirm(text) == true) {
      deleteUser(data)
        .then((res) => {
          if (res.data.Success) {
            window.alert(res.data.Message);
            navigate("/showStudents");
            setBoolRemoveButton(false);
          }
        })
        .catch((err) => {
          window.alert(
            "Error occurred in Account deletion ,Please try again later"
          );
        })
        .finally(() => {
          console.log("process completed");
          setBoolRemoveButton(false);
        });
    }
  };
  return (
    <>
      <MainNavbar />
      <Container style={{ marginTop: "4%" }}>
        <Row>
          <Col xs={7} md={8}>
            <Card bg="light" className="profileCardMob">
              <Row className="justify-content-md-center">
                <Col xs={2} md={2}>
                  <img
                    src="user.png"
                    alt="profile"
                    style={{
                      height: "75px",
                      width: "75px",
                      marginLeft: "4%",
                      marginTop: "6%",
                    }}
                  ></img>
                </Col>
                <Col md="auto">
                  <h6>User Name : {user.username}</h6>
                  <h6>Roll No : {user.rollNo}</h6>
                  <h6>Department : {user.department}</h6>
                  <h6>Batch : {user.batch}</h6>
                </Col>
                <Col xs lg="2">
                  {boolRemoveButton ? (
                    <Spinner
                      animation="border"
                      role="status"
                      className='profileRemoveButton'
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={DeleteUser}
                      className='profileRemoveButton'
                    >
                      Remove Account
                    </Button>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "4%" }}>
          <Card bg="light">
            <h5 style={{ marginLeft: "3%" }}>Attended Companies</h5>
            {boolConfirm ? (
              <Spinner
                animation="border"
                role="status"
                style={{ marginLeft: "50%" }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <UserAttendedCompanyTables TableData={attendedCompanies} />
            )}
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default UserAttendedCompanies;
