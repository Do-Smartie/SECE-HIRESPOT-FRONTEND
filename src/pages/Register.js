import { Link, Navigate,useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { register } from "../services/postRequest";
import { isAuthenticated } from "../services/Auth";
import MainNavbar from "../components/MainNavbar";
import { storeUserType } from "../services/storage";



const Register = () => {

  const navigate = useNavigate()
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    regNo: "",
    rollNo:"",
    userType:"",
    batch: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const OnHandleChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(registerData);
    register(registerData)
      .then((res) => {
        console.log(res);
        if(res.status == 200){
            window.alert("Registration Succesfully Completed");
            sessionStorage.setItem("isAuth",true);
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("Error Occurred in Registeration - Try Again");
      })
      .finally(() => {
        setLoading(false);
      });

    setRegisterData({
      username: "",
      email: "",
      password: "",
      regNo: "",
      rollNo :"",
      userType : null,
      batch: "",
      department: "",
    });
  };

  if(isAuthenticated()){
    navigate('/');
  }

  //redirect usert to ho
  return (
    <>
      <MainNavbar />
      <div className="container-fluid">
        <div className="row main-content bg-success text-center">
          <div className="col-md-4 text-center company__info">
            <span className="company__logo">
              <img
                src="/loginLogo.jpg"
                alt="logo"
                style={{ borderRadius: "10px" }}
              ></img>
            </span>
            {/* <h4 className="company_title">Your Company Logo</h4> */}
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
            <div className="container-fluid">
              <div className="row" style={{ marginTop: "4%" }}>
                <h2>
                  <strong>SIGN UP</strong>
                </h2>
              </div>
              <div className="row">
                <form
                  control=""
                  className="form-group"
                  onSubmit={onHandleSubmit}
                >
                  <div className="row">
                    <input
                      type="text"
                      name="username"
                      onChange={OnHandleChange}
                      value={registerData.username}
                      id="username"
                      className="form__input"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="email"
                      name="email"
                      onChange={OnHandleChange}
                      value={registerData.email}
                      id="email"
                      className="form__input"
                      placeholder="Email-Id"
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="password"
                      name="password"
                      onChange={OnHandleChange}
                      value={registerData.password}
                      id="password"
                      className="form__input"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="text"
                      name="regNo"
                      onChange={OnHandleChange}
                      value={registerData.regNo}
                      id="regNo"
                      className="form__input"
                      placeholder="Register Number"
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="text"
                      name="rollNo"
                      onChange={OnHandleChange}
                      value={registerData.rollNo}
                      id="rollNo"
                      className="form__input"
                      placeholder="Roll Number(20IT014)"
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="text"
                      name="department"
                      onChange={OnHandleChange}
                      value={registerData.department}
                      id="department"
                      className="form__input"
                      placeholder="Your Department(Eg - Information Technology)"
                      required
                    />
                  </div>
                  <div className="row">
                    <select name="userType"  className="form__input" id="userType"  onChange={OnHandleChange}
                       required>
                      <option label="User Type" value=""></option>
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  {registerData.userType === "Student" && (
                     <div className="row">
                     <input
                       type="text"
                       name="batch"
                       onChange={OnHandleChange}
                       value={registerData.batch}
                       id="batch"
                       className="form__input"
                       placeholder="Batch(eg : 2020-2024) && if staff just ignore"
                       required
                     />
                   </div>
                  )}
                 
                  {loading ? (
                    <button class="btn btn-primary" type="button" disabled>
                      <span
                        class="spinner-border spinner-border-sm"
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
                  Already have an account?{" "}
                  <Link to="/login">
                    <strong>Login Here</strong>
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

export default Register;
