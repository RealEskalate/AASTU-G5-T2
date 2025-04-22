import React from "react";
import QuestionCard from "./QuestionCard";
// Removed unused import { div } from "framer-motion/client";

const QuestionTags = [
  "geometry",
  "algorithms",
  "greedy",
  "dynamic programming",
  "number theory",
  "array",
  "bit manipulation",
];

function DailyQuestions() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6">
        <h1 className="text-xl sm:text-2xl font-bold">Wed Nov 06 2024</h1>
        <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
          {QuestionTags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 rounded-full flex items-center px-3 py-1 text-center text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 py-10">
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6">
        <h1 className="text-xl sm:text-2xl font-bold">Thu Nov 07 2024</h1>
        <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
          {QuestionTags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 rounded-full flex items-center px-3 py-1 text-center text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 py-10">
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
      </div>
    </div>
  );
}

export default DailyQuestions;
