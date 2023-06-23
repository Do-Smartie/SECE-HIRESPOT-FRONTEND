import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainHome from "./pages/MainHome";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddCompanies from "./pages/AddCompanies";
import Home from "./pages/Home";
import EditCompany from "./pages/EditCompany";
import { useState } from "react";
import CompanyRegister from "./pages/CompanyRegister";
import ProtectedAdminRoutes from "./services/protectedRoutes/protectedAdminRoute";
import ProtectedUserRoutes from "./services/protectedRoutes/protecteduserRoute";
import SingleCompanyResults from "./pages/SingleCompanyResults";
import AddDriveResults from "./pages/AddDriveResults";
import Profile from "./pages/Profile";
import ScrollToTop from "./components/ScrollToTop";
import PageNotFound404 from "./pages/404result";
import Dashboard from "./pages/Dashboard";
import ShowStudents from "./pages/ShowStudents";
import UserAttendedCompanies from "./pages/UserAttendedCompanies";
import Faculty from "./pages/showFaculty";
import FacultiesProfiles from "./components/FacultiesProfiles";
import ShowCompanies from "./pages/ShowCompanies";
import RegisteredStudents from "./pages/RegisteredStudents";
import { isAuthenticated } from "./services/Auth";
import FotgotPassword from "./pages/FotgotPassword";
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {


  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainHome />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/404pageNotFound" element={<PageNotFound404 />} />
        {!isAuthenticated() && (<Route path="/forgotPassword" element={<FotgotPassword />}/>)}
        <Route element={<ProtectedUserRoutes />}>
          <Route
            path="/home"
            element={
              <Home  /> 
            } exact
          />
          <Route path="/companyRegister" element={<CompanyRegister />} exact />
          <Route path="/singleCompanyresult" element={<SingleCompanyResults />} />
          <Route path="/profile" element={<Profile />} exact />
        </Route>
        <Route element={<ProtectedAdminRoutes />}>
          <Route path="/addCompanies" element={<AddCompanies />} exact/>
          <Route
            path="/editCompany"
            element={<EditCompany />} exact
          />
          <Route path="/addDriveResults" element={<AddDriveResults />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/showStudents" element={<ShowStudents />  }/>
          <Route path="/userAttendedCompanies" element={<UserAttendedCompanies />} />
          <Route path="/showFaculties" element={<Faculty />}/>
          <Route path="/showFaultiesProfiles" element={<FacultiesProfiles />}/>
          <Route path="/showCompanies" element={<ShowCompanies />} />
          <Route path="/registeredStudents" element={<RegisteredStudents />}/>
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
