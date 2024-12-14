import React from "react";

const DashboardHolidays = () => {
  const holidays = [
    {
      id: 1,
      name: "Diwali",
      date: { month: "APR", day: "27" },
      color: "bg-[#FEA9AC]",
    },
    {
      id: 2,
      name: "Saraswathi Pooja",
      date: { month: "APR", day: "27" },
      color: "bg-[#2986CE]",
    },
    {
      id: 3,
      name: "Pongal",
      date: { month: "APR", day: "27" },
      color: "bg-[#FFD59C]",
    },
    {
      id: 4,
      name: "Christmas",
      date: { month: "APR", day: "27" },
      color: "bg-[#BFCFD7]",
    },
    {
      id: 5,
      name: "New Year",
      date: { month: "APR", day: "27" },
      color: "bg-[#72CEFC]",
    },
  ];

  return (
    <>
      {/* <div className="min-h-screen bg-gray-50 p-6"> */}
      <div className="bg-white rounded-xl hide-scrollbar h-[322px] border overflow-auto">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            List of Upcoming Holidays
          </h2>

          <div className="space-y-2">
            {holidays.map((holiday) => (
              <div
                key={holiday.id}
                className="flex items-center space-x-4 p-3 bg-[#FAFAFA] rounded-lg transition-colors duration-150"
              >
                <div
                  className={`${holiday.color} w-12 h-12 rounded-lg flex flex-col items-center justify-center text-white`}
                >
                  <span className="text-xs font-medium">
                    {holiday.date.month}
                  </span>
                  <span className="text-sm font-bold">{holiday.date.day}</span>
                </div>
                <span className="text-gray-800 font-medium">
                  {holiday.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default DashboardHolidays;
