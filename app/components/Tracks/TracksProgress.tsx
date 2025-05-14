"use client";

import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function TracksProgress() {
  console.log(buildStyles);
  return (
    <div className="w-1/3 bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Progress</h1>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <ArrowBigUp className="text-gray-400" />
            <span>0</span>
            <ArrowBigDown className="text-gray-400" />
          </div>
          <MessageCircle className="text-gray-400" />
        </div>
      </div>

      <div className="flex justify-center items-center h-64">
        <div className="w-40 h-40">
          <CircularProgressbar
            value={75}
            text={`225`}
            styles={buildStyles({
              pathColor: "url(#gradient)",
              textColor: "#1f2937",
              trailColor: "#e5e7eb",
              textSize: "20px",
            })}
          />
          {/* Adding gradient for the path */}
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient id="gradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#00ab55" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 text-lg text-gray-500 font-semibold">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-[#00ab55] rounded-sm"></div>
          <span>Solved</span>
        </div>
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <span>165</span>
          <span>Problems</span>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4 text-lg text-gray-500 font-semibold">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-gray-200 rounded-sm"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <span>59</span>
          <span >Problems</span>
        </div>
      </div>
      <Link href={"/dashboard/progress"} className="flex justify-center items-center mb-4 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-lg py-1.5 text-center">
        Exercises
      </Link>
      <Link href={"/dashboard/problems"} className="flex justify-center items-center mb-4 border border-green-600  font-semibold text-green-600 hover:text-green-700 rounded-lg py-1.5 text-center">
        Problems
      </Link>
    </div>
  );
}

export default TracksProgress;
