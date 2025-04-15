import { BarChart, BarChart2, ExternalLink, Plus } from "lucide-react";
import React from "react";


function QuestionCard() {
  return (
    <div className="border border-gray-100 rounded-lg shadow-md px-5 py-5 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className="bg-red-400/20 rounded-md text-sm px-3 py-0.5 font-bold text-red-700 items-center">
            Hard
          </span>
          <span className="font-bold text-lg">Number of Parallelograms</span>
        </div>
        <div className="flex gap-6">
          <div className="flex gap-2">
            <Plus />
            <span>New Solution</span>
          </div>
          <ExternalLink />
        </div>
      </div>
      <div className="pt-10">
        <div className=" py-5">
          <span className="w-20 flex gap-2 items-center  bg-gray-200 text-sm items-center rounded-full px-3 py-1">
            geometry
          </span>
        </div>
        <div className="w-32 flex gap-2 items-center  bg-gray-200 text-sm items-center rounded-full px-3 py-1">
          <BarChart2 />
          <span className="">codeforces</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
