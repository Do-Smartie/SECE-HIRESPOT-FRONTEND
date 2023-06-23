import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import ComapanyLogo from "../components/CompanyLogo";
import { Link, useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import { isAuthenticated } from "../services/Auth";
import ChartsGraph from "../components/ChartsGraph";

const MainHome = () => {
  const [buttonclr, setButtonclr] = useState("#FFE600");
  const [clr, setClr] = useState("navy");

  const navigate = useNavigate();

  const btnStyle = {
    backgroundColor: `${buttonclr}`,
    color: `${clr}`,
  };
  return (
    <>

      <MainNavbar />

     <Container>
      {/* Columns are always 50% wide, on mobile and desktop */}
      <Row style={{ marginTop: "5%" }}>
        <Col sm={6}>
          <div>
            <h4 style={{ color: "#004E9B" }}>
              {!isAuthenticated() ? (
                <strong>World Class Education</strong>
              ):(
                <strong>Sri Eshwar's</strong>
              )}
              
            </h4>
          </div>
          <div style={{ marginTop: "6%" }}>
            <h1
              style={{
                color: "#004E9B",
                fontSize: "63px",
                fontFamily: "inherit",
                fontWeight: "800",
                textShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              {!isAuthenticated() ? (
                 <strong>
                 World’s Top Corporate Monsters on<br></br> Sri Eshwar{" "}
               </strong>
              ):(
                <strong>HiringSpot Welcomes You to Get <span style={{color:"red"}}>Hired!</span></strong>
              )}
             
            </h1>
          </div>
          <div style={{ marginTop: "4%" }}>
            <p
              style={{
                color: "#004E9B",
                fontFamily: "Inter",
                fontWeight: "800",
                fontSize: "18px",
              }}
            >
              Sri Eshwar helps to gain skills for jobs relevant to the market
              Over 100+ companies for both teams and individuals
            </p>
          </div>
          <div style={{ marginTop: "8%" }}>
            <img src="/Box.png" alt="BoxImg" className="mobImage"></img>
          </div>
        </Col>
        <Col className="justify-content-end">
          <img src="/Line3.jpg" alt="line" className="image"></img>
        </Col>
        { !isAuthenticated() ? (
             <Col>
             <div className="parent">
               <Button
                 className="bottom-left"
                 style={btnStyle}
                 onMouseEnter={() => {
                   setButtonclr("yellow");
                   setClr("white");
                 }}
                 onMouseLeave={() => {
                   setButtonclr("#FFE600");
                   setClr("navy");
                 }}
   
                 onClick={()=>navigate("/login")}
               >
                 <strong>STUDENT LOGIN</strong>
               </Button>
               <Button className="bottom-right" variant="outline-primary" onClick={()=>navigate("/login")}>
                 <strong>ADMIN LOGIN</strong>
               </Button>
               <img src="/GraduateCard.jpg" alt="GraduateCard"></img>
             </div>
           </Col>
        ):(
           <Col style={{marginTop:"1%",marginLeft:'2%'}}  >
           
           {/* <img src="gotocompanies1.avif" alt="gotoCompanies1" className="floating"></img>
           <img src="gotocompanies.jpg" alt="gotoCompanies" className="floating"></img> */}
           <div>
            <h4 style={{ color: "#004E9B" }} className="mobHead">
                <strong>Awesome Placement Record</strong>
            </h4>
          </div>
          <div  style={{marginTop:"23%"}}>
            <ChartsGraph/>
          </div>
           {/* <Link to='/home'><h3  style={{paddingTop:"1px"}} className="floating">GO TO COMPANIES</h3></Link> */}
           </Col>
           
        )}
       
      </Row>
      <Row style={{ marginTop: "4%" }}>
        <Col>
          <hr style={{ border: "3px solid #004E9B", borderRadius: "5px" }}></hr>
        </Col>
      </Row>

      <Row style={{ marginTop: "6%" }}>
        <Col sm={6}>
          <div className="imageDiv">
            <img src="/PD&PO.png" alt="PD & PO" className="mobImage"></img>
          </div>
          <div style={{ marginTop: "4%" }} className="imageDiv">
            <img
              src="/group.png"
              style={{ border: "4px solid #004E9B", borderRadius: "8px" }}
              alt="groupPic"
              className="mobImage"
            ></img>
          </div>
        </Col>

        <Col>
          <img src="/Line5.jpg" alt="line" className="image" id="line5"></img>
        </Col>

        <Col>
          <div style={{ marginTop: "5%" }} >
            <img src="Cardimgtop.jpg" alt="cardImg" className="mobImage"></img>
          </div>
          <div style={{ marginTop: "15%" }} className="imageDiv">
            <Row>
              <Col xs={6}>
                <img src="/ranking.jpg" alt="RankingImg" className="mobImage-2"></img>
              </Col>
              <Col xs={6}>
                <img src="/placedCount.jpg" alt="PlacedCountImg" className="mobImage-2"></img>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "4%" }}>
        <Col>
          <hr style={{ border: "3px solid #004E9B", borderRadius: "5px" }}></hr>
        </Col>
      </Row>

      <Row style={{ marginTop: "6%" }}>
        <ComapanyLogo />
      </Row>

      <Row style={{ marginTop: "4%" }}>
        <Col>
          <hr style={{ border: "3px solid #004E9B", borderRadius: "5px" }}></hr>
        </Col>
      </Row>
     
    </Container>
    </>
    
  );
};

export default MainHome;
