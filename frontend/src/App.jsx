import React from "react";
import Navbar from "./components/Navbar";
import EmployeeDetails from "./components/EmployeeDetails";
import MyDetails from "./Pages/MyDetails";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./Pages/AdminDashboard";

import EditForm from "./components/EditForm";
const App = () => {
  return (
    <>
      <div className="main-container mt-2  sm:mt-2 mx-4 sm:mx-[40px]">
        {/* <Navbar /> */}
        {/* <EmployeeDetails/> */}
        {/* <MyDetails /> */}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <LoginForm />
              </>
            }
          ></Route>
          <Route path="/dashboard" element={<MyDetails />}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
          <Route path="/employeeDetails" element={<EmployeeDetails />}></Route>
        </Routes>

        {/* <EditForm/> */}
      </div>
    </>
  );
};

export default App;
