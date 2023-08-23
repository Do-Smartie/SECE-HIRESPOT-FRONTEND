import MainNavbar from "../components/MainNavbar";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import ReactDOM from "react-dom";
import { UploadJD, addComapny } from "../services/postRequest";
import { isComapanyAdded } from "../services/companyServices";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfFile from '../services/DownloadPDF';

const AddCompanies = () => {
  //state for company deatails
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    role: "",
    Package: "",
    category: "",
    dateOfDrive: "",
    lastDateOfReg: "",
    batch: "",
  });

  //state for JD
  const [jobDescription, setJobDescription] = useState({
    message: "",
    fileName: "",
  });

  //bool stae for JD Download
  const[initialJD,setInitialJD] = useState(false);

  //state for File
  const [uploadingFileName, setUploadingFileName] = useState({ file: null });

  //state for spinner
  const [spinner, setSpinner] = useState(false);

  //bool based display state for JDfile

  const [boolJD, setBoolJD] = useState(false);

  //onChange logic for companyDeatails
  const OnHandleChange = (event) => {
    const { name, value } = event.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  //onchnage logic for JD
  const OnHandleJobDescriptionChange = (event) => {
    const { name, value } = event.target;

    setJobDescription({ ...jobDescription, [name]: value });
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


  //onSubmit logic for CompanyDeatails
  const onHandleSubmit = (event) => {
    event.preventDefault();

    console.log(companyDetails);

    //spinner works
    setSpinner(true);

    //calling axios post funtion for adding company
    addComapny(companyDetails)
      .then((res) => {
        console.log(res);
        if (isComapanyAdded(res.data.Success)) {
          window.alert(res.data.Message);
          setSpinner(false);
          setBoolJD(true);
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.Message);
      })
      .finally(() => {
        console.log("process over");
        setSpinner(false);
      });

    //setting companyDetails to initial state
    setCompanyDetails({
      companyName: "",
      role: "",
      Package: "",
      category: "",
      dateOfDrive: "",
      lastDateOfReg: "",
      batch: "",
    });

  };

  //logic for uploading JD

  const onHandleJDSubmit = (event) => {
    event.preventDefault();

    //appending JDFile to formdata
    setSpinner(true);
    const formData = new FormData();
    formData.append(
      "JDfile",
      uploadingFileName.file,
      uploadingFileName.file.name
    );
    
    UploadJD(formData).then((res)=>{
       if(res.data.Success){
        window.alert(res.data.Message);
        setBoolJD(false);
        setSpinner(false);
       }
    }).catch((err)=>{
      console.log(err);
      window.alert(err.response.Message);

    }).finally(()=>{
      console.log("process over");
      setSpinner(false);
    })
    console.log(uploadingFileName);
    setUploadingFileName({ file: null });
    setJobDescription({fileName:'',message:''});

    let ele = document.getElementById("JD");
    console.log(ele);
    console.log(ReactDOM.findDOMNode(ele).value);
    ReactDOM.findDOMNode(ele).value = "";


  };

  return (
    <>
      <MainNavbar />
      {!boolJD?(

        <Container>
        <h1 style={{ marginTop: "3%", textAlign: "center" }}>ADD COMPANY</h1>
        <Card bg="light">
          <Form style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>CompanyName</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={companyDetails.companyName}
                  name="companyName"
                  onChange={OnHandleChange}
                  placeholder="Enter The Company name-(eg : Google)"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Role</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  name="role"
                  value={companyDetails.role}
                  onChange={OnHandleChange}
                  type={"text"}
                  placeholder="Enter The Role-(eg : Fullstack Developer)"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Package</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="number"
                  value={companyDetails.Package}
                  name="Package"
                  onChange={OnHandleChange}
                  placeholder="Enter The Package-(eg : 1200000 (or) 700000)"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Category</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  value={companyDetails.category}
                  name="category"
                  onChange={OnHandleChange}
                  placeholder="Enter The Category of Company-(eg : Software (or) Hardware)"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Batch</strong>
              </Form.Label>
              <Col sm={5}>
                {/* <Form.Control
                  type="text"
                  value={companyDetails.batch}
                  name="batch"
                  onChange={OnHandleChange}
                  placeholder="Enter The Batch-(eg : 2020-2024)"
                  required
                /> */}
                 <Form.Control as='select' value={companyDetails.batch} aria-label="Default select example" name="batch" onChange={OnHandleChange}>
                <option>Batch of the student</option>
                <option value="2020-2024">2020-2024</option>
                <option value="2021-2025">2021-2025</option>
                <option value="2022-2026">2022-2026</option>
                <option value="2023-2027">2023-2027</option>
                <option value="2024-2028">2024-2028</option>
                <option value="2025-2029">2025-2029</option>
                <option value="2026-2030">2026-2030</option>
                <option value="2027-2031">2027-2031</option>
                <option value="2028-2032">2028-2032</option>
                <option value="2029-2033">2029-2033</option>
                <option value="2030-2034">2030-2034</option>
              </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Date of Drive</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="date"
                  name="dateOfDrive"
                  value={companyDetails.dateOfDrive}
                  onChange={OnHandleChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Last Date for Registration</strong>
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="date"
                  name="lastDateOfReg"
                  value={companyDetails.lastDateOfReg}
                  onChange={OnHandleChange}
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
                    proceeding...
                  </button>
                ) : (
                  <Button variant="primary" type="submit">
                    Proceed to JD
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
      ):(

        <Container>
        <h1 style={{ marginTop: "3%", textAlign: "center" }}>UPLOAD JD</h1>
        <Card bg="light">
          <Form style={{ marginTop: "3%" }} onSubmit={onHandleJDSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>Job Description</strong>
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={jobDescription.message}
                  onChange={OnHandleJobDescriptionChange}
                  placeholder="Enter the message from Mail and convert it into PDF file and upload below"
                />
              </Col>
              <Col style={{ textAlign: "left" ,marginTop:"3%"}} sm={3}>
                <Form.Control
                  type="text"
                  rows={5}
                  name="fileName"
                  value={jobDescription.fileName}
                  onChange={OnHandleJobDescriptionChange}
                  placeholder="Enter Filename (FileName.pdf)"
                />
              </Col>
              <Col style={{ textAlign: "left",marginTop:"3%" }} sm={3}>
              <PDFDownloadLink document={<PdfFile text={jobDescription.message} />} fileName={jobDescription.fileName}>
                    {({ blob, url, error }) =>
                        <Button color='success' outline >
                            <a href={url} target="_blank"
                                download={jobDescription.fileName} style={{ color: "black", textDecoration: "none" }} >
                                Download as PDF
                            </a>
                        </Button>
                    }
                </PDFDownloadLink>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ textAlign: "center" }}>
                <strong>upload JD .txt file</strong>
              </Form.Label>
              <Col sm={5}>
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
                    UPLOAD JD
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
      ) }
      

      
    </>
  );

};


export default AddCompanies;
