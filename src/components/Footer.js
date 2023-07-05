import Col from "react-bootstrap/esm/Col";
import "../App.css";

const Footer = () => {
  return (
      <footer className="bg-primary text-center text-lg-start text-white footer" style={{marginTop:"4%"}}>
        <div className="container p-4">
          <div className="row my-4">
            <Col xs={6} md={4}>
              <div
                className="shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto"
                style={{ width: "150px", height: "100px" }}
              >
                <img
                  src="/foot-logo.png"
                  alt="...."
                  loading="lazy"
                  className="mobLogo"
                />
              </div>
              <span className="footSpan">
              Sri Eshwar College of Engineering is approved by AICTE, New Delhi and affiliated to Anna University, Chennai.
              </span>
            </Col>
            <Col xs={6} md={4}  className="footerQouteCol">
              <h1 className="footh1" style={{fontFamily:"fantasy",fontStyle:"inherit"}}>''BEGIN YOUR SUCCESS STORY AT<br></br>SRI ESHWAR''</h1>
            </Col>
          </div>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" ,overFlowX:"scroll"}}
        >
            <p style={{color:"white"}}><strong>Copyright © 2023 @ SECE. All Rights Reserved.<br></br><br></br>
Website Developed & Maintained By: Department of Information Technology, SECE.</strong></p>
        </div>
        
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
        </div>
      </footer>
  );
};

export default Footer;
