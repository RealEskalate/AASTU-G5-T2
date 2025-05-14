import React from "react";
import { FcStatistics } from "react-icons/fc";

function FeatureCard() {
  return (
    <div className="flex flex-col justify-center gap-4 p-4 w-xs border-2 border-green-100 rounded-lg bg-white mx-auto mt-10">
      <FcStatistics />
      <h1 className="font-bold">Statistics</h1>
      <p className="text-sm text-gray-500">
        Delve into Data: Harness the Power of Comprehensive Statistical Analysis
        to Gain Deeper Insights, Uncover Trends, and Track Performance Metrics
        for Informed Decision-Making and Continuous Improvement
      </p>
    </div>
  );
}

export default FeatureCard;
