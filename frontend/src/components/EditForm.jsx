import React, { useEffect, useState } from "react";
import closeIcon from "../assets/close-icon.svg";

const EditForm = ({ leave, onRequestUpdate, onClose, setopenEditFormModalFinal, openEditFormModalFinal }) => {
  const [selectedTime, setSelectedTime] = useState(
    leave.timePeriod || "fullDay"
  );
  const [formData, setFormData] = useState({
    fromDate: leave.fromDate,
    toDate: leave.toDate,
    leaveType: leave.leave_type,
    notes: leave.notes,
    // status: leave.status,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gather updated leave data from form fields
    const updatedLeave = {
      leave_id: leave.leave_id, // Include the leave ID
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      leave_type: formData.leaveType,
      notes: formData.notes,
      // status: formData.status, // Ensure this property is defined or updated as needed
      timePeriod: selectedTime, // Include if you need this information
    };
    console.log(updatedLeave.leave_id)

    onRequestUpdate(updatedLeave);
  };

  return (
    <>
      <div className="leave-apply-modal font-lato text-[#222222] fixed top-[2%] sm:top-[1%] left-[50%] translate-x-[-50%] bg-white shadow-lg rounded-lg border sm:w-[95%] md:w-[80%] h-[96vh] max-sm:w-[95%] max-sm:h-[95%]">
        <div className="header flex items-center justify-between p-3 border-bottom">
          <h1 className="text-[20px] text-[#222222]">Apply Leave</h1>
          <div onClick={handleSubmit} className="close-icon bg-[#D9D9D9] px-[10px] py-[10px] rounded-full w-fit cursor-pointer">
            <img src={closeIcon} alt="Close" />
          </div>
        </div>
        <div className="form max-sm:mt-0 px-2 sm:p-6">
          <div className="form-header grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="from-date">
              <label htmlFor="fromDate" className="text-md">
                From
              </label>
              <br />
              <input
                type="date"
                className="rounded-lg mt-1 outline-none border w-full border-gray-800 py-2 sm:py-2 px-4 text-md"
                name="fromDate"
                value={formData.fromDate}
                onChange={(e) =>
                  setFormData({ ...formData, fromDate: e.target.value })
                }
              />
            </div>
            <div className="to-date">
              <label htmlFor="toDate" className="text-md">
                To
              </label>
              <br />
              <input
                type="date"
                className="rounded-lg mt-1 w-full outline-none border border-gray-800 py-2 sm:py-2 px-4 text-md"
                name="toDate"
                value={formData.toDate}
                onChange={(e) =>
                  setFormData({ ...formData, toDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-body-content mt-2 sm:space-y-2">
            <label htmlFor="leaveType" className="text-md">
              Select Leave Type
            </label>
            <br />
            <select
              name="leaveType"
              id="leaveType"
              className="mt-1 border outline-none w-[100%] bg-transparent sm:py-2 py-2 px-2 sm:px-4 text-md rounded-lg border-gray-800"
              value={formData.leaveType}
              onChange={(e) =>
                setFormData({ ...formData, leaveType: e.target.value })
              }
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
                  name="timePeriod"
                  className={`w-full px-3 py-1 rounded-lg outline-none ${
                    formData.timePeriod === "firstHalf" ||
                    formData.timePeriod === "secondHalf"
                      ? "bg-white shadow-sm text-black"
                      : "text-gray-500"
                  }`}
                  value={formData.timePeriod}
                  onChange={(e) =>
                    setFormData({ ...formData, timePeriod: e.target.value })
                  }
                >
                  <option value="custom">Custom</option>
                  <option value="firstHalf">First Half</option>
                  <option value="secondHalf">Second Half</option>
                </select>
              </div>
            </div>
            <div className="notes-section mt-4">
              <label htmlFor="notes" className="text-md">
                Notes
              </label>
              <br />
              <textarea
                name="notes"
                className="w-[100%] outline-none border border-gray-800 rounded-lg px-2 sm:px-4 text-sm py-2 sm:py-2 sm:mt-2"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              ></textarea>
            </div>
            <label htmlFor="notify" className="text-md">
              Notify
            </label>
            <br />
            <select
              name="notify"
              id="notify"
              className="border border-black w-[100%] px-2 sm:px-4 py-2 sm:py-2 text-md rounded-lg mt-1"
              value={formData.notify}
              onChange={(e) =>
                setFormData({ ...formData, notify: e.target.value })
              }
            >
              <option value="">Select Reporting Manager</option>
              <option>SARFARAZ AHMED A</option>
              <option>Dr. H. Anandakumar</option>
            </select>
            <div className="button-parent-section relative">
              <div className="button-section w-fit absolute right-0 flex items-center gap-4 mt-3">
                <button onClick={handleSubmit} className="border border-gray-400 rounded-lg px-4 py-2 text-md font-semibold">
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="rounded-lg px-4 py-2 border border-[#2986CE] text-md text-white bg-[#2986CE] font-semibold"
                >
                  Edit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditForm;
