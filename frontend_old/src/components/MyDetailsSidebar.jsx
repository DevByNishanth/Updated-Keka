import React from "react";
import user from "../assets/user-1.png";
import { NavLink } from "react-router-dom";
const MyDetailsSidebar = () => {
  const myDetails = { name: "Surya Chandran", img: user };

  return (
    <>
      <div className="main-container max-sm:hidden border border-gray-200 rounded-lg p-2 w-[250px] h-[82vh] font-lato">
        <div className="header text-center pb-3 border-bottom mt-1">
          <h1 className="text-[#222222] text-[20px]">{myDetails.name}</h1>
          <img src={user} className="m-auto mt-2" />
        </div>
        <div className="links text-center mt-4 flex flex-col gap-4 items-center">
          <NavLink className="text-[16px] text-[#222222] w-[160px]  px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE] ">
            Attendence
          </NavLink>
          <NavLink
            to="MyDetails/Leaves"
            className="text-[16px] w-[160px]   px-5 py-1 hover:bg-[#F5FAFD] bg-[#F5FAFD] rounded-lg text-[#2986CE]"
          >
            Leaves
          </NavLink>
          <NavLink className="text-[16px] text-[#222222] w-[160px]  px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE]">
            Performance
          </NavLink>
          <NavLink className="text-[16px] text-[#222222] w-[160px]  px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE]">
            Expense & Travel
          </NavLink>
          <NavLink className="text-[16px] text-[#222222] w-[160px]  px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE]">
            Tickets
          </NavLink>
          <NavLink className="text-[16px] text-[#222222] w-[160px]  px-5 py-1 hover:bg-[#F5FAFD] hover:text-[#2986CE]">
            Finance
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MyDetailsSidebar;
