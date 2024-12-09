import { Data } from "./store";
import { useState } from "react";
import user from "../assets/user-1.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const DataProvider = ({ children }) => {
  const [employeeLeaveDetails, setemployeeLeaveDetails] = useState([
   
  ]);
  // token comes here 
  const token = localStorage.getItem('jwtToken');
  const decoded = jwtDecode(token);
        const user_id = decoded.user_id
  // fetching data's initially 
  useEffect(() => {
    // Make the GET request to the API
    axios.get("http://127.0.0.1:8000/api/leave/", {
      headers: {
       Authorization: `Bearer ${token}`,
 }
})
      .then((response) => {
        // Assuming response.data contains the leave data
        setemployeeLeaveDetails(response.data);
        console.log("Response from backend : ", response.data)
      })
      .catch((error) => {
        console.error("Error fetching leave details:", error);
      });
  }, []);
  const [employeeDetils, setemployeeDetails] = useState([
  ]);
  const updateLeave = (updatedLeave) => {
    setemployeeLeaveDetails((prevDetails) =>
      prevDetails.map((leave) =>
        leave.id === updatedLeave.id ? updatedLeave : leave
      )
    );
  };
  return (
    <Data.Provider
      value={{
        employeeDetils,
        setemployeeDetails,
        employeeLeaveDetails,
        setemployeeLeaveDetails,
        updateLeave,
      }}
    >
      {children}
    </Data.Provider>
  );
};
