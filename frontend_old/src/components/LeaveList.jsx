import React, { useState, useEffect, useRef } from "react";
import axios from "axios";  
import leaves from "../assets/leaves.svg";
import sickLeave from "../assets/sick-leave.svg";
import vacationLeave from "../assets/vacation-leave.svg";
import search from "../assets/search-icon.svg";
import plus from "../assets/plus-icon.svg";
import LeaveListTable from "./LeaveListTable";
import closeIcon from "../assets/close-icon.svg";
import { jwtDecode } from "jwt-decode";



const formatDate = (dateString) => {
  const [month, day, year] = dateString.split('-');
  return `${year}-${month}-${day}`; 
}
const LeaveList = ({ showTint, setShowTint }) => {
const [componentToBeRendered, setComponentToBeRendered] = useState(false);
  const token = localStorage.getItem("jwtToken");

  const [selectedTime, setSelectedTime] = useState("fullDay");
  
  

 


  const [showLeaveApplyModal, setShowLeaveApplyModal] = useState(false);
  const handleDeleteLeave = (id) => {
    const updatedLeaves = leaveData.filter((leave) => leave.id !== id);
    setLeaveData(updatedLeaves);
  };
  function handleTint() {
    setShowTint(true);
  }
  function handleCloseTint() {
    setShowTint(false);
  }
  function handleCloseModal() {
    setShowLeaveApplyModal(false);
  }
  function handleModal() {
    setShowLeaveApplyModal(true);
  }
 
   
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
//leave data
const [leaveData, setLeaveData] = useState([]);

  // Fetch leave data when the page loads
  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('jwtToken');
        const decoded = jwtDecode(token);
        const user_id = decoded.user_id
        
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }

        // Fetch leave data from the API
        const response = await axios.get('http://127.0.0.1:8000/api/leave/', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Set the fetched leave data to the state
        setLeaveData(response.data); // Assuming the API returns a list of leave objects
        console.log("Fetched leave data:", response.data);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
      useEffect(()=>{
        location.reload();
      },[])
    };

    fetchLeaveData();
  }, []);

  const filteredLeaves = leaveData.filter((leave) => {
    console.log("leave : ", leave)
    const matchesSearch = leave.leave_type
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "" || leave.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalLeaves = filteredLeaves.length;
  const sickLeaveCount = filteredLeaves.filter(
    (leave) => leave.type === "Sick Leave"
  ).length;
  const casualLeaveCount = filteredLeaves.filter(
    (leave) => leave.type === "Casual Leave"
  ).length;
  const vacationLeaveCount = filteredLeaves.filter(
    (leave) => leave.type === "Annual Leave"
  ).length;


  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    timePeriod: selectedTime,
    notes: "",
    notify: "",
  });
  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    console.log("FormData Change:", name, value); // Debugging
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitLeave = () => {
    console.log("Trying to POst");
 
    if (formData.fromDate && formData.toDate) {
      // Convert dates to YYYY-MM-DD format
      const formattedFromDate = formData.fromDate;
      const formattedToDate = formData.toDate;
      const token = localStorage.getItem('jwtToken');
        const decoded = jwtDecode(token);
        const user_id = decoded.user_id
      // Decode the token to extract user details
 
   // Ensure dates are formatted correctly before submitting
     console.log('token :', token)
      const dataToSubmit = {
        ...formData,
        fromDate: formattedFromDate,
        toDate: formattedToDate,
        user_id: user_id,
      };
  
     
      console.log("Data to submit : ", dataToSubmit);
      axios
        .post("http://127.0.0.1:8000/api/leave/", dataToSubmit, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Leave applied successfully:", response.data);
          setLeaveData((prevData) => [...prevData, response.data]);
          // Close modal and reset form if successful
          setShowLeaveApplyModal(false);
          setFormData({
            fromDate: "",
            toDate: "",
            leaveType: "",
            timePeriod: "fullDay",
            notes: "",
            notify: "",
            
          });
          handleCloseTint();
        })
        .catch((error) => {
          console.error("Error applying leave:", error);
        });
    } else {
      console.error("Invalid date format");
    }
  };
  return (
    <>
      <div className="main-container md:border w-[100%] h-[82vh] rounded-lg font-lato py-3 md:px-5 ">
        <div className="header">
          <h1 className="font-semibold text-lg">Leave List</h1>
        </div>

        <div className="grid mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="total-leaves-available w-full flex items-center gap-3 bg-[#FAECEB] p-4 rounded-lg">
            <div className="img-container bg-[#FEA9AC] w-fit rounded-full p-2">
              <img src={leaves} className="w-6" />
            </div>
            <div>
              <h1 className="text-md">Total Leaves Available</h1>
              <p className="font-semibold">{totalLeaves}</p>
            </div>
          </div>

          <div className="sick-leave w-full flex items-center gap-3 bg-[#FCF4E9] p-4 rounded-lg">
            <div className="img-container bg-[#FFD59C] w-fit rounded-full p-2">
              <img src={sickLeave} className="w-6" />
            </div>
            <div>
              <h1 className="text-md">Sick Leave</h1>
              <p className="font-semibold">{sickLeaveCount}</p>
            </div>
          </div>

          <div className="casual-leave w-full flex items-center gap-3 bg-[#E2E9F3] p-4 rounded-lg">
            <div className="img-container bg-[#BFCFD7] w-fit rounded-full p-2">
              <img src={leaves} className="w-6" />
            </div>
            <div>
              <h1 className="text-md">Casual Leave</h1>
              <p className="font-semibold">{casualLeaveCount}</p>
            </div>
          </div>

          <div className="Vacation-leave w-full flex items-center gap-3 bg-[#E8F6FD] p-4 rounded-lg">
            <div className="img-container bg-[#2986CE] w-fit rounded-full p-2">
              <img src={vacationLeave} className="w-6" />
            </div>
            <div>
              <h1 className="text-md">Vacation Leave</h1>
              <p className="font-semibold">{vacationLeaveCount}</p>
            </div>
          </div>
        </div>

        <div className="search-container mt-4 lg:flex items-center justify-between">
          <div className="flex gap-3 items-center md:w-[70%] lg:w-[85%]">
            <div className="search-box w-[50%] gray-border rounded-lg flex gap-2 items-center p-2">
              <img src={search} className="w-5" />
              <input
                type="text"
                className="text-sm w-[100%] outline-none"
                placeholder="Search Leave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-container text-gray-800 w-[50%]">
              <select
                className="gray-border outline-none max-sm:w-[100%] lg:w-[160px] xl:w-[200px] p-2 rounded-lg"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => {
              handleModal();
              handleTint();
            }}
            className="button cursor-pointer bg-[#2986CE] max-sm:w-[100%] max-sm:mt-2 sm:mt-3 md:lg-0 hover:bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-2"
          >
            <span className="flex items-center gap-2 m-auto">
              <img src={plus} className="w-4" />
              Apply Leave
            </span>
          </button>
        </div>

        <LeaveListTable
          leaves={filteredLeaves}
         
          setShowTint={setShowTint}
          handleDeleteLeave={handleDeleteLeave}
        />
      </div>
      {showLeaveApplyModal ? (
        <div className="leave-apply-modal  font-lato  text-[#222222] fixed top-[2%] sm:top-[1%] left-[50%] translate-x-[-50%] bg-white shadow-lg rounded-lg border sm:w-[95%]  md:w-[80%] h-[96vh] max-sm:w-[95%] max-sm:h-[95%]">
          <div className="header flex items-center justify-between p-3 border-bottom">
            <h1 className="text-[20px] text-[#222222]">Apply Leave</h1>
            <div
              onClick={() => {
                handleCloseModal();
                handleCloseTint();
              }}
              className="close-icon bg-[#D9D9D9] px-[10px] py-[10px] rounded-full w-fit cursor-pointer"
            >
              <img src={closeIcon} alt="" />
            </div>
          </div>
          <div className="form max-sm:mt-0  px-2 sm:p-6  ">
            <div className="form-header grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="from-date">
                <label htmlFor="fromDate" className="text-md ">
                  From
                </label>{" "}
                <br />
                <input
                  type="date"
                  className="rounded-lg mt-1 outline-none border w-full border-gray-800 py-2 sm:py-2 px-4 text-md"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleFormDataChange}
                />
              </div>
              <div className="to-date">
                <label htmlFor="toDate" className=" text-md  ">
                  To
                </label>{" "}
                <br />
                <input
                  type="date"
                  className="rounded-lg mt-1 w-full outline-none border border-gray-800 py-2 sm:py-2 px-4 text-md "
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleFormDataChange}
                />
              </div>
            </div>
            <div className="form-body-content mt-2 sm:space-y-2">
              <label htmlFor="leaveType" className="text-md">
                Select Leave Type
              </label>{" "}
              <br />
              <select
                name="leaveType"
                id="leaveType"
                className="mt-1 border outline-none  w-[100%] bg-transparent sm:py-2 py-2 px-2 sm:px-4 text-md  rounded-lg border-gray-800"
                value={formData.leaveType}
                onChange={handleFormDataChange}
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>

              <div className="time-period flex items-center gap-3 bg-gray-50 px-2 py-2 w-[300px] rounded-lg">
                <div className="full-time w-[50%]">
                  <button
                    onClick={() => setSelectedTime("fullDay")}
                    className={`w-[100%] px-3 py-1 rounded-lg ${
                      selectedTime === "fullDay"
                        ? "bg-white shadow-sm text-black"
                        : "text-gray-400"
                    }`}
                  >
                    Full Day
                  </button>
                </div>
                <div className="custom w-[50%]">
                  <select
                    value={formData.timePeriod}
                    onChange={handleFormDataChange}
                    name="timePeriod"
                    className={`w-full px-3 py-1 rounded-lg outline-none ${
                      formData.timePeriod === "firstHalf" ||
                      formData.timePeriod === "secondHalf"
                        ? "bg-white shadow-sm text-black"
                        : "text-gray-500"
                    }`}
                  >
                    <option value="custom">Custom</option>
                    <option value="firstHalf">First Half</option>
                    <option value="secondHalf">Second Half</option>
                  </select>
                </div>
              </div>
              <div className="notes-section mt-4">
                <label htmlFor="notes" className="text-md ">
                  Notes
                </label>{" "}
                <br />
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormDataChange}
                  className="w-[100%] outline-none border border-gray-800 rounded-lg px-2 sm:px-4 text-sm  py-2 sm:py-2 sm:mt-2"
                ></textarea>
              </div>
              <label htmlFor="notify" className="text-md ">
                Notify
              </label>{" "}
              <br />
              <select
                name="notify"
                id="notify"
                className="border border-black w-[100%] px-2 sm:px-4 py-2 sm:py-2 text-md  rounded-lg mt-1"
                value={formData.notify}
                onChange={handleFormDataChange}
              >
                <option value="">Select Employee</option>
                <option>Sarfaras Sir</option>
                <option>AnandhKumar Sir</option>
              </select>

              <div className="button-parent-section  relative ">
                <div className="button-section w-fit absolute  right-0  flex items-center gap-4 mt-3">
                  <button
                    onClick={() => {
                      handleCloseModal();
                      handleCloseTint();
                    }}
                    className="border border-gray-400 rounded-lg px-4 py-2 text-md font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitLeave}
                    className="rounded-lg px-4 py-2 border border-[#2986CE] text-md text-white bg-[#2986CE] font-semibold"
                  >
                    Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LeaveList;
