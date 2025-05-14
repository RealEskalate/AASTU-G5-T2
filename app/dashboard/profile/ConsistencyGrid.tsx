"use client";

import React from "react";

const days = ["Mon", "Wed", "Fri"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const generateData = () => {
  const data = [];
  for (let i = 0; i < 53; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      week.push(Math.floor(Math.random() * 5)); // random activity (0-4)
    }
    data.push(week);
  }
  return data;
};

const activityColors = [
  "bg-gray-200", // 0 activity
  "bg-green-100", // low
  "bg-green-300", // medium
  "bg-green-500", // high
  "bg-green-700", // very high
];

const ConsistencyGrid = () => {
  const data = generateData();

  return (
    <div className="w-full py-6 border border-gray-200 rounded-lg  bg-white p-4">
      <h2 className="text-lg font-semibold pb-5">Consistency</h2>

      {/* Months Labels */}
      <div className="flex justify-between  mb-2 space-x-6 text-xs text-gray-500">
        {months.map((month, index) => (
          <div key={index} className="w-12 text-center">{month}</div>
        ))}
      </div>

      {/* Grid + Days */}
      <div className="flex">
        {/* Days Column */}
        <div className="flex flex-col justify-between mr-2 h-[120px]">
          {days.map((day, index) => (
            <div key={index} className="text-xs text-gray-500">{day}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="overflow-x-auto">
          <div className="flex space-x-1">
            {data.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col space-y-1">
                {week.map((dayActivity, dayIdx) => (
                  <div
                    key={dayIdx}
                    className={`w-4 h-4 ${activityColors[dayActivity]}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ConsistencyGrid;
