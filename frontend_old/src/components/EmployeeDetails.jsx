import React from "react";
import user from "../assets/user-quality.png";
import organizaton from "../assets/organization.svg";
import phone from "../assets/phone.svg";
import location from "../assets/location.svg";
import mail from "../assets/mail.svg";
const EmployeeDetails = () => {
  let employeeDetailsData = [
    {
      img: user,
      name: "Surya Chandran",
      designation: "Designer",
      department: "Quantum Pulse Technologies",
      location: "Sri eshwar college of engineering",
      email: "abc@gmai.com",
      phone: 1234567890,
    },
    {
      img: user,
      name: "Surya Chandran",
      designation: "Designer",
      department: "Quantum Pulse Technologies",
      location: "Sri eshwar college of engineering",
      email: "abc@gmai.com",
      phone: 1234567890,
    },
    {
      img: user,
      name: "Surya Chandran",
      designation: "Designer",
      department: "Quantum Pulse Technologies",
      location: "Sri eshwar college of engineering",
      email: "abc@gmai.com",
      phone: 1234567890,
    },
    {
      img: user,
      name: "Surya Chandran",
      designation: "Designer",
      department: "Quantum Pulse Technologies",
      location: "Sri eshwar college of engineering",
      email: "abc@gmai.com",
      phone: 1234567890,
    },
    {
      img: user,
      name: "Surya Chandran",
      designation: "Designer",
      department: "Quantum Pulse Technologies",
      location: "Sri eshwar college of engineering",
      email: "abc@gmai.com",
      phone: 1234567890,
    },
    {
      img: user,
      name: "Surya Chandran",
      designation: "Designer",
      department: "Quantum Pulse Technologies",
      location: "Sri eshwar college of engineering",
      email: "abc@gmai.com",
      phone: 1234567890,
    },
    {
      img: user,
      name: "Surya Chandran",
      designation: "Designer",
      department: "Quantum Pulse Technologies",
      location: "Sri eshwar college of engineering",
      email: "abc@gmai.com",
      phone: 1234567890,
    },
    {
      img: user,
      name: "Surya Chandran",
      designation: "Designer",
      department: "Quantum Pulse Technologies",
      location: "Sri eshwar college of engineering",
      email: "abc@gmai.com",
      phone: 1234567890,
    },
  ];
  return (
    <>
      <div className="main-container mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-3 font-lato  sm:h-[490px] overflow-auto hide-scrollbar">
        {employeeDetailsData.map((item, index) => {
          return (
            <div className="card bg-[#F5FAFD] rounded-xl p-2 ">
              <div className="header flex items-center gap-3 pb-3 border-b-2 border-gray-300">
                <img src={item.img} className="w-10" />
                <div className="content-container">
                  <h1 className="font-medium text-[20px]">{item.name}</h1>
                  <p className="text-[14px] text-[#222222]">
                    {item.designation}
                  </p>
                </div>
              </div>
              <div className="content-conainer space-y-3 p-2 mt-3">
                <div className="flex items-center gap-2">
                  <img src={organizaton} alt="" />
                  <h1 className="text-[16px] text-[#222222]">
                    {item.department}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <img src={location} alt="" />
                  <h1 className="text-[16px] text-[#222222]">
                    {item.location}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <img src={mail} alt="" />
                  <h1 className="text-[16px] text-[#222222]">{item.email}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <img src={phone} alt="" />
                  <h1 className="text-[16px] text-[#222222]">{item.phone}</h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EmployeeDetails;
