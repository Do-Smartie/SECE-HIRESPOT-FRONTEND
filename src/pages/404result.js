import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "../App.css";
import { Link } from "react-router-dom";

const PageNotFound404 = () => {
  return (
    <Row style={{marginTop:"10%"}}>
      <Col sm={6}>
        <img
          src="404image.gif"
          alt="404 page Not found"
          className="img404"
        ></img>
      </Col>
      <Col sm={4}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="error-template">
                <h1>Oops!</h1>
                <h2>404 Not Found</h2>
                <div className="error-details">
                  Sorry, an error has occured, Requested page not found!
                </div>
                <div className="error-actions">
                  <Link
                    className="btn btn-primary btn-lg"
                    to='/'
                  >
                    Take Me Home{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default PageNotFound404;
