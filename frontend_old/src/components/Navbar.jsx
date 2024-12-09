import React, { useState, useEffect, useRef } from "react";
import dashboard from "../assets/dashboard.svg";
import feeds from "../assets/feed.svg";
import organization from "../assets/organization.svg";
import profile from "../assets/user.svg";
import team from "../assets/team.svg";
import userImg from "../assets/user-quality.png";
import search from "../assets/search.png";
import bell from "../assets/bell.svg";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef(null);

  function handleSidebar() {
    setOpenSidebar(!openSidebar);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="main-container w-[100%] font-lato hidden sm:flex items-center py-1 gap-2 justify-between ">
        <div className="logo-container flex gap-3 items-center bg-[#fafafa] text-center w-[200px] rounded-full py-1">
          <h1 className=" text-xl font-semibold px-8 py-2 md:px-6 md:py-[10px] sm:text-[18px] md:text-[21px] lg:text-[20px] xl:px-12 xl:py-2  md:font-medium  xl:text-[24px] m-auto">
            LOGO
          </h1>
        </div>
        <div className="navlink-container flex gap-6 items-center bg-[#fafafa] sm:text-[14px] md:text-[12px] lg:text-[12px]  xl:text-[14px] text-[#222222] px-6 py-4 rounded-full">
          <div className="link flex items-center gap-1">
            <img src={dashboard} className="w-[20px]" />
            <p>Dashboard</p>
          </div>
          <div className="link flex items-center gap-1">
            <img src={feeds} className="w-[20px]" />
            <p>Feeds</p>
          </div>
          <NavLink to="/MyDetails">
            <div className="link flex items-center gap-1">
              <img src={profile} className="w-[20px]" />
              <p>My Details</p>
            </div>
          </NavLink>
          <div className="link flex items-center gap-1">
            <img src={team} className="w-[20px]" />
            <p>
              My Team <span className="hidden ">Details</span>
            </p>
          </div>
          <div className="link flex items-center gap-1">
            <img src={organization} className="w-[20px]" />
            <p>Organization Details</p>
          </div>
        </div>
        <div className="search-container hidden lg:flex items-center gap-3 bg-[#fafafa] px-3 lg:py-3 xl:py-3 rounded-full ">
          <div className="searchbox flex items-center bg-white px-2 rounded-full">
            <img src={search} alt="" />
            <input
              type="text"
              placeholder="search here.."
              className="outline-none w-[100%]  lg:text-sm xl:text-[16px]  px-3 py-2 rounded-full"
            />
          </div>
          <div className="bell-icon-container gray-border p-2 w-fit rounded-full px-[10px] bg-white">
            <img src={bell} className="w-4" />
          </div>
          <img src={userImg} className="lg:w-[25px] xl:w-[35px]" />
        </div>
      </div>

      <div className="resp-navbar sm:hidden w-[100%] flex items-center justify-between font-lato sticky top-0 py-2 bg-white">
        <div className="first-container flex items-center gap-3">
          <div className="icon-container cursor-pointer" onClick={handleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </div>
          <h1 className="text-[22px] font-semibold bg-[#F5FAFD] px-6 rounded-full py-1">
            Logo
          </h1>
        </div>
        <div className="second-container flex items-center gap-3">
          <div className="bell-icon-container gray-border py-2  px-2 w-fit rounded-full bg-white">
            <img src={bell} className="w-[20px]" />
          </div>
          <img src={userImg} className="w-[35px]" />
        </div>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar md:hidden w-[240px] bg-[#F5FAFD] h-[100vh] absolute left-0 top-0 p-4 transition-all ${
          openSidebar ? "transform-none" : "transform -translate-x-full"
        }`}
      >
        <div className="close-container relative">
          <div className="close-icon absolute right-0 cursor-pointer" onClick={handleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
        </div>
        <div className="navlink-container space-y-5 bg-[#F5FAFD] mt-8">
          <div className="link flex items-center gap-3 hover:bg-gray-100 py-2 px-3">
            <img src={dashboard} alt="" />
            <p>Dashboard</p>
          </div>
          <div className="link flex items-center gap-3 hover:bg-gray-100 py-2 px-3">
            <img src={feeds} alt="" />
            <p>Feeds</p>
          </div>
          <div className="link flex items-center gap-3 hover:bg-gray-100 py-2 px-3">
            <img src={profile} alt="" />
            <p>My Details</p>
          </div>
          <div className="link flex items-center gap-3 hover:bg-gray-100 py-2 px-3">
            <img src={team} alt="" />
            <p>My Team Details</p>
          </div>
          <div className="link flex items-center gap-3 hover:bg-gray-100 py-2 px-3">
            <img src={organization} alt="" />
            <p>Organization Details</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
