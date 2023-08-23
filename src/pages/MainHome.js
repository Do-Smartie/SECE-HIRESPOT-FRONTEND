import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import ComapanyLogo from "../components/CompanyLogo";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import { isAuthenticated } from "../services/Auth";
import {
  getCompletedCompaniesDetailsForHome,
  getCounterData,
} from "../services/getRequset";


const MainHome = () => {
  const [buttonclr, setButtonclr] = useState("#FFE600");
  const [clr, setClr] = useState("navy");

  const navigate = useNavigate();

  const btnStyle = {
    backgroundColor: `${buttonclr}`,
    color: `${clr}`,
  };

  const [counts, setCounts] = useState({
    batch: "",
    placed: 0,
    nonPlaced: 0,
    pipelinedCompanies: 0,
    completedCompanies: 0,
  });
  const [placedCount, setPlacedCount] = useState(0);
  const [nonPlacedCount, setNonPlacedCount] = useState(0);
  const [pipelinedCount, setPipelinedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const [completedCompaniesDetail, setCompletedCompaniesDetail] = useState([]);
  useEffect(() => {
    getCounterData().then((res) => {
      if (res.data.Success) {
        setCounts({
          batch: res.data.batch,
          placed: res.data.placed,
          nonPlaced: res.data.nonPlaced,
          pipelinedCompanies: res.data.pipelinedCompanies,
          completedCompanies: res.data.completedCompanies,
        });
      }
    });

    getCompletedCompaniesDetailsForHome().then((res) => {
      if (res.data.Success) {
        setCompletedCompaniesDetail(res.data.Data);
      }
    });
  }, [])

  useEffect(()=>{
  
    setTimeout(()=>{
      if(placedCount<counts.placed)
      setPlacedCount(placedCount+1)
    },1000)
  },[placedCount,counts])

  useEffect(()=>{
    setTimeout(()=>{
      if(nonPlacedCount<counts.nonPlaced)
      setNonPlacedCount(nonPlacedCount+1)
    },1000)
  },[nonPlacedCount,counts])

  useEffect(()=>{
    setTimeout(()=>{
      if(pipelinedCount<counts.pipelinedCompanies)
      setPipelinedCount(pipelinedCount+1)
    },1000)
  },[pipelinedCount,counts])

  useEffect(()=>{
    setTimeout(()=>{
      if(completedCount<counts.completedCompanies)
      setCompletedCount(completedCount+1)
    },1000)
  },[completedCount,counts])


  


  // useEffect(() => {
  //   console.log(typeof(counts.placed));
  //   let placed = setInterval(placedCounter);

  //   let i = 0;

  //   function placedCounter() {
  //     if (counts.placed > 100) {
  //       i = i + 5;
  //       setPlacedCount(i);
  //     } else {
  //       i = i + 2;
  //       setPlacedCount(i);
  //     }
  //     if (i >= counts.placed) {
  //       clearInterval(placed);
  //     }
  //   }

  //   let nonPlaced = setInterval(nonPlacedCounter);
  //   let j = 0;
  //   function nonPlacedCounter() {
  //     if (counts.nonPlaced > 100) {
  //       j = j + 5;
  //       setNonPlacedCount(j);
  //     } else {
  //       j = j + 2;
  //       setNonPlacedCount(j);
  //     }

  //     if (j >= counts.nonPlaced) {
  //       clearInterval(nonPlaced);
  //     }
  //   }

  //   let piplined = setInterval(piplinedCounter);
  //   let k = 0;
  //   function piplinedCounter() {
  //     if (counts.pipelinedCompanies > 100) {
  //       k = k + 5;
  //       setPipelinedCount(k);
  //     } else {
  //       k = k + 2;
  //       setPipelinedCount(k);
  //     }

  //     if (k >= counts.pipelinedCompanies) {
  //       clearInterval(piplined);
  //     }
  //   }

  //   let completed = setInterval(completedCounter);
  //   let l = 0;
  //   function completedCounter() {
  //     if (counts.completedCompanies > 100) {
  //       l = l + 5;
  //       setCompletedCount(l);
  //     } else {
  //       l = l + 2;
  //       setCompletedCount(l);
  //     }

  //     if (l >= counts.completedCompanies) {
  //       clearInterval(completed);
  //     }
  //   }
  // }, [placedCount,nonPlacedCount,completedCount,pipelinedCount]);
  return (
    <>
      <MainNavbar />

      <Container>
        {/* Columns are always 50% wide, on mobile and desktop */}
        <Row style={{ marginTop: "2%" }}>
          <Col sm={6}>
            <div>
              <h4 style={{ color: "#004E9B" }}>
                {!isAuthenticated() ? (
                  <strong>World Class Education</strong>
                ) : (
                  <strong>Sri Eshwar's</strong>
                )}
              </h4>
            </div>
            <div style={{ marginTop: "4%" }}>
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
                ) : (
                  <strong>
                    HiringSpot Welcomes You to Get{" "}
                    <span style={{ color: "red" }}>Hired!</span>
                  </strong>
                )}
              </h1>
            </div>
            <div style={{ marginTop: "4%" }}>
              {isAuthenticated() ? (
                <p
                  style={{
                    color: "#004E9B",
                    fontFamily: "Inter",
                    fontWeight: "800",
                    fontSize: "18px",
                  }}
                >
                  Coming Together is a Beginning, Keeping Together is Progress,
                  Working Togehter is{" "}
                  <span style={{ color: "red" }}>Success</span>
                </p>
              ) : (
                <p
                  style={{
                    color: "#004E9B",
                    fontFamily: "Inter",
                    fontWeight: "800",
                    fontSize: "18px",
                  }}
                >
                  Sri Eshwar helps to gain skills for jobs relevant to the
                  market Over 100+ companies for both teams and individuals
                </p>
              )}
            </div>
            {!isAuthenticated() && (
              <div style={{ marginTop: "8%" }}>
                <img src="/Box.png" alt="BoxImg" className="mobImage"></img>
              </div>
            )}
          </Col>
          {isAuthenticated() ? (
            <Col md="auto">
              <img
                src="/Line3.jpg"
                alt="line"
                style={{ height: "370px", width: "20px" }}
                className="image"
              ></img>
            </Col>
          ) : (
            <Col>
              <img src="/Line3.jpg" alt="line" className="image"></img>
            </Col>
          )}

          {!isAuthenticated() ? (
            <Col sm>
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
                  onClick={() => navigate("/login")}
                >
                  <strong>STUDENT LOGIN</strong>
                </Button>
                <Button
                  className="bottom-right"
                  variant="outline-primary"
                  onClick={() => navigate("/login")}
                >
                  <strong>ADMIN LOGIN</strong>
                </Button>
                <img
                  src="/GraduateCard.jpg"
                  alt="GraduateCard"
                  className="graduateCard"
                ></img>
              </div>
            </Col>
          ) : (
            <Col sm className="mobImage">
              <div style={{ textAlign: "left", marginLeft: "3%" }}>
                <div>
                  <h4 style={{ color: "#004E9B" }}>
                    <strong> Going Beyond the Imagination,</strong>
                  </h4>
                </div>
                <div style={{ marginTop: "1%" }}>
                  <h1
                    style={{
                      color: "#004E9B",
                      fontSize: "60px",
                      fontFamily: "inherit",
                      fontWeight: "800",
                      textShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <strong>
                      <span style={{ color: "red" }}>S</span>haping{" "}
                      <span style={{ color: "red" }}>E</span>ngineers{" "}
                      <span style={{ color: "red" }}>C</span>reating{" "}
                      <span style={{ color: "red" }}>E</span>xcellence!
                    </strong>
                  </h1>
                </div>
                {/* <div style={{ marginTop: "4%" }}>
            <p
              style={{
                color: "#004E9B",
                fontFamily: "Inter",
                fontWeight: "800",
                fontSize: "18px",
              }}
            >
              Coming Together is a Beginning, Keeping Together is Progress, Working Togehter is <span style={{color:"red"}}>Success</span>
            </p>
          </div> */}
              </div>
            </Col>
          )}
        </Row>
      </Container>
      {isAuthenticated() && (
        <Container fluid>
          <Row>
            <section id="counter" className="sec-padding">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 ">
                    <div className="count">
                      {" "}
                      <span className="fa fa-smile-o"></span>
                      <p className="number">{placedCount}</p>
                      <h4>Placed</h4>{" "}
                    </div>
                  </div>
                  <div className="col-md-3 ">
                    <div className="count">
                      {" "}
                      <span className="fa fa-smile-o"></span>
                      <p className="number">{nonPlacedCount}</p>
                      <h4>Non-Placed</h4>{" "}
                    </div>
                  </div>
                  <div className="col-md-3 ">
                    <div className="count">
                      {" "}
                      <span className="fa fa-smile-o"></span>
                      <p className="number">{completedCount}</p>
                      <h4>Completed Companies</h4>{" "}
                    </div>
                  </div>
                  <div className="col-md-3 ">
                    <div className="count">
                      {" "}
                      <span className="fa fa-smile-o"></span>
                      <p className="number">{pipelinedCount}</p>
                      <h4>Pipelined Companies</h4>{" "}
                    </div>
                  </div>
                </div>
                <Row style={{ marginTop: "2%" }}>
                  <p className="number">{counts.batch}</p>
                </Row>
              </div>
            </section>
          </Row>
        </Container>
      )}
      <Container>
        <Row style={{ marginTop: "2%" }} >
          <Col>
            <hr
              style={{ border: "3px solid #004E9B", borderRadius: "5px" }}
            ></hr>
          </Col>
        </Row>
        </Container>
        {isAuthenticated() ? (
          <Container className="scroll">
          <h3 style={{marginTop:"2%",}}>Our Recruitment Pioneers - {counts.batch}</h3>
          <Row style={{marginTop:"2%",height:"300px"}}  className="overflow-scroll" >
            
            {completedCompaniesDetail.map((company)=>{
              return(
                   <Col xs={8} md={3}>
                   <div
                     className="dashboardCard bg-c-yellow order-card"
                   >
                     <div className="card-block">
                       <h7 className="m-b-20"><strong>{company.companyName}</strong></h7>
                       <h6 className="text-right">
                         <span>{company.PlacedCount} Placed</span>
                       </h6>
                     </div>
                   </div>
                 </Col>
              );
            })}
           
          </Row>
          </Container>
        ) : (
          <Container>
          <Row style={{ marginTop: "6%" }}>
            <Col sm={6}>
              <div className="imageDiv">
                <img src="/PD&PO.png" alt="PD & PO" className="mobImage"></img>
              </div>
              <div style={{ marginTop: "4%" }} className="imageDiv">
                <img
                  src="/alumniCard.jpg" 
                  style={{ border: "4px solid #004E9B", borderRadius: "8px" }}
                  alt="groupPic"
                  className="mobImage"
                ></img>
              </div>
            </Col>

            <Col>
              <img
                src="/Line5.jpg"
                alt="line"
                className="image"
                id="line5"
              ></img>
            </Col>

            <Col>
              <div style={{ marginTop: "5%" }}>
                <img
                  src="Cardimgtop.jpg"
                  alt="cardImg"
                  className="mobImage"
                ></img>
              </div>
              <div style={{ marginTop: "15%" }} className="imageDiv">
                <Row>
                  <Col xs={6}>
                    <img
                      src="/ranking.jpg"
                      alt="RankingImg"
                      className="mobImage-2"
                    ></img>
                  </Col>
                  <Col xs={6}>
                    <img
                      src="/placedCount.jpg"
                      alt="PlacedCountImg"
                      className="mobImage-2"
                    ></img>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          </Container>
        )}
        <Container>
        <Row style={{ marginTop: "3%" }}>
          <Col>
            <hr
              style={{ border: "3px solid #004E9B", borderRadius: "5px" }}
            ></hr>
          </Col>
        </Row>
        {!isAuthenticated() &&(
          <>
             <Row style={{ marginTop: "6%" }}>
             <ComapanyLogo />
           </Row>
            <Row style={{ marginTop: "4%" }}>
            <Col>
              <hr
                style={{ border: "3px solid #004E9B", borderRadius: "5px" }}
              ></hr>
            </Col>
          </Row>
          </>
        )}
       
      </Container>
    </>
  );
};

export default MainHome;
