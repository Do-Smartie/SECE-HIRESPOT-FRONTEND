import React, { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getCounts } from "../services/getRequset";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { isAdmin } from "../services/Auth";

const Dashboard = () => {
  const navigate = useNavigate();
  var [count, setCount] = useState({
    placedCount: "",
    studentCount: "",
    facultyCount: "",
    piplinedCompaniesCount: "",
    completedCompaniesCount: "",
  });

  useEffect(() => {
    getCounts()
      .then((res) => {
        console.log(res.data);
        if (res.data.Success) {
          setCount({
            placedCount: res.data.Placed_Count,
            studentCount: res.data.Student_Count,
            facultyCount: res.data.Faculty_User,
            piplinedCompaniesCount: res.data.PiplinedCompanies_Count,
            completedCompaniesCount: res.data.CompletedCompanies_Count,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Window.alert(err.response.data.Message);
        // navigate('/404pageNotFound');
      })
      .finally(() => {
        console.log("process Over");
      });
  }, []);

  return (
    <>
      <MainNavbar />
      <Container style={{ marginTop: "4%" }}>
        <Row >
          {isAdmin() ? (
            <Col xs={8} md={3}>
              <div
                className="dashboardCard bg-c-green order-card"
                onClick={() => navigate("/addPlacedStudents")}
              >
                <div className="card-block">
                  <h6 className="m-b-20">ADD PLACED STUDENTS</h6>
                  <h2 className="text-right">
                    <i className="fa fa-cart-plus f-left"></i>
                    <span>{count.placedCount}</span>
                  </h2>
                </div>
              </div>
            </Col>
          ) : null}
          <Col xs={8} md={3}>
            <div
              className="dashboardCard bg-c-yellow order-card"
              onClick={() => navigate("/showStudents")}
            >
              <div className="card-block">
                <h6 className="m-b-20">STUDENTS</h6>
                <h2 className="text-right">
                  <i className="fa fa-cart-plus f-left"></i>
                  <span>{count.studentCount}</span>
                </h2>
              </div>
            </div>
          </Col>
          {isAdmin() && (
            <Col xs={8} md={3}>
              <div
                className="dashboardCard bg-c-green order-card"
                onClick={() => navigate("/showFaculties")}
              >
                <div className="card-block">
                  <h6 className="m-b-20">FACULTY</h6>
                  <h2 className="text-right">
                    <i className="fa fa-cart-plus f-left"></i>
                    <span>{count.facultyCount}</span>
                  </h2>
                </div>
              </div>
            </Col>
          )}

          <Col xs={8} md={3}>
            <div
              className="dashboardCard bg-c-pink order-card"
              onClick={() => navigate("/showPipelinedCompanies")}
            >
              <div className="card-block">
                <h6 className="m-b-20">PIPELINED COMPANIES</h6>
                <h2 className="text-right">
                  <i className="fa fa-cart-plus f-left"></i>
                  <span>{count.piplinedCompaniesCount}</span>
                </h2>
              </div>
            </div>
          </Col>
          <Col xs={8} md={3}>
            <div
              className="dashboardCard bg-c-yellow order-card"
              onClick={() => navigate("/showCompletedCompanies")}
            >
              <div className="card-block">
                <h6 className="m-b-20">COMPLETED COMPANIES</h6>
                <h2 className="text-right">
                  <i className="fa fa-cart-plus f-left"></i>
                  <span>{count.completedCompaniesCount}</span>
                </h2>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
