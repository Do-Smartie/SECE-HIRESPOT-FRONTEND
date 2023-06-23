import { Link} from "react-router-dom";
import "../App.js";
import Col from "react-bootstrap/esm/Col.js";
import Button from "react-bootstrap/esm/Button.js";
import Row from "react-bootstrap/esm/Row.js";
import { isAdmin } from "../services/Auth.js";
import dayjs from "dayjs";
import { getJD } from "../services/postRequest.js";


const UpComingCompany = (props) => {
  
  
  const { _id,CompanyName, Role, Package, Category, LastDateOfRegistration,DateOfDrive,Batch } = props.company;
  
 //downloading jobDescription from DB

 const downloadJobDescription = ()=>{
     
      getJD(CompanyName,Role,Batch).then((res)=>{
        console.log(res);
      }).catch((err)=>{
          console.log(err);
      })

 }
  const buttonRender = ()=>{
    if(isAdmin()){
      return(
        <>
          <Col xs={6}>
              <Link variant="outline-info" onClick={downloadJobDescription}>Job Description</Link>
            </Col>
            <Col xs={6} style={{ textAlign: "right" }}>
              <Link to='/editCompany' state={{currCompany:props.company}}>
              <Button className="primary" size="sm">Edit</Button>
              </Link>   
            </Col>
        </>
      );
    }
    else{
      return(
          <>
            <Col xs={6} >
              <Link variant="outline-info" onClick={downloadJobDescription}>Job Description</Link>
            </Col>
            <Col xs={6} style={{ textAlign: "right" }}>
              <Link to={"/companyRegister"} state={{_id:_id,companyName:CompanyName,role:Role,Package:Package}}><Button className="buttonBlink" size="sm" >Apply Now</Button></Link>
            </Col>
          </>
      );
    }
  }

  return (
    <div className="comCard p-3 mb-2" >
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div className="icon">
            {" "}
            <img src="/loginLogo.jpg" alt="logo" className="iconimg"></img>{" "}
          </div>
          <div className="ms-2 c-details">
          <h4 className="mb-0" style={{textTransform:"uppercase",fontFamily:"fantasy"}}>{CompanyName}</h4> <span>{dayjs(DateOfDrive).format("DD/MM/YYYY")}</span>
          </div>
        </div>
        <div className="badge">
          {" "}
          <span>{Category}</span>{" "}
        </div>
      </div>
      <div className="mt-3">
        <h7 style={{textTransform:"uppercase"}} className="text2"><strong>Role : {Role}</strong></h7><br></br>
        <h7 style={{textTransform:"uppercase"}} className="text2"><strong>Package : {Package}</strong></h7><br></br>
        <h7 style={{textTransform:"uppercase"}} className="text2"><strong>Batch : {Batch}</strong></h7><br></br>
        <h7 style={{textTransform:"uppercase",color:"rgba(255, 49, 49, 0.5)"}} className="text2"><strong>Deadline : {dayjs(LastDateOfRegistration).format('DD/MM/YYYY')}</strong></h7>
        <div className="mt-4">
          <Row>
            {buttonRender()}
          </Row>
        </div>
      </div>
      <span   id="span"></span>
      <span  id="span"></span>
      <span  id="span"></span>
      <span  id="span"></span>
    </div>
  );
};

export default UpComingCompany;
