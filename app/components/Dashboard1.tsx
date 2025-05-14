import React from "react";
export default function Dashboard1() {
  return (
    <div className="flex flex-col md:flex-row gap-3 p-2">
      {/* Solutions Card */}
      <div className="bg-white rounded-lg shadow-lg p-4 pb-6 flex-1 min-h-[140px]">
        <h3 className="text-sm font-medium text-gray-800 mb-2">Solutions</h3>
        <div className="flex items-center mb-2">
          <div className="bg-green-100 rounded-full p-1 mr-1.5">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
          <span className="text-xs text-gray-700 font-medium">0.0%</span>
        </div>
        <div className="text-3xl font-semibold text-gray-900 mt-3">577</div>
      </div>

      {/* Time Spent Card */}
      <div className="bg-white rounded-lg shadow-lg p-4 pb-6 flex-1 min-h-[140px]">
        <h3 className="text-sm font-medium text-gray-800 mb-2">Time Spent</h3>
        <div className="flex items-center mb-2">
          <div className="bg-green-100 rounded-full p-1 mr-1.5">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
          <span className="text-xs text-gray-700 font-medium">0.0%</span>
        </div>
        <div className="mt-3">
          <div className="text-3xl font-semibold text-gray-900">
            14,378
            <span className="text-xs font-normal text-gray-500 ml-0.5">
              (min)
            </span>
          </div>
          <div className="text-xs text-gray-500">That's 9 Days</div>
        </div>
      </div>

      {/* Rating Card */}
      <div className="bg-white rounded-lg shadow-lg p-4 pb-6 flex-1 min-h-[140px]">
        <h3 className="text-sm font-medium text-gray-800 mb-2">Rating</h3>
        <div className="flex items-center mb-2">
          <div className="bg-green-100 rounded-full p-1 mr-1.5">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
          <span className="text-xs text-gray-700 font-medium">0.0%</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="text-3xl font-semibold text-gray-900">1,522</div>
          <div className="h-8 flex items-end">
            <div className="w-0.5 h-2 bg-gray-200 mx-0.5 rounded-t"></div>
            <div className="w-0.5 h-3 bg-gray-200 mx-0.5 rounded-t"></div>
            <div className="w-0.5 h-2.5 bg-gray-200 mx-0.5 rounded-t"></div>
            <div className="w-0.5 h-4 bg-gray-200 mx-0.5 rounded-t"></div>
            <div className="w-0.5 h-5 bg-gray-200 mx-0.5 rounded-t"></div>
            <div className="w-0.5 h-6 bg-red-500 mx-0.5 rounded-t"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
