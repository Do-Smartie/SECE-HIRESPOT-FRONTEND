import { Link,useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { register } from "../services/postRequest";
import { getCookie, isAuthenticated } from "../services/Auth";
import MainNavbar from "../components/MainNavbar";
import Col from "react-bootstrap/esm/Col";




const Register = () => {

  const navigate = useNavigate()
  const [registerData, setRegisterData] = useState({
      username: "",
      email: "",
      password: "",
      regNo: "",
      rollNo :"",
      userType : "",
      batch: "",
      department: "",
      fullName : '',
      gender : '',
      dob : '',
      tenthPercent : '',
      twelthPercent : '',
      diplomaPercent:'',
      cgpa : '',
      noOfArrears : '',
      historyOfArrears : '',
      mobileNumber  : '',
      address : '',
      onePageResume : '',
      threePageResume : ''
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
      .then(async(res) => {
        console.log(res);
        if(res.status === 200){
            window.alert("Registration Succesfully Completed");
            sessionStorage.setItem("isAuth",true);
            await getCookie();
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.Message);
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
      userType : "",
      batch: "",
      department: "",
      fullName : '',
      gender : '',
      dob : '',
      tenthPercent : '',
      twelthPercent : '',
      diplomaPercent:'',
      cgpa : '',
      noOfArrears : '',
      historyOfArrears : '',
      mobileNumber  : '',
      address : '',
      onePageResume : '',
      threePageResume : ''
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
                  <select name="department"  className="form__input" id="department"  onChange={OnHandleChange}
                       required>
                      <option label="Department" value=""></option>
                      <option value="IT">IT</option>
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="AIDS">AIDS</option>
                      <option value="MECH">MECH</option>
                      <option value="CCE">CCE</option>
                      <option value="AIML">AIML</option>
                      <option value="CSBS">CSBS</option>
                    </select>
                  </div>
                  <div className="row">
                    <select name="userType"  className="form__input" id="userType"  onChange={OnHandleChange}
                       required>
                      <option label="User Type" value=""></option>
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                      <option value="FacultyPC">Faculty Placement Coordinator</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  {registerData.userType === "Student" && (
                    <>
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
                      name="regNo"
                      onChange={OnHandleChange}
                      value={registerData.regNo}
                      id="regNo"
                      className="form__input"
                      placeholder="Register Number{7228...001}(12 digit)"
                      required
                    />
                  </div>
                  <div className="row">
                  <select name="batch"  className="form__input" id="batch"  onChange={OnHandleChange}
                       required>
                      <option label="Batch" value=""></option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                      <option value="2033">2033</option>
                      <option value="2034">2034</option>
                    </select>
                   </div>
                   <div className="row">
                    <input
                      type="text"
                      name="fullName"
                      onChange={OnHandleChange}
                      value={registerData.fullName}
                      id="fullName"
                      className="form__input"
                      placeholder="Enter the exact name for company Registration"
                      required
                    />
                  </div>
                  <div className="row">
                  <label>Gender</label><br></br>
                  <Col sm={5} >
                    <input
                    type="radio"
                    value="male"
                    name="gender"
                    label ="male"
                    checked = {registerData.gender === "male"}
                    onChange={OnHandleChange}
                    required
                    />Male
                    <br></br>
                    &emsp;<input
                    type="radio"
                    value="female"
                    name="gender"
                    label ="female"
                    checked = {registerData.gender === "female"}
                    onChange={OnHandleChange}
                    required
                    />Female
                    </Col>
                  </div><br></br>
                  <div className="row">
                    <label>Date Of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      onChange={OnHandleChange}
                      value={registerData.dob}
                      id="dob"
                      className="form__input"
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="number"
                      name="tenthPercent"
                      onChange={OnHandleChange}
                      value={registerData.tenthPercent}
                      id="tenthPercent"
                      className="form__input"
                      placeholder="Tenth percent"
                      max={100}
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="number"
                      name="twelthPercent"
                      onChange={OnHandleChange}
                      value={registerData.twelthPercent}
                      id="twelthPercent"
                      className="form__input"
                      placeholder="Twelth percent"
                      max={100}
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="number"
                      name="diplomaPercent"
                      onChange={OnHandleChange}
                      value={registerData.diplomaPercent}
                      id="diplomaPercent"
                      className="form__input"
                      placeholder="Diploma percent"
                      max={100}
                    />
                  </div>
                  <div className="row">
                    <input
                      type="number"
                      name="cgpa"
                      onChange={OnHandleChange}
                      value={registerData.cgpa}
                      id="cgpa"
                      className="form__input"
                      placeholder="CGPA as on date"
                      max={10}
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="number"
                      name="noOfArrears"
                      onChange={OnHandleChange}
                      value={registerData.noOfArrears}
                      id="noOfArrears"
                      className="form__input"
                      placeholder="No of Arrears as on date"
                      max={10}
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="number"
                      name="historyOfArrears"
                      onChange={OnHandleChange}
                      value={registerData.historyOfArrears}
                      id="historyOfArrears"
                      className="form__input"
                      placeholder="History Arrears as on date"
                      max={10}
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="number"
                      name="mobileNumber"
                      onChange={OnHandleChange}
                      value={registerData.mobileNumber}
                      id="mobileNumber"
                      className="form__input"
                      placeholder="Mobile Number"
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="textarea"
                      name="address"
                      onChange={OnHandleChange}
                      value={registerData.address}
                      id="address"
                      className="form__input"
                      placeholder="Address"
                      required
                    />
                  </div>
                   </>
                  )}
                  {registerData.userType==='Faculty' || registerData.userType==='FacultyPC' ? (
                    <div className="row">
                    <input
                      type="text"
                      name="rollNo"
                      onChange={OnHandleChange}
                      value={registerData.rollNo}
                      id="rollNo"
                      className="form__input"
                      placeholder="Employee Number"
                      required
                    />
                  </div>
                  ):null}
                 
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
