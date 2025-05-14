import { Progress } from "@/components/ui/progress";
import React from "react";

function Progressbar() {
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <span className="text-2xl font-semibold">Personal Completion</span>
      <Progress value={90} isTeam={false} />
      <div className="flex items-center gap-2 text-lg">
        <span>225 Exercises </span>
        <span>|</span>
        <span>166 Solved</span>
        <span>|</span>
        <span>74% Completion</span>
        <span>|</span>
        <span>59 Available</span>
      </div>
    </div>
  );
}

export default Progressbar;