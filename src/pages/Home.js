import Container from "react-bootstrap/esm/Container";
import MainNavbar from "../components/MainNavbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import CompanyCard from "../components/CompanyCard";
import UpComingCompany from "../components/UpComingComapany";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { getCompanies } from "../services/getRequset";
import { isAdmin } from "../services/Auth";
import { useNavigate } from "react-router-dom";
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
  // {
  //   id: 7,
  //   category: "software",
  //   companyName: "gusa",
  //   dateOfDrive: "2023-06-10",
  //   lastDateOfReg: "2023-06-07",
  //   Package: "10 LPA",
  //   role: "Fullstack",
  //   batch: "2020-2024",
  // },
  // {
  //   id: 12,
  //   category: "software",
  //   companyName: "gusa",
  //   dateOfDrive: "2023-06-10",
  //   lastDateOfReg: "2023-06-07",
  //   Package: "10 LPA",
  //   role: "Fullstack",
  //   batch: "2020-2024",
  // },
  // {
  //   id: 14,
  //   category: "software",
  //   companyName: "gusa",
  //   dateOfDrive: "2023-06-10",
  //   lastDateOfReg: "2023-06-07",
  //   Package: "10 LPA",
  //   role: "Fullstack",
  //   batch: "2020-2024",
  // },
  // {
  //   id: 15,
  //   category: "software",
  //   companyName: "gusa",
  //   dateOfDrive: "2023-06-10",
  //   lastDateOfReg: "2023-06-07",
  //   Package: "10 LPA",
  //   role: "Fullstack",
  //   batch: "2020-2024",
  // },
  // {
  //   id: 16,
  //   category: "software",
  //   companyName: "gusa",
  //   dateOfDrive: "2023-06-10",
  //   lastDateOfReg: "2023-06-07",
  //   Package: "10 LPA",
  //   role: "Fullstack",
  //   batch: "2020-2024",
  // },
  // {
  //   id: 3,
  //   category: "software",
  //   companyName: "gusa",
  //   dateOfDrive: "2023-06-10",
  //   lastDateOfReg: "2023-06-07",
  //   Package: "10 LPA",
  //   role: "Fullstack",
  //   batch: "2020-2024",
  // },
];

const Home = (props) => {


  const[noOnGoingCompanies,setNoOnGoingCompanies] = useState(false);
  const[noUpcominCompanies,setNoUpComingCompanies] = useState(false);

  //state for spinner giff
  const[spinner,setSpinner] = useState(true);
  //Getting companies from DB
  const [onGoingCompanies, setOnGoingCompanies] = useState([]);
  const[upComingCompanies,setUpComingCompanies] = useState([]);

  //registration count

  const[registrationCount,setRegistrationCount] = useState([]);
  useEffect(() => {

    setSpinner(true);
    getCompanies()
      .then((res) => {

        if(res.data.onGoingCompanies.length === 0){
           setNoOnGoingCompanies(true);
        }
        else{
          setOnGoingCompanies(res.data.onGoingCompanies);
          setNoOnGoingCompanies(false);
          let val = res.data.onGoingCompanies.map((ele)=>{
             return ele.RegistrationCount;
          })

          setRegistrationCount(val);
        }
        if(res.data.upComingCompanies.length === 0){
          setNoUpComingCompanies(true);
        }
        else{
          setUpComingCompanies(res.data.upComingCompanies);
          setNoUpComingCompanies(false);
        }  
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.Message);
      }).finally(()=>{
        console.log("process over");
        setSpinner(false);
      });
  }, []);

  const[barVal,setBarVal] = useState(0);
  useEffect(()=>{
     
  setInterval(()=>{

     registrationCount.map((count)=>{
      for(var i = 0;i<count;i++){
         setBarVal(i);
      }
     })
      
  })

  },[]);

const navigate = useNavigate();


  return (
    < >
      <MainNavbar />
      <div style={{backgroundColor:"white"}}>
      <Container className="cardBody">
        <h2 style={{paddingTop:"4%"}}>Ongoing Companies</h2>
        {!spinner ? (
           ( !noOnGoingCompanies ? (
            <Row xs={1} md={3} className="g-4" style={{ marginTop: "2%" }}>
            {onGoingCompanies.map((company, idx) => {
              return (
                <Col key={company.id}>
                  <CompanyCard company={company} barVal={barVal}  />
                </Col>
              );
            })}
          </Row>
          ):(
            <Row>
              <Col >
              <img src="eyeLooking.gif" alt="nocomapniesfound" className="noCompanyImg"></img>
              </Col>
            </Row>
          ))
        ):(
          <Row>
             <Col style={{textAlign:"center"}}>
               <img src='loadingSpinner.gif' alt="loading"  height='300' ></img>
             </Col>
          </Row>
        )}
       
        
        <Row style={{ marginTop: "4%" }}>
          <Col>
            <hr
              style={{ border: "3px solid #004E9B", borderRadius: "5px" }}
            ></hr>
          </Col>
        </Row>
        <h2 style={{ paddingTop:"4%"}}>Upcoming Companies</h2>
        {!noUpcominCompanies ? (
            <Row xs={1} md={3} className="g-4" style={{ marginTop: "2%" }}>
            {upComingCompanies.map((company, idx) => {
              return (
                <Col key={company.id}>
                  <UpComingCompany
                    company={company}
                  />
                </Col>
              );
            })}
          </Row>
        ):(

          <Row>
            <Col >
            <img src="eyeLooking.gif" alt="nocomapniesfound" className="noCompanyImg"></img>
            </Col>
          </Row>

        )}
        
        {
           isAdmin() && (
            <Row style={{ marginTop: "3%", marginBottom: "2%" }}>
              <Col xs={6} md={4}></Col>
              <Col xs={6} md={4}>
                <Button className="primary" size="sm" style={{ width: "50%",fontSize:"14px"}} onClick = {()=>navigate('/addCompanies')}>
                  ADD COMPANY
                </Button>
              </Col>
              <Col xs={6} md={4}></Col>
            </Row>
          ) 
        }

        <Row style={{ marginTop: "4%" }}>
          <Col>
            <hr
              style={{ border: "3px solid #004E9B", borderRadius: "5px" }}
            ></hr>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
};

export default Home;
