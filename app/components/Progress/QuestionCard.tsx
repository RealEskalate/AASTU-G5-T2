import { BarChart2, ExternalLink, Plus } from "lucide-react";
import React from "react";

interface QuestionCardProps {
  id: number;
  name: string;
  difficulty: string;
  tags: string[];
  platform: string;
  link: string;
  users_solved?: number[];
}

function QuestionCard({
  name,
  difficulty,
  tags,
  platform,
  link,
  users_solved
}: QuestionCardProps) {
  // Map difficulty to colors
  const difficultyStyles: Record<string, string> = {
    Easy: "bg-green-400/20 text-green-700",
    Medium: "bg-yellow-400/20 text-yellow-700",
    Hard: "bg-red-400/20 text-red-700",
  };

  return (
    <div className="border border-gray-100 rounded-lg shadow-md px-5 py-5 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <span
            className={`rounded-md text-sm px-3 py-0.5 font-bold ${
              difficultyStyles[difficulty] || "bg-gray-200 text-gray-700"
            }`}
          >
            {difficulty}
          </span>
          <span className="font-bold text-lg">{name}</span>
        </div>
        <div className="flex gap-6">
          <div className="flex gap-2 items-center cursor-pointer">
            <Plus />
            <span>New Solution</span>
          </div>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ExternalLink />
          </a>
        </div>
      </div>
      <div className="pt-10">
        <div className="py-5">
          <span className="inline-flex gap-2 items-center bg-gray-200 text-sm rounded-full px-3 py-1 whitespace-nowrap">
            {link}
          </span>
        </div>
        <div className="flex gap-4 items-center justify-between px-2">
          <div className="w-32 flex gap-2 items-center bg-gray-200 text-sm rounded-full px-3 py-1">
            <BarChart2 />
            <span>{platform}</span>
          </div>
          <div>
            {users_solved}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
