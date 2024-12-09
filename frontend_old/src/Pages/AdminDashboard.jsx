import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import userImg from "../assets/user-1.png";

const AdminDashboard = () => {
  const leaveRequest = [
    {
      id: 1,
      img: userImg,
      name: "Himanshu",
      leaveFrom: "10 May 2024",
      leaveTo: "20 May 2024",
      leaveType: "Casual Leave",
    },
    {
      id: 3,
      img: userImg,
      name: "Himanshu",
      leaveFrom: "10 May 2024",
      leaveTo: "20 May 2024",
      leaveType: "Casual Leave",
    },
    {
      id: 4,
      img: userImg,
      name: "Himanshu",
      leaveFrom: "10 May 2024",
      leaveTo: "20 May 2024",
      leaveType: "Casual Leave",
    },
    {
      id: 2,
      img: userImg,
      name: "Surya Chandran",
      leaveFrom: "10 May 2024",
      leaveTo: "20 May 2024",
      leaveType: "Casual Leave",
    },
    // Add more leave requests...
  ];

  const handleClick = async (leaveData, status) => {
    try {
      const payload = {
        ...leaveData,
        status, // Add status ("Approved" or "Rejected")
      };

      // Log leaveData and full payload for debugging
      //   console.log("Leave Data:", leaveData);
      console.log("Payload to be sent:", payload);

      const response = await axios.delete(
        "https://your-endpoint.com/api/leaves",
        payload
      );

      if (response.status === 200) {
        console.log(`Leave request ${status}:`, payload);
        // Optionally, update the UI or show a success message
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="leave-request-container font-lato mt-2 grid gap-3 md:grid-cols-4 sm:grid-cols-3">
        {leaveRequest.map((item) => (
          <div key={item.id} className="card p-2 rounded-lg border">
            <div className="header flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={item.img} alt="" />
                <p className="font-semibold text-md">{item.name}</p>
              </div>
              <div className="button-section flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full w-fit">
                <button
                  className="tick"
                  onClick={() => handleClick(item, "Approved")}
                >
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
                </button>
                <button
                  className="decline"
                  onClick={() => handleClick(item, "Rejected")}
                >
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
                </button>
              </div>
            </div>
            <table className="mt-2 font-normal text">
              <tr>
                <td className="">Leave Date : </td>
                <td>
                  {item.leaveFrom} - {item.leaveTo}
                </td>
              </tr>
              <tr className="mt-2">
                <td className="pr-2">Leave Type : </td>
                <td>{item.leaveType}</td>
              </tr>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;