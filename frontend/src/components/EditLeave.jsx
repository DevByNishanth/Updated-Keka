import React from "react";
import { useState } from "react";
import closeIcon from "../assets/close-icon.svg";
const EditLeave = ({ setOpenEditLeave, openEditLeave }) => {
  return (
    <>
      <div className="edit-leave-modal  font-lato  text-[#222222] fixed top-[2%] sm:top-[1%] left-[50%] translate-x-[-50%] bg-white shadow-lg rounded-lg border sm:w-[95%]  md:w-[80%] h-[96vh] max-sm:w-[95%] max-sm:h-[95%]">
        <div className="header flex items-center justify-between p-3 border-bottom">
          <h1 className="text-[20px] text-[#222222]">Apply Leave</h1>
          <div
            onClick={setOpenEditLeave(!openEditLeave)}
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
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
            <div className="time-period flex items-center gap-3 bg-gray-50 px-2 py-2 w-[300px] rounded-lg">
              <div className="full-time w-[50%]">
                <button>Full Day</button>
              </div>
              <div className="custom w-[50%]">
                <select>
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
            >
              <option value="">Select Employee</option>
              <option>SARFARAZ AHMED Ar</option>
              <option>Dr. H. Anandakumar</option>
            </select>
            <div className="button-parent-section  relative ">
              <div className="button-section w-fit absolute  right-0  flex items-center gap-4 mt-3">
                <button className="border border-gray-400 rounded-lg px-4 py-2 text-md font-semibold">
                  Cancel
                </button>
                <button className="rounded-lg px-4 py-2 border border-[#2986CE] text-md text-white bg-[#2986CE] font-semibold">
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditLeave;
