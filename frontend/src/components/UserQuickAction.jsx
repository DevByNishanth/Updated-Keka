import React from "react";
import icon1 from "../assets/icon-1.svg";
import icon2 from "../assets/icon-2.svg";
import icon3 from "../assets/icon-3.svg";

const UserQuickAction = () => {
  return (
    <>
      <div className="main-container bg-[#FCFCFC] p-2 rounded-lg">
        <div className="heading-container px-3 py-1">
          <h1 className="text-[18px] font-semibold">Quick Actions</h1>
        </div>
        <div className="button-container grid grid-cols-4 gap-2 mt-4">
          <div className="button-1 border rounded-lg px-3 py-4 text-center ">
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon1} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Leave</h1>
          </div>
          <div className="button-2 border rounded-lg px-3 py-4 text-center ">
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon2} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Leave</h1>
          </div>
          <div className="button-3 border rounded-lg px-3 py-4 text-center ">
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon3} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Leave</h1>
          </div>
          <div className="button-4 border rounded-lg px-3 py-4 text-center ">
            <div className="icon-container bg-[#F0FDF4] w-fit p-1 rounded-full m-auto">
              <img src={icon3} alt="" />
            </div>
            <h1 className="text-[12px]">Apply Leave</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserQuickAction;
