import { Data } from "./store";
import { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct the import from 'jwtDecode' to 'jwt-decode'

export const DataProvider = ({ children }) => {
  const [employeeLeaveDetails, setEmployeeLeaveDetails] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [userId, setUserId] = useState(null); // State to store the user ID
  const [token, setToken] = useState(localStorage.getItem("jwtToken")); // Use state for token
  const [userName, setUserName] = useState("");

 const [deletingLeaveId, setDeletingLeaveId] = useState(null);

  // Decode the token and set userId when token changes
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.user_id); // Store user ID
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem("jwtToken");
        setToken(null); // Reset token if invalid
      }
    }
  }, [token]); // Dependency array: re-run when the token changes

  // Fetch leave details when token or userId changes
  useEffect(() => {
    if (token && userId) {
      axios
        .get(`http://127.0.0.1:8000/api/leave/user_leave/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setEmployeeLeaveDetails(response.data);
          
        })
        .catch((error) => {
          console.error("Error fetching leave details:", error);
        });
    }
  }, [token, userId]); // Fetch data when token or userId changes

  // Fetch username based on userId when it changes
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://127.0.0.1:8000/api/get_username/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserName(response.data.username); // Set the username from the response
        })
        .catch((error) => {
          console.error("Error fetching username:", error);
        });
    }
  }, [userId, token]);
  const updateLeave = (updatedLeave) => {
    setEmployeeLeaveDetails((prevDetails) =>
      prevDetails.map((leave) =>
        leave.id === updatedLeave.id ? updatedLeave : leave
      )
    );
  };
  console.log("UserNAme :", userName)
  return (
    <Data.Provider
      value={{
        employeeDetails,
        setEmployeeDetails,
        employeeLeaveDetails,
        setEmployeeLeaveDetails,
        updateLeave,
        userId,
        setToken, // Pass setToken to allow token update from other components (e.g., login page)
        userName, 
        setUserName,
        deletingLeaveId,
         setDeletingLeaveId,
      }}
    >
      {children}
    </Data.Provider>
  );
};
