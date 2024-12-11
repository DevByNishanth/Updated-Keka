import React, { useState } from "react";
import closeIcon from "../assets/close-icon.svg";
import editIcon from '../assets/edit.svg'
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const AdminEditModal = ({
  setOpenAdminEditModal,
  setAdminTint,
  selectedLeave,
}) => {
  const [updatedStatus, setUpdatedStatus] = useState(selectedLeave.status);
  const [changeStatusModal, setChangeStatusModal] = useState(false)
const [showTint, setShowTint] = useState(false);

const handleStatusChange = (event) => {
  setUpdatedStatus(event.target.value); // Update the status based on the selected radio button
};

function handleChangeStatus(leave){
  setChangeStatusModal(true)
  setShowTint(true)
}
function handleCloseModal(){
  setChangeStatusModal(false)
  setShowTint(false)
}

const handleUpdateStatus = async () => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("jwtToken");

    // Decode the token (optional, if you need to use the decoded info)
    const decoded = jwtDecode(token);
    console.log("Decoded Token Info:", decoded);

    // Construct the payload
    const payload = {
      ...selectedLeave,
      status: updatedStatus,
    };
    console.log("PAYLOAD FOR ADMIN:", payload);

    // First API call to update the status
    const firstResponse = await axios.put(
      `http://127.0.0.1:8000/api/admin_leave/${selectedLeave.leave_id}/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    if (firstResponse.status === 200) {
      console.log("First update successful:", payload);

      // Second API call to another endpoint with the same payload
      const secondResponse = await axios.put(
        `http://127.0.0.1:8000/api/leave/approve/${selectedLeave.leave_id}/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (secondResponse.status === 200) {
        console.log("Second update successful:", payload);

        // Optionally refresh or handle further actions after the updates
        handleCloseModal(); // Close the modal
        window.location.reload(); // Reload the page
      }
    }
  } catch (error) {
    console.error("Error updating leave status:", error);
  }
};

  return (
    <>
    
      <div className="main-container rounded-lg   w-[80%] sm:w-[60%] p-4 bg-white shadow-2xl fixed top-[20%] left-[50%] translate-x-[-50%]">
        <div className="header flex items-center justify-between border-bottom pb-4 ">
          <div className="first-container flex items-center gap-4">
            <h1 className="font-semibold">Approved / Rejected list Details</h1>
            <p
              className={`px-3 py-1 w-[120px] text-md text-center rounded-lg font-semibold ${
                selectedLeave.status == "Rejected"
                  ? "bg-red-50 text-red-400"
                  : "bg-green-40 text-green-400"
              }`}
            >
              {selectedLeave.status}
            </p>
          </div>
          <div onClick={()=>{setOpenAdminEditModal(false); setAdminTint(false)}} className="close-btn bg-[#D9D9D9] rounded-full p-3">
            <img src={closeIcon} alt="" />
          </div>
        </div>
        <div className="container-1 flex items-start justify-between">
        <div className="body-content mt-2 ">
            <table>
                <tr>  
                    <td className="font-semibold mt-1">Employee Name :</td>
                    <td className="pl-3">{selectedLeave.user_name}</td>
                </tr>
                <tr>
                    <td className="font-semibold pt-2">Leave Date : </td>
                    <td className="pl-3">{selectedLeave.fromDate} - {selectedLeave.toDate}</td>
                </tr>
                <tr>
                    <td className="font-semibold pt-2">Requested on :</td>
                    <td className="pl-3">{selectedLeave.created_at}</td>
                </tr>
                <tr>
                    <td className="font-semibold pt-2 ">Reporting Manager :</td>
                    <td className="pl-3 pt-2">{selectedLeave.notify}</td>
                </tr>
                <tr>
                    <td className="font-semibold pt-2 ">Leave Type :</td>
                    <td className="pl-3 pt-2">{selectedLeave.leave_type}</td>
                </tr>
            </table>    
        </div>
        <button onClick={()=>{handleChangeStatus(selectedLeave)}} className="bg-[#44CF7DCC] rounded-lg mt-2 text-white text-md px-2 py-1 font-medium flex gap-1 items-center"><span><img src={editIcon} alt="" /></span> Change Status</button>
        </div>
      </div>
      {showTint ? <div className="modal-tint  fixed top-0 right-0 left-0 bottom-0"></div> : ""}
              
      {changeStatusModal ? <div className="changeStatusModal h-[260px]  fixed top-[20%] left-[50%] translate-x-[-50%] rounded-lg z-[100] w-[80%] sm:w-[60%] p-2 bg-white shadow-2xl">
                <div className="header flex items-center pb-2 justify-between border-bottom">
                  <h1 className="font-semibold">Change Status</h1>
                        <div onClick={handleCloseModal} className="close-icon w-fit p-2 rounded-full bg-[#D9D9D9]">
                          <img src={closeIcon}  />
                        </div>
                </div>
                <div className="body-container mt-2 p-3">
                    <div className="container-1 flex items-center gap-3">
                        <h1 className="font-semibold">Current Status : </h1>
                        <p className={`px-2 py-1 text-sm w-fit rounded-lg  ${selectedLeave.status == "Approved" ? "bg-green-50 text-green-400" : "text-red-400 bg-red-50"}`}>{selectedLeave.status}</p>
                    </div>   
                    <h1 className="text-md font-semibold mt-2">Need to change the status ?</h1> 
                    <div className="form-container mt-2 relative">
                     <div className="flex gap-3">
                     <input type="radio"  value="Approved"
              checked={updatedStatus === "Approved"}
              onChange={handleStatusChange} />
                     <lable className="text-lg ">Approved</lable>
                     </div>
                     <div className="flex gap-3">
                     <input type="radio"  value="Rejected"
              checked={updatedStatus === "Rejected"}
              onChange={handleStatusChange} />
                     <lable className="text-lg ">Rejected</lable>
                     </div>

                     <div className="button-section flex items-center gap-3  w-fit mt-1 absolute right-0">
                      <button onClick={handleCloseModal} className="cancel-border px-3 py-1 text-lg rounded-lg font-semibold">Cancel</button>
                      <button    onClick={handleUpdateStatus} className="bg-[#2986CE] text-white px-3 py-1 text-lg font-semibold rounded-lg">Update</button>
                     </div>
                    </div>

                </div>
      </div> : ""}
       
     
    </>
  );
};

export default AdminEditModal;
