import React from "react";
import TracksProgress from "./TracksProgress";
import ProgressStats from "./ProgressStat";

function Tracks() {
  return (
    <div className="px-10">
      <div className="py-5 pb-10">
        <h1 className="text-2xl font-bold">Track</h1>
        <p className="text-gray-400">All</p>
      </div>
      <TracksProgress/>
      <div className="max-w-md mx-auto mt-10">
    </div>
      <ProgressStats />
    </div>
  );
}

export default Tracks;
