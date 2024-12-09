import React from "react";
import closeIcon from "../assets/close-icon.svg";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import axios from "axios";
const LeaveDetailsModal = ({
  leave,
  onClose,
  setShowTint,
  handleDeleteLeave,
  
}) => {
  function removeTint() {
    setShowTint(false);
  }
  function handleRemoveTint() {
    setShowTint(false);
  }
  function handleDelete(){
    const createdAt = new Date(leave.created_at); // assuming leave.created_at is a valid timestamp string
    const formattedFromDate = createdAt.toISOString().slice(0, 19).replace("T", " ");
    console.log("Formated date : ", formattedFromDate);
    
    const leaveData = {
      user_id: leave.user_id,
      fromDate: leave.fromDate,
      toDate: leave.toDate,
      leave_type: leave.leave_type,
      notes: leave.notes || "No Notes Mentioned",
      notify: leave.notify,
      created_at: formattedFromDate,
      time_period:leave.time_period
    };  
    console.log("leave_delete", leaveData) 
    const token = localStorage.getItem("jwtToken");
    console.log("TOKEN:",token)
    // if (!token) {
    //   console.error("No token found, user is not authenticated.");
    axios
      .delete("http://127.0.0.1:8000/api/leave/delete/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  
        },
      })
      .then((response) => {
        console.log("Leave details deleted:", response.data);
        // Close the modal and remove the tint after successful deletion

        onClose();
        removeTint();
       
        // Call the parent function to remove the leave from local state
        handleDeleteLeave(leave.id);
      })
      .catch((error) => {
        console.error("Error deleting leave:", error);
      });
  }
  return (
    <>
      <div className="fixed main-container font-lato max-sm:h-[fit] w-[95%] md:w-[70%] top-[10%] sm:top-[20%] left-[50%] translate-x-[-50%] py-4 bg-white shadow-lg border rounded-lg">
        <div className="header w-[100%] px-5 flex justify-between border-bottom pb-5 ">
          <div className="header-1 md:flex items-center gap-4">
            <h1 className="font-semibold text-2xl">Leave Details</h1>
            <p
              className={`w-fit px-2 py-1 text-md rounded-lg max-sm:mt-2 ${
                leave.status == "Pending" ? "text-yellow-500 bg-[#FEF4E8]" : ""
              } ${
                leave.status == "Rejected" ? "text-red-500 bg-[#FCEAEE]" : ""
              } ${
                leave.status == "Approved" ? "text-green-500 bg-[#F3FCF7]" : ""
              } `}
            >
              {leave.status}
            </p>
          </div>
          <div className="close-button">
            <button
              onClick={() => {
                onClose();
                handleRemoveTint();
              }}
              className="bg-[#D9D9D9] px-2 py-2 rounded-full"
            >
              <img src={closeIcon} alt="" />
            </button>
          </div>
        </div>
        <div className="body-content p-5 md:flex items-start justify-between">
          <div className="content-section">
            <table className="">
              <tr>
                <td className="pr-4 text-lg">Leave Date :</td>
                <td className="pl-4 text-lg">
                  {leave.fromDate} {"   "} to  {leave.toDate}
                </td>
              </tr>
              <tr className="">
                <td className="pr-4 pt-3 text-lg">Leave Type :</td>
                <td className="pl-4 pt-3 text-lg">{leave.leave_type} {leave.user_id}</td>
              </tr>
              <tr className="">
                <td className="pr-4 pt-3 text-lg">Notes :</td>
                <td className="pl-4 pt-3 text-lg">
                  {leave.notes || "No Notes Mentioned"}
                </td>
              </tr>
              <tr className="">
                <td className="pr-4 pt-3 text-lg">Approved By :</td>
                <td className="pl-4 pt-3 text-lg">{leave.notify}</td>
              </tr>
              <tr className="">
                <td className="pr-4 pt-3 text-lg">Approvedd on :</td>
                <td className="pl-4 pt-3 text-lg">{leave.fromDate}</td>
              </tr>
            </table>
          </div>
          <div className="button-section flex items-center gap-3 max-sm:mt-2">
            <button className="edit-btn bg-[#44CF7DCC] h-[40px] flex items-center w-[50%] md:w-[100px] rounded-lg">
              <span className="flex gap-2 m-auto items-center text-white font-semibold text-lg ">
                <img src={editIcon} alt="" />
                Edit
              </span>
            </button>
            <button
              onClick={() => {
             handleDelete();
                onClose();
                removeTint();
              }}
              className="edit-btn bg-[#ED6C83] h-[40px] flex items-center w-[50%] md:w-[100px] rounded-lg"
            >
              <span className="flex gap-2 m-auto items-center text-white font-semibold text-lg ">
                <img src={deleteIcon} alt="" />
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveDetailsModal;
