import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { isAdmin, isAuthenticated } from "../services/Auth";
import { logOut } from "../services/getRequset";

const MainNavbar = () => {
  const [buttonclr, setButtonclr] = useState("#FFE600");
  const [clr, setClr] = useState("navy");
  const [wid, setWid] = useState("18px");

  const navigate = useNavigate();

  //var for bool isFacultyPC

  var isFacultyPC = sessionStorage.getItem('userType')==='FacultyPC';
  // var isFacultyPC = true;

  //logic for logout
  const logout = async ()=>{
    
    logOut().then((res)=>{
      sessionStorage.removeItem('isAuth');
      sessionStorage.removeItem('userType');
      navigate('/');
    }) ;
  }

  const btnStyle = {
    backgroundColor: `${buttonclr}`,
    color: `${clr}`,
    fontSize: `${wid}`,
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg=""
      style={{ backgroundColor: "#004E9B" }}
      variant="dark"
      sticky="top"
    >
      <Container>
        {/* <Navbar.Brand as={Link} to="/" style={{color:"black",fontSize:"35px",backgroundColor:"white",borderRadius:"10px"}}>ScoreMore</Navbar.Brand> */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo.png"
            width="160"
            height="60"
            // className="d-inline-block align-top"
            alt="Sece logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="me">
            <Nav.Link as={Link} to="/" className="navLink" active>
              <strong>HOME</strong>
            </Nav.Link>
            {!isAuthenticated() && (
                <Nav.Link as={Link} to="/login" className="navLink" active>
                <strong>KEY IN</strong> 
               </Nav.Link>
            )}
             
            {isAuthenticated() && (
            <Nav.Link as={Link} to="/home" className="navLink" active>
              <strong>COMPANIES</strong>
            </Nav.Link> 
            )}
            {isAuthenticated() && isAdmin() && (
              <Nav.Link as={Link} to="/dashboard" className="navLink" active>
              <strong>DASHBOARD</strong> 
              </Nav.Link>
            )}
            {isAuthenticated() && isFacultyPC && (
              <Nav.Link as={Link} to="/dashboard" className="navLink" active>
              <strong>DASHBOARD</strong> 
              </Nav.Link>
            )}
            {isAuthenticated() ? (
              <Nav.Link as={Link} to="/profile" active>
                <strong>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  class="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
                </strong>
              </Nav.Link>
            ) : null}
            {!isAuthenticated() ? (
              <Nav.Link as={Link} to="/register" className="ms-15">
                <Button
                  style={btnStyle}
                  onMouseEnter={() => {
                    setButtonclr("yellow");
                    setClr("white");
                    setWid("18px");
                  }}
                  onMouseLeave={() => {
                    setButtonclr("#FFE600");
                    setClr("navy");
                    setWid("18px");
                  }}
                >
                  <strong>REGISTER NOW</strong>
                </Button>
              </Nav.Link>
            ) : (
              <Nav.Link className="ms-15">
                <Button
                  style={btnStyle}
                  onMouseEnter={() => {
                    setButtonclr("yellow");
                    setClr("white");
                    setWid("18px");
                  }}
                  onMouseLeave={() => {
                    setButtonclr("#FFE600");
                    setClr("navy");
                    setWid("18px");
                  }}

                  onClick={logout}
                >
                  <strong>LOG OUT</strong>
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
