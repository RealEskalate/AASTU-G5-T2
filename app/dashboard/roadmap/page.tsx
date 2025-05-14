"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface RoadmapItemProps {
  title: string;
  progress: number;
  isRecommended?: boolean;
  isLast?: boolean;
}


const RoadmapItem = ({
  title,
  progress,
  isRecommended = false,
  isLast = false,
}: RoadmapItemProps) => {

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-start gap-6 relative  ">
      <div className="relative flex-shrink-0">
        {/* Progress circle */}
        <div className="w-[60px] h-[60px] rounded-full bg-gray-100 flex items-center justify-center relative">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="transparent"
              strokeWidth="8"
            />
            {progress > 0 && (
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#FFD700"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            )}
          </svg>
          <span className="text-xs font-medium">{progress}%</span>
        </div>

        {/* Vertical line connecting to next item - only show if not the last item */}
        {!isLast && (
          <div className="absolute top-[60px] left-1/2 w-px h-[60px] bg-gray-200 -translate-x-1/2"></div>
        )}
      </div>

      <div className="pt-4">
        <h3 className="text-base font-medium text-gray-700">
          {title}
          {isRecommended && (
            <span className="ml-2 text-xs font-normal text-gray-500">
              (Recommended)
            </span>
          )}
        </h3>
      </div>
    </div>
  );
};

// Update the main Roadmap component with the complete list of topics
export default function Roadmap() {
  const pathname = usePathname();

  const roadmapItems = [
    { title: "Math", progress: 18, isRecommended: true },
    { title: "Array", progress: 14, isRecommended: false },
    { title: "string", progress: 0, isRecommended: false },
    { title: "String", progress: 18, isRecommended: false },
    { title: "Union Find", progress: 67, isRecommended: false },
    { title: "Bipartite Graphs", progress: 0, isRecommended: false },
    { title: "Greedy", progress: 60, isRecommended: false },
    { title: "DP", progress: 43, isRecommended: false },
  ];

  return (
    <div className="container mx-auto p-6 w-full px-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Roadmap</h1>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-10">
        <Link href="/" className="text-gray-800 hover:underline">
          Home
        </Link>
        <span className="text-gray-400">•</span>
        <span className="text-gray-500">Roadmap</span>
      </nav>

      {/* Roadmap items */}
      <div className="space-y-6">
        {roadmapItems.map((item, index) => (
          <RoadmapItem
            key={index}
            title={item.title}
            progress={item.progress}
            isRecommended={item.isRecommended}
            isLast={index === roadmapItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
