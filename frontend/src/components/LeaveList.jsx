  import React, { useState, useEffect, useRef } from "react";
  import axios from "axios";
  import leaves from "../assets/leaves.svg";
  import sickLeave from "../assets/sick-leave.svg";
  import vacationLeave from "../assets/vacation-leave.svg";
  import search from "../assets/search-icon.svg";
  import plus from "../assets/plus-icon.svg";
  import LeaveListTable from "./LeaveListTable";
  import { jwtDecode } from "jwt-decode";
  import closeIcon from "../assets/close-icon.svg";
  import EditLeave from "./EditLeave";
  import { Data } from "../context/store";
  import { useContext } from "react";
  import { v4 as uuidv4 } from "uuid";
  const LeaveList = ({ showTint, setShowTint }) => {

    const token = localStorage.getItem('jwtToken');
    const decoded = jwtDecode(token);
          const user_id = decoded.user_id

    const { employeeLeaveDetails, setemployeeLeaveDetails } = useContext(Data);
    // const [filterStatus, setFilterStatus] = useState("");
    const [selectedTime, setSelectedTime] = useState("fullDay");

    const handleTimeChange = (e) => {
      setSelectedTime(e.target.value);
    };
    const handleDeleteLeave = (leaveId) => {
      const token = localStorage.getItem('jwtToken');
    const decoded = jwtDecode(token);
          const user_id = decoded.user_id
      console.log(leaveId)
      // Make an API call to delete the leave from the database
      axios.delete(`http://127.0.0.1:8000/api/leave/delete/${leaveId}/`, {
        headers: {
        Authorization: `Bearer ${token}`,
  }
  })
      
        .then((response) => {
          // If deletion was successful, filter the local state and update context
          const updatedLeaves = employeeLeaveDetails.filter(
            (leave) => leave.leave_id !== leaveId
          );
          setemployeeLeaveDetails(updatedLeaves); // Update the context with filtered data
        })
        .catch((error) => {
          console.error("Error deleting leave:", error);
          alert("There was an issue deleting the leave. Please try again.");
        });
    };

    const [showLeaveApplyModal, setShowLeaveApplyModal] = useState(false);

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
   
  const [filteredLeaves, setFilteredLeaves] = useState(employeeLeaveDetails);
  useEffect(() => {
    const filtered = employeeLeaveDetails.filter((leave) => {
      const leaveType = leave.leave_type || "";  // Default to empty string if undefined
      const leaveFromDate = leave.from || "";
      const leaveToDate = leave.to || "";
      const leaveReason = leave.reason || "";
      
      // Check if the search term is found in any of the relevant fields (leaveType, fromDate, toDate, reason)
      const matchesSearch =
        leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leaveFromDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leaveToDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leaveReason.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by status if selected
      const matchesFilter = filterStatus === "" || leave.status === filterStatus;
  
      return matchesSearch && matchesFilter;
    });

    
    setFilteredLeaves(filtered); // Set the filtered leave data to be displayed
  }, [searchTerm, filterStatus, employeeLeaveDetails]);

    const totalLeaves = filteredLeaves.length;  
    const sickLeaveCount = filteredLeaves.filter(
      (leave) => leave.leave_type === "Sick Leave"
    ).length;
    const casualLeaveCount = filteredLeaves.filter(
      (leave) => leave.leave_type === "Casual Leave"
    ).length;
    const vacationLeaveCount = filteredLeaves.filter(
      (leave) => leave.leave_type === "Annual Leave"
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
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    
    const handleSubmitLeave = () => {
      const token = localStorage.getItem('jwtToken');
      const decoded = jwtDecode(token);
      const user_id = decoded.user_id
      // Prepare the data to be sent to the API
      const requestData = {
        leave_type: formData.leaveType,
        fromDate: formData.fromDate,
        user_id : user_id,
        toDate: formData.toDate,
        notes: formData.notes,
        notify: formData.notify,
        time_period : formData.timePeriod
        // status: "Pending", 
      };
      console.log(requestData);
      // const token = localStorage.getItem('jwtToken');
      // const decoded = jwtDecode(token);
            // const user_id = decoded.user_id
    
        axios.post("http://127.0.0.1:8000/api/leave/submit/", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
    }
  })
        .then((response) => {
          const newLeave = response.data; // Assume the server responds with the saved leave data

          // Update the context state with the new leave
          setemployeeLeaveDetails((prevDetails) => [...prevDetails, newLeave]);

          // Reset the form and close modal
          setFormData({
            fromDate: "",
            toDate: "",
            leaveType: "",
            timePeriod: "fullDay",
            notes: "",
            notify: "",
          });
          setShowLeaveApplyModal(false);
          handleCloseTint();
        })
        .catch((error) => {
          console.error("Error applying leave:", error);
          alert("There was an issue applying the leave. Please try again.");
        });
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

          {/* <LeaveListTable
            leaves={filteredLeaves}
            filterStatus={filterStatus}
            setShowTint={setShowTint}
            handleDeleteLeave={handleDeleteLeave}
          /> */}
          <LeaveListTable
  leaves={filteredLeaves}  // Pass filtered leaves as a prop
  filterStatus={filterStatus}
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
                          : "text-gray-400 bg-gray-100"
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
