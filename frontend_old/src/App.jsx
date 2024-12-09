import React from "react";
import Navbar from "./components/Navbar";
import EmployeeDetails from "./components/EmployeeDetails";
import MyDetails from "./Pages/MyDetails";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
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
          <Route path="/dashboard" element={<MyDetails/>}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
