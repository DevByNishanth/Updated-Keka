import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar.jsx'
import arrow from "../assets/arrow.svg";
import search from "../assets/search-icon.svg";
import userImg from "../assets/user-1.png";
import eye from "../assets/eye-icon-new.svg";
import AdminEditModal from "../components/AdminEditModal.jsx";
import axios from 'axios';

const AdminDashboard = () => {


  const token = localStorage.getItem('jwtToken');
  // const decoded = jwtDecode(token);
  // const user_id = decoded.user_id

  const [openAdminEditModal, setOpenAdminEditModal] = useState(false);
  const [adminTint, setAdminTint] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [filter, setFilter] = useState(""); // State to hold the selected filter
  const [leaveRequest, setLeaveRequest] = useState([]);
  const [adminLeave, setAdminLeave] = useState([]);

  const [alert, setAlert] = useState(false);
  const [rejectedAlert, setRejectedAlert] = useState(false)

  useEffect(() => {
    // Make an API call to get leave request data
    axios.get('http://127.0.0.1:8000/api/admin_leave/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        // Store the response data in state
        setAdminLeave(response.data);
        console.log("response from admin leave table data : ", response.data);
      })
      .catch(error => {
        // Handle any errors for the GET request
        console.error('There was an error fetching the leave requests!', error);
      });
  }, []); // Replace with your actual API URL 
  // Handle filter 
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  // Filter the leave requests based on the selected filter
  const filteredLeaveRequests = adminLeave.filter((leave) => {
    if (filter === "") return leave.status === "Rejected" || leave.status === "Approved"; // Show all
    return leave.status === filter; // Show based on selected filter
  });
 
  function openAdminModalHandler(leave) {
    setOpenAdminEditModal(true);
    setAdminTint(true);
    setSelectedLeave(leave);
  }

  useEffect(() => {
    // Make an API call to get leave request data
    axios.get('http://127.0.0.1:8000/api/leave/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        // Store the response data in state
        setLeaveRequest(response.data);
        console.log(response.data);
      })
      .catch(error => {
        // Handle any errors for the GET request
        console.error('There was an error fetching the leave requests!', error);
      });
  }, []); // Replace with your actual API URL

  const handleClick = async (leaveData, status) => {
    try {
      // Construct the payload with updated status
      const payload = {
        ...leaveData,
        status, // Set the status ("Approved" or "Rejected")
      };
  
      // First API call (PUT request)
      const updateResponse = await axios.put(
        `http://127.0.0.1:8000/api/leave/approve/${leaveData.leave_id}/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payload from the frontend for PUT:", payload);
  
      if (updateResponse.status === 200) {
        console.log(`Leave request ${status} successfully updated:`, payload);
  
        // Second API call (POST request)
        const createResponse = await axios.post(
          `http://127.0.0.1:8000/api/admin_leave/`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("status : ", status)
          if(status == "Approved"){
              setAlert(true);
              setTimeout(() => {
                setAlert(false);
              }, 3000);
          }     
          if(status == "Rejected"){
            setRejectedAlert(true);
            setTimeout(() => {
              setRejectedAlert(false)
            }, 3000);
          }
        console.log("Payload from the frontend for POST:", payload);
  
        if (createResponse.status === 201) {
          console.log(`Leave data successfully posted:`, payload);
  
          // Optionally, refresh the leave requests or update the local state
          setLeaveRequest((prevRequests) =>
            prevRequests.map((request) =>
              request.id === leaveData.id ? { ...request, status } : request
            )
          );
        }
      }
    } catch (error) {
      console.error(`Error processing leave request to ${status}:`, error);
    }
   setTimeout(() => {
    window.location.reload()
   }, 4000);
  };
  

  return (
    <>
      <Navbar />
      <div className="main-container mt-3">
        <div className="breadcrumbs">
          <p className="flex items-center gap-2 font-semibold text-lg">
            Dashboard <img src={arrow} className="w-4" />{" "}
            <span className="text-[#2986CE]">Leave Request</span>
          </p>
        </div>
        <div className="searchbox-container mt-2">
          <div className="search-bar flex gap-3 border w-[100%] sm:w-[500px] px-2 py-1 rounded-lg">
            <img src={search} alt="" />
            <input
              type="text"
              placeholder="search"
              className="text-lg bg-transparent outline-none w-[100%]"
            />
          </div>
        </div>
        {/* ------------Leave Requests------------  */}
        <div className="leave-request-container mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4 h-[300px] overflow-auto pr-2">
          {leaveRequest.map((item, index) => {
            return (
              <div className="card border rounded-lg p-3 h-fit">
                <div className="header flex items-center justify-between">
                  <div className="img-container-profile-container flex items-center gap-2">
                    <img src={item.img} alt="" /> 
                    <p className="font-semibold text-lg">{item.user_name}</p>
                  </div>

                  <div className="button-section bg-gray-100 p-2 rounded-full flex gap-3 items-center w-fit">
                    <div onClick={()=>{handleClick(item, "Approved")}} className="approve-btn">
                      <svg
                        width="29"
                        height="29"
                        viewBox="0 0 29 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3131 28.25C6.45653 28.25 0.0878906 22.0941 0.0878906 14.5C0.0878906 6.90588 6.45653 0.75 14.3131 0.75C22.1697 0.75 28.5384 6.90588 28.5384 14.5C28.5384 22.0941 22.1697 28.25 14.3131 28.25ZM12.8949 20L22.9521 10.2774L20.9407 8.33312L12.8949 16.1115L8.87055 12.2216L6.8591 14.1659L12.8949 20Z"
                          fill="#2EB67D"
                        />
                      </svg>
                    </div>
                    <div onClick={()=>{handleClick(item, "Rejected")}} className="reject-btn">
                      <svg
                        width="29"
                        height="29"
                        viewBox="0 0 29 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.6266 28.25C6.77 28.25 0.401367 22.0941 0.401367 14.5C0.401367 6.90588 6.77 0.75 14.6266 0.75C22.4832 0.75 28.8518 6.90588 28.8518 14.5C28.8518 22.0941 22.4832 28.25 14.6266 28.25ZM14.6266 12.5558L10.6037 8.66587L8.59083 10.6115L12.6152 14.5L8.59083 18.3885L10.6037 20.3341L14.6266 16.4442L18.6495 20.3341L20.6624 18.3885L16.638 14.5L20.6624 10.6115L18.6495 8.66587L14.6266 12.5558Z"
                          fill="#F94144"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="body-content mt-2">
                  <table>
                    <tr className="text-[14px] ">
                      <td className="font-semibold">Leave Date : </td>
                      <td className="pl-2">
                        {item.fromDate} - {item.toDate}
                      </td>
                    </tr>
                    <tr className="text-[14px] mt-1">
                      <td className="font-semibold">Leave Type :</td>
                      <td className="pl-2">{item.leave_type}</td>
                      
                    </tr>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
        {/* ----------Approved or Rejected List----------------------  */}
        <div className="breadcrumbs mt-10 flex items-center gap-5 ">
          <p className="font-semibold">Approval / Rejected list Details</p>
          <div className="filter-section">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="w-[300px] border p-1 rounded-lg"
          >
            <option value="">All</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        </div>
        <div className="container-table overflow-auto h-[300px] hide-scrollbar mt-5">
          <table className="bg-white w-full h-[100%] overflow-auto rounded-lg mt-3 hide-scrollbar">
            <thead>
              <tr className="bg-[#e2eff9] text-gray-800 text-sm uppercase leading-normal">
                <th className="py-3 px-2 text-left max-sm:text-[12px]">
                  Leave Type
                </th>
                <th className="py-3 px-2 text-left max-sm:text-[12px]">From</th>
                <th className="py-3 px-2 text-left max-sm:text-[12px]">To</th>
                <th className="py-3 px-2 text-left max-sm:text-[12px]">
                  Reason
                </th>
                <th className="py-3 px-2 text-left max-sm:text-[12px]">
                  Status
                </th>
                <th className="py-3 px-2 text-center max-sm:text-[12px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
            {filteredLeaveRequests.length > 0 ? (
              filteredLeaveRequests.map((leave, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-2">{leave.leave_type}</td>
                  <td className="py-3 px-2">{leave.fromDate}</td>
                  <td className="py-3 px-2">{leave.toDate}</td>
                  <td className="py-3 px-2">{leave.notes || "No reason provided"}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-3 py-1 text-md rounded-lg ${
                        leave.status === "Rejected"
                          ? "bg-red-50 text-red-400"
                          : "bg-green-50 text-green-400"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <button
                      onClick={() => {
                        openAdminModalHandler(leave);
                      }}
                      className="bg-[#E3F3FF] px-[8px] py-[9px] rounded-full hover:text-blue-700"
                    >
                      <img src={eye} className="w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-2 text-center text-gray-500">
                  No leaves found.
                </td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>
      {adminTint ? (
        <div className="admin-tint w-full  fixed right-0 left-0 top-0 bottom-0"></div>
      ) : (
        ""
      )}
      {openAdminEditModal ? (
        <AdminEditModal
          setOpenAdminEditModal={setOpenAdminEditModal}
          setAdminTint={setAdminTint}
          selectedLeave={selectedLeave}
        />
      ) : (
        ""
      )}

{alert ? (
  <div
    className="alert bg-green-300 text-white rounded-lg px-3 py-2 w-[240px] font-semibold text-[13px] fixed right-[-100%] top-[13%] animate-slide-in"
  >
    <div className="flex items-center gap-3">
      <div className="icon-container border border-white rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="white"
          className="bi bi-check-lg"
          viewBox="0 0 16 16"
        >
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
        </svg>
      </div>
      <div>
        <p>Success</p>
        <p>Approval Granted!</p>
      </div>
    </div>
  </div>
) : (
  ""
)}

{rejectedAlert ? (
  <div
    className="alert bg-red-300 text-white rounded-lg px-3 py-2 w-[240px] font-semibold text-[13px] fixed right-[-100%] top-[13%] animate-slide-in"
  >
    <div className="flex items-center gap-3">
      <div className="icon-container border border-white rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="white"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </div>
      <div>
        <p>Rejected</p>
        <p>Request Denied</p>
      </div>
    </div>
  </div>
) : (
  ""
)}

    </>
  );
};

export default AdminDashboard;