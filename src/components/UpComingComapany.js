import { Link} from "react-router-dom";
import "../App.js";
import Col from "react-bootstrap/esm/Col.js";
import Button from "react-bootstrap/esm/Button.js";
import Row from "react-bootstrap/esm/Row.js";
import { isAdmin } from "../services/Auth.js";
import dayjs from "dayjs";
import { getJD } from "../services/postRequest.js";


const UpComingCompany = (props) => {
  
  
  const { _id,companyName, role, Package, category, lastDateOfReg,dateOfDrive,batch } = props.company;
  
 //downloading jobDescription from DB

 const downloadJobDescription = ()=>{
     
      getJD(companyName,role,batch).then((res)=>{
        window.location.href=process.env.REACT_APP_BACKEND_API+"/sece/download/"+res.data;
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
              <Link to={"/companyRegister"} state={{_id:_id,companyName:companyName,role:role,Package:Package,batch:batch}}><Button className="buttonBlink" size="sm" >Apply Now</Button></Link>
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
          <h4 className="mb-0" style={{textTransform:"uppercase",fontFamily:"fantasy"}}>{companyName}</h4> <span>{dayjs(dateOfDrive).format("DD/MM/YYYY")}</span>
          </div>
        </div>
        <div className="badge">
          {" "}
          <span>{category}</span>{" "}
        </div>
      </div>
      <div className="mt-3">
        <h7 style={{textTransform:"uppercase"}} className="text2"><strong>Role : {role}</strong></h7><br></br>
        <h7 style={{textTransform:"uppercase"}} className="text2"><strong>Package : {Package}</strong></h7><br></br>
        <h7 style={{textTransform:"uppercase"}} className="text2"><strong>Batch : {batch}</strong></h7><br></br>
        <h7 style={{textTransform:"uppercase",color:"rgba(255, 49, 49, 0.5)"}} className="text2"><strong>Deadline : {dayjs(lastDateOfReg).format('DD/MM/YYYY')}</strong></h7>
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
