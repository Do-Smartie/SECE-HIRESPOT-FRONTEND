import { Link, Navigate, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { login } from "../services/postRequest";
import {  storeUserType } from "../services/storage";
import {   isAuthenticated } from "../services/Auth";
import MainNavbar from "../components/MainNavbar";

const Login = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });

  const [loading, setLoading] = useState(false);

  const[valid,setValid] = useState(false);
  
  const OnHandleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  
  const navigate = useNavigate();
  const onHandleSubmit = (event) => {
    event.preventDefault();
    console.log(userData);
	setLoading(true);
	login(userData).then((res)=>{
  
    if(res.status==200){
      sessionStorage.setItem("isAuth",true);
    }
	}).catch((err)=>{
		console.log(err.response.data.Message);
    window.alert(err.response.data.Message);
    setValid(true);
	}).finally(()=>{
		setLoading(false);
	})
    setUserData({ username: "", password: "" });
  };
  
  if(isAuthenticated()){
	   
    navigate('/');
  }
  return (
    <>
    <MainNavbar />
    <div className="container-fluid">
      <div className="row main-content bg-success text-center">
        <div className="col-md-4 text-center company__info">
          <span className="company__logo">
            <img src="/loginLogo.jpg" style={{ borderRadius: "10px" }}></img>
          </span>
          {/* <h4 className="company_title">Your Company Logo</h4> */}
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div className="container-fluid">
            <div className="row" style={{ marginTop: "4%" }}>
              <h2>
                <strong>LOG IN</strong>
              </h2>
            </div>
            <div className="row">
              <form control="" className="form-group" onSubmit={onHandleSubmit}>
                <div className="row">
                  <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={OnHandleChange}
                    id="username"
                    className="form__input"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="row">
                  {/* <!-- <span className="fa fa-lock"></span> --> */}
                  <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={OnHandleChange}
                    id="password"
                    className="form__input"
                    placeholder="Password"
                    required
                  />
                </div>
				<div className="row">
					<div className="col" style={{textAlign:"center"}}>
            {valid && (<strong style={{color:"red"}}>Invalid credentials</strong>)}
					</div>
					<div className="col"></div>
					
				</div>
                {loading ? (
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                ) : (
                  <div className="row">
                    <input type="submit" value="Submit" className="button" />
                  </div>
                )}
              </form>
            </div>
            <div className="row">
              <p>
                Forgot Password ?{" "}
                <Link to="/forgotPassword">
                  <strong>Click Here</strong>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Login;
