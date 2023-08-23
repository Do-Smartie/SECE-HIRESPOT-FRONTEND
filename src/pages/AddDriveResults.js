import React, { useState } from "react";
import MainNavbar from "../components/MainNavbar";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import { addDriveResult, uploadResults } from "../services/postRequest";
import ReactDOM from "react-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfFile from '../services/DownloadPDF';

const AddDriveResults = () => {
  const location = useLocation();
  const { companyName, batch , role} = location.state || {};

  const [resultDetail, setResultDetail] = useState({
    companyName: !companyName ? "" : companyName,
    batch: !batch ? "" : batch,
    roundNumber:"",
    role : role
  });

  //boolean state for resultupload

  const [boolResult, setBoolResult] = useState(false);

//onchange logic for resultDetails

const OnHandleChange = (event)=>{

    const{name,value} = event.target;

    setResultDetail({...resultDetail,[name]:value});
}

//post request for resultDetails

const onHandleSubmit =(event)=>{
    event.preventDefault();

    console.log(resultDetail);
    setSpinner(true);
    addDriveResult(resultDetail).then((res)=>{
        console.log(res);
        if(res.data.Success){
            window.alert(res.data.Message);
            setSpinner(false);
            setBoolResult(true);
        }
    }).catch((err)=>{
        console.log(err);
        window.alert(err.response.data.Message);
    }).finally(()=>{
        console.log("process over");
        setSpinner(false);
    })
}






  //state for JD
  const [resultNote, setResultNote] = useState({
    message: "",
    fileName: "",
  });

  //state for File
  const [uploadingFileName, setUploadingFileName] = useState({ file: null });

  //state for spinner
  const [spinner, setSpinner] = useState(false);

  //onchnage logic for JD
  const OnHandleresultNoteChange = (event) => {
    const { name, value } = event.target;

    setResultNote({ ...resultNote, [name]: value });
  };

  //on change logic for file
  const OnHandleFileChange = (event) => {
    // const { name, value } = event.target;

    // console.log(name);
    // console.log(value);
    // console.log(event.target.files[0]);
    uploadingFileName.file = event.target.files[0];
    setUploadingFileName(uploadingFileName);
    // console.log(uploadingFileName);
  };

  
    //logic for uploading JD

    const onHandleResultSubmit = (event) => {
        event.preventDefault();
    
        //appending JDFile to formdata
        setSpinner(true);
        const formData = new FormData();
        formData.append(
          "ResultFile",
          uploadingFileName.file,
          uploadingFileName.file.name
        );
        
        uploadResults(formData).then((res)=>{
           if(res.data.Success){
            window.alert(res.data.Message);
            setBoolResult(false);
            setSpinner(false);
           }
        }).catch((err)=>{
          console.log(err);
          window.alert(err.response.data.Message);
    
        }).finally(()=>{
          console.log("process over");
          setSpinner(false);
        })
        console.log(uploadingFileName);
        setUploadingFileName({ file: null });
    
        let ele = document.getElementById("JD");
        console.log(ele);
        console.log(ReactDOM.findDOMNode(ele).value);
        ReactDOM.findDOMNode(ele).value = "";
    
    
      };

  return (
    <>
      <MainNavbar />
      {!boolResult ? (
         <Container>
         <h1 style={{textAlign:"center"}}>Add Results</h1>
         <Card bg="light">
           <Form style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
             <Form.Group as={Row} className="mb-3">
               <Form.Label column sm={2} style={{ textAlign: "center" }}>
                 <strong>CompanyName</strong>
               </Form.Label>
               <Col sm={5}>
                 <Form.Control
                   type="text"
                   value={resultDetail.companyName}
                   name="companyName"
                   onChange={OnHandleChange}
                   placeholder="Enter The Company name-(eg : Google)"
                   required
                 />
               </Col>
             </Form.Group>
             <Form.Group as={Row} className="mb-3">
               <Form.Label column sm={2} style={{ textAlign: "center" }}>
                 <strong>Batch</strong>
               </Form.Label>
               <Col sm={5}>
                 <Form.Control
                   type="text"
                   value={resultDetail.batch}
                   name="batch"
                   onChange={OnHandleChange}
                   placeholder="Enter The Batch-(eg : 2020-2024)"
                   required
                 />
               </Col>
             </Form.Group>
             <Form.Group as={Row} className="mb-3">
               <Form.Label column sm={2} style={{ textAlign: "center" }}>
                 <strong>Round</strong>
               </Form.Label>
               <Col sm={5}>
                 <Form.Control
                   type="number"
                   value={resultDetail.roundNumber}
                   name="roundNumber"
                   onChange={OnHandleChange}
                   placeholder="Enter The Round No-(eg : 1 (or) 2)"
                   required
                 />
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
                     Proceeding...
                   </button>
                 ) : (
                   <Button variant="primary" type="submit">
                     PROCEED TO UPLOAD 
                   </Button>
                 )}
               </Col>
             </Row>
           </Form>
         </Card>
       </Container>

      ):(
        
        <Container>
        <h1 style={{ marginTop: "3%", textAlign: "center" }}>UPLOAD RESULT FILE</h1>
        <Card bg="light">
          <Form style={{ marginTop: "3%" }} onSubmit={onHandleResultSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Result Deatails</strong>
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={resultNote.message}
                  onChange={OnHandleresultNoteChange}
                  placeholder="Enter the Round Cleared students to Make PDF file to upload below (or) Upload the result pdf file or anything...."
                />
              </Col>
              <Col style={{ textAlign: "left",marginTop:"3%"}} sm={3}>
                <Form.Control
                  type="text"
                  rows={5}
                  name="fileName"
                  value={resultNote.fileName}
                  onChange={OnHandleresultNoteChange}
                  placeholder="Enter Filename(File.pdf)"
                />
              </Col>
              <Col style={{ textAlign: "left",marginTop:"3%"}} sm={3}>
              <PDFDownloadLink document={<PdfFile text={resultNote.message} />} fileName={resultNote.fileName}>
                    {({ blob, url, error }) =>
                        <Button color='success' outline >
                            <a href={url} target="_blank"
                                download={resultNote.fileName} style={{ color: "black", textDecoration: "none" }} >
                                Download as PDF
                            </a>
                        </Button>
                    }
                </PDFDownloadLink>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>upload .pdf file</strong>
              </Form.Label>
              <Col sm={5} >
                <Form.Control
                  type="file"
                  id="JD"
                  name="uploadingFileName"
                  onChange={OnHandleFileChange}
                  required
                />
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
                    Uploading...
                  </button>
                ) : (
                  <Button variant="primary" type="submit">
                    UPLOAD DRIVE RESULTS
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Card>
        <Row style={{ marginTop: "4%" }}>
          <Col>
            <hr
              style={{ border: "3px solid #004E9B", borderRadius: "5px" }}
            ></hr>
          </Col>
        </Row>
      </Container>
      )}

    </>
  );
};

export default AddDriveResults;
