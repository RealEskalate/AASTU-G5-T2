import { div } from "framer-motion/client";
import {
  ArrowBigDown,
  ArrowBigUp,
  Clock,
  ExternalLink,
  Link,
  Plus,
} from "lucide-react";
import React from "react";

function DailyProblem() {
  return (
    <div className="">
      <div className="flex flex-col px-10 py-5 bg-green-100 shadow-sm rounded-xl ">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center justify-between ">
              <span className="text-lg md:text-xl font-bold py-1">Daily problem</span>
              <Clock className="text-gray-400 text-md" />
            </div>
            <div className="flex gap-1 items-center justify-between">
              <ArrowBigUp className="text-gray-400" />
              <span>0</span>
              <ArrowBigDown className="text-gray-400" />
            </div>
          </div>

          <span>Refreshes every 24 hours and needs to be solved today!</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between py-5">
          <div className="w-full lg:w-[40%]">
            <div className="flex flex-col gap-2 py-6">
              <span className="font-bold text-lg md:text-xl">
                All Paths From Source to Target
              </span>
              <span className="font-semibold text-md md:text-lg">LeetCode · Medium · DFS</span>
            </div>
            <div className="w-full py-5">
              <div className="flex justify-center border-1 border-green-200 rounded-lg px-4 py-2 hover:bg-green-200 transition-all duration-300">
                <button className=" flex gap-2 items-center jusify-center ">
                  <ExternalLink className="w-4 h-4" />
                  <span>Solve It Now</span>
                </button>
              </div>
              <div className="flex justify-center  rounded-lg px-4 py-2 hover:bg-green-200 transition-all duration-300 ">
                <button className="flex gap-2 items-center jusify-center ">
                  <Plus size={20} />
                  <span>New Solution</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col  items-center justify-center py-2">
            <span className="font-semibold text-4xl">133</span>
            <span>Solved it</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyProblem;
