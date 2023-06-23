import React, { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getCounts } from "../services/getRequset";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Plot from "react-plotly.js";

const Dashboard = () => {
  const navigate = useNavigate();
  var [count, setCount] = useState({
    studentCount: 400,
    facultyCount: 200,
    companiesCount: 250,
  });

  useEffect(() => {
    getCounts()
      .then((res) => {
        console.log(res.data);
        var data = res.data.count;
        if (res.Success && res.data.count != null) {
          count = data;
          setCount(count);
        }
      })
      .catch((err) => {
        console.log(err);
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
        <Row>
          <Col>
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
          <Col>
            <div className="dashboardCard bg-c-green order-card" onClick={()=>navigate('/showFaculties')}>
              <div className="card-block">
                <h6 className="m-b-20">FACULTY</h6>
                <h2 className="text-right">
                  <i className="fa fa-cart-plus f-left"></i>
                  <span>{count.facultyCount}</span>
                </h2>
              </div>
            </div>
          </Col>
          <Col>
            <div className="dashboardCard bg-c-pink order-card" onClick={()=>navigate('/showCompanies')}>
              <div className="card-block">
                <h6 className="m-b-20">COMPANIES</h6>
                <h2 className="text-right">
                  <i className="fa fa-cart-plus f-left"></i>
                  <span>{count.companiesCount}</span>
                </h2>
              </div>
            </div>
          </Col>
        </Row>
        {/* <Row>
            <Col>
            
            <Plot
            data={[
              {
                x: ["Students", "Faculty", "Admin"],
                y: [900, 300, 1],
                type: "bar",
                marker: { color: "lightblue" },
                width : 0.4
              },
            ]}
            layout={{ width: '100%', height: 400, title: "USER'S",displayLogo : false , showLegend : false}}
           
          />
            </Col>
          
        </Row> */}
      </Container>
    </>
  );
};

export default Dashboard;
