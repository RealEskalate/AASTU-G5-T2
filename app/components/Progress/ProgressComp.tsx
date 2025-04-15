import { Dot } from "lucide-react";
import React from "react";
import { Progress } from "@/components/ui/progress";
import TeamCompletion from "./TeamComplition";
import Progressbar from "./Progressbar";
import DailyQuestions from "./DailyQuestions";

function ProgressComp() {
  return (
    <div className="px-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">Exercises</span>
          <div className="flex items-center gap-2">
            <span>Track</span>
            <Dot />
            <span className="text-gray-400">Progress</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <select
            name=""
            id=""
            className="border border-gray-300 rounded-md p-2 flex items-center p-2 "
          >
            <option value="">Expanded</option>
            <option value="">Compact</option>
          </select>

          <select
            name=""
            id=""
            className="border border-gray-300 rounded-md p-2 w-15"
          >
            <option value="">All</option>
            <option value="">Solved</option>
            <option value="">Unsolved</option>
          </select>
        </div>
      </div>
      <Progressbar />
      <TeamCompletion />
      <DailyQuestions/>
    </div>
  );
}

export default ProgressComp;
