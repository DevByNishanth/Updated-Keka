import React, { useState } from "react";
import MyDetailsSidebar from "../components/MyDetailsSidebar";
import LeaveList from "../components/LeaveList";
import LeaveListTable from "../components/LeaveListTable";
import Navbar from "../components/Navbar";

const MyDetails = () => {
  const [showTint, setShowTint] = useState(false);
  return (
    <>
    <Navbar/>
      <div className=" mt-1 sm:mt-4 flex gap-14 ">
        {showTint ? (
          <div className="modal-tint fixed top-0 right-0 left-0 bottom-0 h-200vh"></div>
        ) : (
          ""
        )}
        <MyDetailsSidebar />
        <LeaveList showTint={showTint} setShowTint={setShowTint} />
      </div>
    </>
  );
};

export default MyDetails;
