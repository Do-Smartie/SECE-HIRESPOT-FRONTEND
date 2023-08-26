import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import { addHackathonReview } from "../services/postRequest";
import { useNavigate } from "react-router-dom";

const HackathonReview = (props) => {
  const [spinner, setSpinner] = useState(false);
  
  const navigate = useNavigate();

  const { previewData, setAllInitialState } = props;
  const [hackathonReviewDetail, setHackathonReviewDetail] = useState({
    roundNo: previewData.roundNo,
    batch: previewData.batch,
    companyName: previewData.companyName,
    role: previewData.role,
    nameOfTheRound: previewData.nameOfTheRound,
    Package: previewData.Package,
    problemStatements: "",
    level: "",
    hackathonDuration: "",
    feedBack: "",
    status: "",
  });

  const OnHandleChange = (event) => {
    const { name, value } = event.target;

    setHackathonReviewDetail({ ...hackathonReviewDetail, [name]: value });
  };
  const onHandleSubmit = (event) => {
    event.preventDefault();
    setSpinner(true);
    console.log(hackathonReviewDetail);

    addHackathonReview(hackathonReviewDetail)
      .then((res) => {
        if (res.data.Success) {
          window.alert(res.data.Message);
          if (hackathonReviewDetail.status === "Rejected") {
            navigate("/");
            return;
          }
          setSpinner(false);
          
        } else {
          window.alert(res.data.Message);
          setSpinner(false);
        }
      })
      .catch((err) => {
        window.alert(err.response.data.Message);
        setSpinner(false);
      })
      .finally(() => {
        setSpinner(false);
        setAllInitialState();
      });
      
    setHackathonReviewDetail({
      roundNo: "",
      batch: "",
      companyName: "",
      role: "",
      nameOfTheRound: "",
      Package: "",
      problemStatements: "",
      level: "",
      hackathonDuration: "",
      feedBack: "",
      status: "",
    });
  };
  return (
    <Row>
      <Col>
        <Card bg="light">
          <Form style={{ marginTop: "3%" }} onSubmit={onHandleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Col sm={3}>
                <Form.Label row sm={3} style={{ textAlign: "center" }}>
                  <strong>Problem Statemets</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  onChange={OnHandleChange}
                  style={{ marginTop: "3%" }}
                  name="problemStatements"
                  value={hackathonReviewDetail.problemStatements}
                  placeholder="Hackathon Problem Statements"
                  required
                ></Form.Control>
              </Col>
              <Col sm={3}>
                <Row>
                  <Form.Label column sm={4} style={{ textAlign: "center" }}>
                    <strong>Level</strong>
                  </Form.Label>
                  <Col>
                    <Form.Check
                      name="level"
                      style={{ marginTop: "3%" }}
                      onChange={OnHandleChange}
                      value="Easy"
                      checked={hackathonReviewDetail.level === "Easy"}
                      type="radio"
                      label="Easy"
                      required
                    />
                    <Form.Check
                      name="level"
                      style={{ marginTop: "3%" }}
                      onChange={OnHandleChange}
                      value="Medium"
                      checked={hackathonReviewDetail.level === "Medium"}
                      type="radio"
                      label="Medium"
                      required
                    />
                    <Form.Check
                      name="level"
                      style={{ marginTop: "3%" }}
                      onChange={OnHandleChange}
                      value="Hard"
                      checked={hackathonReviewDetail.level === "Hard"}
                      type="radio"
                      label="Hard"
                      required
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={4}>
                <Row>
                  <Form.Label column sm={6} style={{ textAlign: "center" }}>
                    <strong>Hackathon Duration</strong>
                  </Form.Label>
                  <Col>
                    <Form.Control
                      as="input"
                      type="text"
                      onChange={OnHandleChange}
                      style={{ marginTop: "3%" }}
                      name="hackathonDuration"
                      value={hackathonReviewDetail.hackathonDuration}
                      placeholder="Time Duration"
                      required
                    ></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Form.Label column sm={6} style={{ textAlign: "center" }}>
                    <strong>Any Other Feedback</strong>
                  </Form.Label>
                  <Col>
                    <Form.Control
                      as="textarea"
                      type="textarea"
                      onChange={OnHandleChange}
                      style={{ marginTop: "3%" }}
                      name="feedBack"
                      value={hackathonReviewDetail.feedBack}
                      placeholder="ex: Overall Time 90 Questions"
                    ></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Form.Label column sm={6} style={{ textAlign: "center" }}>
                    <strong>Your Status</strong>
                  </Form.Label>
                  <Col>
                    <Form.Control
                      as="select"
                      aria-label="Default select example"
                      name="status"
                      onChange={OnHandleChange}
                      value={hackathonReviewDetail.status}
                      style={{ marginTop: "3%" }}
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

export default HackathonReview;
