import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { register } from "../services/postRequest";
import { getCookie, isAuthenticated } from "../services/Auth";
import MainNavbar from "../components/MainNavbar";
import Col from "react-bootstrap/esm/Col";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    regNo: "",
    rollNo: "",
    userType: "",
    batch: "",
    department: "",
    fullName: "",
    gender: "",
    dob: "",
    tenthPercent: "",
    twelthPercent: "",
    diplomaPercent: "",
    cgpa: "",
    noOfArrears: "",
    historyOfArrears: "",
    mobileNumber: "",
    address: "",
    onePageResume: "",
    threePageResume: "",
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
      .then(async (res) => {
        console.log(res);
        if (res.status === 200) {
          window.alert("Registration Succesfully Completed");
          sessionStorage.setItem("isAuth", true);
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
      rollNo: "",
      userType: "",
      batch: "",
      department: "",
      fullName: "",
      gender: "",
      dob: "",
      tenthPercent: "",
      twelthPercent: "",
      diplomaPercent: "",
      cgpa: "",
      noOfArrears: "",
      historyOfArrears: "",
      mobileNumber: "",
      address: "",
      onePageResume: "",
      threePageResume: "",
    });
  };

  if (isAuthenticated()) {
    navigate("/");
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
                  <br></br>
                  <div className="row">
                    <label>
                      <strong>User Name</strong>
                    </label>
                    <input
                      type="text"
                      name="username"
                      onChange={OnHandleChange}
                      value={registerData.username}
                      id="username"
                      className="form__input"
                      placeholder="RollNo as Username"
                      pattern="[0-9]{2}[A-Z]{2}[0-9]{3}"
                      required
                    />
                  </div>
                  <br></br>
                  <div className="row">
                    <label>
                      <strong>Email-ID</strong>
                    </label>
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
                  <br></br>
                  <div className="row">
                    <label>
                      <strong>Password</strong>
                    </label>
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
                  <br></br>
                  <div className="row">
                    <label>
                      <strong>Deparment</strong>
                    </label>
                    <select
                      name="department"
                      className="form__input"
                      id="department"
                      onChange={OnHandleChange}
                      required
                    >
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
                  <br></br>
                  <div className="row">
                    <label>
                      <strong>User Type</strong>
                    </label>
                    <select
                      name="userType"
                      className="form__input"
                      id="userType"
                      onChange={OnHandleChange}
                      required
                    >
                      <option label="User Type" value=""></option>
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                      <option value="FacultyPC">
                        Faculty Placement Coordinator
                      </option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <br></br>
                  {registerData.userType === "Student" && (
                    <>
                      <div className="row">
                        <label>
                          <strong>Roll No</strong>
                        </label>
                        <input
                          type="text"
                          name="rollNo"
                          onChange={OnHandleChange}
                          value={registerData.rollNo}
                          id="rollNo"
                          className="form__input"
                          pattern={registerData.username}
                          placeholder="Roll Number(20IT014)"
                          required
                        />
                      </div>
                      <br></br>
                      <div className="row">
                        <label>
                          <strong>Registration No</strong>
                        </label>
                        <input
                          type="text"
                          name="regNo"
                          onChange={OnHandleChange}
                          value={registerData.regNo}
                          id="regNo"
                          className="form__input"
                          pattern="[0-9]{12}"
                          placeholder="Register Number{7228...001}(12 digit)"
                          required
                        />
                      </div>
                      <br></br>
                      <div className="row">
                        <label>
                          <strong>Batch</strong>
                        </label>
                        <select
                          name="batch"
                          className="form__input"
                          id="batch"
                          onChange={OnHandleChange}
                          required
                        >
                          <option label="Batch" value=""></option>
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
                        </select>
                      </div>
                      <br></br>
                      <div className="row">
                        <label>
                          <strong>Student Full Name</strong>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          onChange={OnHandleChange}
                          value={registerData.fullName}
                          id="fullName"
                          className="form__input"
                          placeholder="Enter Your Name in Capital"
                          required
                        />
                      </div>
                      <br></br>
                      <div className="row">
                        <label>
                          <strong>Gender</strong>
                        </label>
                        <br></br>
                        <Col sm={5}>
                          <input
                            type="radio"
                            value="male"
                            name="gender"
                            label="male"
                            checked={registerData.gender === "male"}
                            onChange={OnHandleChange}
                            required
                          />
                          Male
                          <br></br>
                          &emsp;
                          <input
                            type="radio"
                            value="female"
                            name="gender"
                            label="female"
                            checked={registerData.gender === "female"}
                            onChange={OnHandleChange}
                            required
                          />
                          Female
                          <br></br>
                          &emsp;&emsp;&emsp;
                          <input
                            type="radio"
                            value="transgender"
                            name="gender"
                            label="transgender"
                            checked={registerData.gender === "transgender"}
                            onChange={OnHandleChange}
                            required
                          />
                          Transgender
                        </Col>
                      </div>
                      <br></br>
                      <div className="row">
                        <label>
                          <strong>Date of Birth</strong>
                        </label>
                        <br></br>
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
                      <br></br>
                      <div className="row">
                        <label>
                          <strong>SSLC Percent</strong>
                        </label>
                        <input
                          type="number"
                          name="tenthPercent"
                          onChange={OnHandleChange}
                          value={registerData.tenthPercent}
                          id="tenthPercent"
                          className="form__input"
                          placeholder="SSLC percent"
                          step="any"
                          min={35}
                          max={100}
                          required
                        />
                      </div>
                      <br></br>
                      <div className="row">
                        <label>
                          <strong>HSC Percent</strong>
                        </label>
                        <input
                          type="number"
                          name="twelthPercent"
                          onChange={OnHandleChange}
                          value={registerData.twelthPercent}
                          id="twelthPercent"
                          className="form__input"
                          placeholder="HSC percent"
                          step="any"
                          min={35}
                          max={100}
                          required
                        />
                      </div>
                      <br></br>
                      {registerData.twelthPercent === "" && (
                        <>
                          <div className="row">
                            <label>
                              <strong>Diploma Percent</strong>
                            </label>
                            <input
                              type="number"
                              name="diplomaPercent"
                              onChange={OnHandleChange}
                              value={registerData.diplomaPercent}
                              id="diplomaPercent"
                              className="form__input"
                              placeholder="Diploma percent"
                              step="any"
                              min={50}
                              max={100}
                            />
                          </div>
                          <br></br>
                        </>
                      )}
                      <div className="row">
                        <label>
                          <strong>CGPA</strong>
                        </label>
                        <input
                          type="number"
                          name="cgpa"
                          onChange={OnHandleChange}
                          value={registerData.cgpa}
                          id="cgpa"
                          className="form__input"
                          placeholder="CGPA as on date"
                          step="any"
                          min={5}
                          max={10}
                          required
                        />
                      </div>
                      <br></br>
                      <div className="row">
                        <label>
                          <strong>History of Arrears</strong>
                        </label>
                        <input
                          type="number"
                          name="historyOfArrears"
                          onChange={OnHandleChange}
                          value={registerData.historyOfArrears}
                          id="historyOfArrears"
                          className="form__input"
                          placeholder="History Arrears as on date"
                          min={0}
                          max={20}
                          required
                        />
                      </div>
                      <br></br>
                      <div className="row">
                        <label>
                          <strong>No of Arrears</strong>
                        </label>
                        <input
                          type="number"
                          name="noOfArrears"
                          onChange={OnHandleChange}
                          value={registerData.noOfArrears}
                          id="noOfArrears"
                          className="form__input"
                          placeholder="No of Arrears as on date"
                          min={0}
                          max={registerData.historyOfArrears}
                          required
                        />
                      </div>
                      <br></br>
                      <div className="row">
                        <label>
                          <strong>Mobile Number</strong>
                        </label>
                        <input
                          type="mobile"
                          name="mobileNumber"
                          onChange={OnHandleChange}
                          value={registerData.mobileNumber}
                          id="mobileNumber"
                          className="form__input"
                          placeholder="Mobile Number(10 digit)"
                          pattern="[0-9]{10}"
                          required
                        />
                      </div>
                      <br></br>
                      <div className="row">
                        <label>
                          <strong>Address</strong>
                        </label>
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
                      <br></br>
                    </>
                  )}
                  {registerData.userType === "Faculty" ||
                  registerData.userType === "FacultyPC" ? (
                    <>
                      <div className="row">
                        <label>
                          <strong>Employee Number</strong>
                        </label>
                        <input
                          type="text"
                          name="rollNo"
                          onChange={OnHandleChange}
                          value={registerData.rollNo}
                          id="rollNo"
                          className="form__input"
                          pattern={registerData.username}
                          placeholder="Employee Number"
                          required
                        />
                      </div>
                      <br></br>
                    </>
                  ) : null}

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
