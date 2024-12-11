import React from "react";
import closeIcon from "../assets/close-icon.svg";
const AdminEditModal = ({
  setOpenAdminEditModal,
  setAdminTint,
  selectedLeave,
}) => {
  return (
    <>
      <div className="main-container rounded-lg   w-[80%] sm:w-[60%] p-4 bg-white shadow-lg fixed top-[20%] left-[50%] translate-x-[-50%]">
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
      </div>
    </>
  );
};

export default AdminEditModal;
