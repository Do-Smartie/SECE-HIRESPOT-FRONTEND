import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import {addPersonalReview} from "../services/postRequest";
import { useNavigate } from "react-router-dom";

const PersonalHrReviewForm = (props) => {
  const [spinner, setSpinner] = useState(false);
  const [checks, setChecks] = useState([
    {
      name: "Personal Questions",
      value: "Personal Questions",
      display:false
    },
    {
      name: "Managerical",
      value: "Managerical",
      display:false
    },
    {
      name: "Technical",
      value: "Technical",
      display:false
    }
  ]);

  const[checkBoxValues,setCheckBoxValues] = useState([]);
  const[addStatus,setAddStatus] = useState(false);
  const[addvalue,setAddValue] = useState('');
  const navigate = useNavigate();
 
  


  
  const{previewData,setAllInitialState} = props;
  const[personalHrReviewDetail,setPersonalHrReviewDetail] = useState({
    roundNo:previewData.roundNo,
    batch:previewData.batch,
    companyName:previewData.companyName,
    role:previewData.role,
    nameOfTheRound:previewData.nameOfTheRound,
    Package:previewData.Package,
    typeOfQuestions:[],
    level:'',
    interviewDuration:'',
    feedBack:'',
    status:''
  })

  const OnHandleCheckBoxChange = (event,idx)=>{
        const{checked,value} = event.target;
        console.log(checks[idx]);
        checks[idx].display=!checks[idx].display;
        setChecks([...checks]);
        if(checked){
             setCheckBoxValues([...checkBoxValues,value]);
        }else{
            setCheckBoxValues(checkBoxValues.filter((e)=> e!==value));
        }
  }
  
 const OnHandleAddValueChange =(event)=>{
      
      const{name,value} = event.target;
      setAddValue(value);
 }
  const addValueToChecks =(type)=>{
      if(type===""){
        window.alert("Please fill the field to Proceed..");
        return;
      }
      console.log(type);
      const tempVal = {
        name:type,
        value:type,
        display:false,
      }

      setChecks([...checks,tempVal]);
      setAddStatus(false);
      setAddValue('');
     
  }
 
   const OnHandleChange =(event)=>{
      
       const{name,value}=event.target;

       setPersonalHrReviewDetail({...personalHrReviewDetail,[name]:value});
   }
  const onHandleSubmit = (event) => {
    event.preventDefault();
    setSpinner(true);
    personalHrReviewDetail.typeOfQuestions = checkBoxValues;
    setPersonalHrReviewDetail(personalHrReviewDetail);
    console.log(personalHrReviewDetail);
    
    addPersonalReview(personalHrReviewDetail).then((res)=>{

        if(res.data.Success){
            
           window.alert(res.data.Message);
           if(personalHrReviewDetail.status === "Rejected"){
               navigate('/');
               return;
           }
           setSpinner(false);
           setAllInitialState();
        }else{

           window.alert(res.data.Message);
           setSpinner(false);
        }
   }).catch((err)=>{
       window.alert(err.response.data.Message);
       setSpinner(false);
   }).finally(()=>{
       setSpinner(false);
   })
    setCheckBoxValues([]);
    checks.map((val)=>{
        val.display=false;
    })

    setChecks([...checks])
    setPersonalHrReviewDetail({
        roundNo:'',
        batch:'',
        companyName:'',
        role:'',
        nameOfTheRound:'',
        Package:'',
        typeOfQuestions:[],
        level:'',
        interviewDuration:'',
        feedBack:'',
        status:''
      })
  };
  return (
    <Row>
      <Col>
        <Card bg="light">
          <Form style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Col sm={3}>
                <Form.Label row sm={3} style={{ textAlign: "center" }}>
                  <strong>Types Of Questions Asked</strong>
                </Form.Label>
                {checks.map((val,id)=>{

                    return(
                        <Form.Check name={val.name} key={id} value={val.value} checked={val.display} type="checkbox" onChange={(e)=>OnHandleCheckBoxChange(e,id)} label={val.name}/>
                    )
                })}
                {addStatus ?(
                    <>
                    <Form.Group>
                      <Form.Control as="input" size="sm" type="text" onChange={OnHandleAddValueChange}   style={{marginTop:"3%"}} name="addValue" value={addvalue}  placeholder="Add Question Type.." required>
                     </Form.Control>
                     <Row>
                      <Col>  
                     <Button variant="success" style={{marginTop:"3%"}} size="sm" onClick={()=>addValueToChecks(addvalue)} >+Add</Button>
                     </Col>
                     <Col>
                     <Button variant="danger" style={{marginTop:"3%"}} size="sm" onClick={()=>setAddStatus(false)} >Cancel</Button>
                     </Col>
                     </Row>
                     </Form.Group>
                    </>
                ):(
                    <Button variant="success"  size="sm" onClick={()=>setAddStatus(true)} >+Add</Button>
                )}
                
              </Col>
              {/* <Col sm={3}>
                  <Row>
                  <Form.Label column sm={4} style={{ textAlign: "center" }}>
                  <strong>Level</strong>
                  </Form.Label>
                  <Col >
                  <Form.Check name="level" style={{marginTop:"3%"}} onChange={OnHandleChange} value="Easy" checked={personalHrReviewDetail.level==="Easy"} type="radio"  label="Easy" required/>
                  <Form.Check name="level" style={{marginTop:"3%"}} onChange={OnHandleChange} value="Medium" checked={personalHrReviewDetail.level==="Medium"} type="radio"  label="Medium" required/>
                  <Form.Check name="level" style={{marginTop:"3%"}} onChange={OnHandleChange}  value="Hard" checked={personalHrReviewDetail.level==="Hard"} type="radio"  label="Hard" required/>
                  </Col>
                  </Row>
              </Col> */}
              <Col sm={4}>
                  <Row>
                  <Form.Label column sm={6} style={{ textAlign: "center" }}>
                  <strong>Interview Duration</strong>
                  </Form.Label>
                  <Col >
                  <Form.Control as="input" type="text"  onChange={OnHandleChange}  style={{marginTop:"3%"}} name="interviewDuration" value={personalHrReviewDetail.interviewDuration}  placeholder="Time Duration" required>
                  </Form.Control>
                  </Col>
                  </Row>
                  <Row>
                  <Form.Label column sm={6} style={{ textAlign: "center" }}>
                  <strong>Any Other Feedback</strong>
                  </Form.Label>
                  <Col >
                  <Form.Control as="textarea" type="textarea"  onChange={OnHandleChange}  style={{marginTop:"3%"}} name="feedBack" value={personalHrReviewDetail.feedBack}  placeholder="ex: Overall Time 90 Questions" >
                  </Form.Control>
                  </Col>
                  </Row>
                  <Row>
                  <Form.Label column sm={6} style={{ textAlign: "center" }}>
                  <strong>Your Status</strong>
                  </Form.Label>
                  <Col >
                  <Form.Control
                      as="select"
                      aria-label="Default select example"
                      name="status"
                      onChange={OnHandleChange}
                      value={personalHrReviewDetail.status}
                      style={{marginTop:"3%"}}
                      required
                    >
                      <option value="">Your Status</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </Form.Control>
                  </Col>
                  </Row>
              </Col>
            </Form.Group>
            <Row className="mb-3">
              <Col style={{ textAlign: "center" }}>
                {spinner ? (
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submiting...
                  </button>
                ) : (
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <Row style={{ marginTop: "4%" }}>
        <Col>
          <hr style={{ border: "3px solid #004E9B", borderRadius: "5px" }}></hr>
        </Col>
      </Row>
    </Row>
  );
};

export default PersonalHrReviewForm;
