import ProblemCard from "../components/Problem";
export default function ExercisesPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header row with Exercises title and dropdown buttons */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Exercises</h1>
        <div className="flex gap-3">
          <div className="relative inline-block">
            <button className="flex items-center justify-between min-w-[120px] px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm">
              <span>Expanded</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
          <div className="relative inline-block">
            <button className="flex items-center justify-between min-w-[80px] px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm">
              <span>All</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Navigation tabs */}
      <div className="mb-8">
        <nav className="flex border-b border-gray-200">
          <button className="px-4 py-2 text-sm font-medium text-gray-800 border-b-2 border-gray-800">
            Tracks
          </button>
          <div className="flex items-center px-4 py-2">
            <span className="text-gray-300 mx-1">•</span>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-gray-400">
            Progress
          </button>
        </nav>
      </div>
      {/* Personal Completion section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Personal Completion
        </h2>

        <div className="h-8 bg-[#e6f7e6] rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-[#5cdb5c] rounded-full"
            style={{ width: "83%" }}
          ></div>
        </div>

        <div className="text-center text-lg mb-12">
          <span className="font-medium">224 Exercises</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="font-medium">187 Solved</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="font-medium">83% Completion</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="font-medium">37 Available</span>
        </div>
      </div>
      {/* Detail Team Completion section */}
      <div className="border-t border-gray-200 pt-4">
        <button className="w-full flex justify-between items-center py-4 text-left">
          <h3 className="text-base font-medium text-gray-800">
            Detail Team Completion
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
      {/* Date and Tags section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-base font-medium text-gray-800 mb-6">
          Wed Nov 06 2024
        </h3>

        <div className="flex flex-wrap gap-3 m-3">
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            geometry
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            constructive algorithms
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            greedy
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            number theory
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            Array
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            Bit Manipulation
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            Brainteaser
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2  gap-4">
        <div className="col-span-1">
          <ProblemCard />
        </div>
        <div className="col-span-1">
          <ProblemCard />
        </div>
        <div className="col-span-1">
          <ProblemCard />
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-base font-medium text-gray-800 mb-6">
          Thu Nov 07 2024
        </h3>

        <div className="flex flex-wrap gap-3 m-3">
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            geometry
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            constructive algorithms
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            greedy
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            number theory
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            Array
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            Bit Manipulation
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-800 text-xs">
            Brainteaser
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2  gap-4">
        <div className="col-span-1">
          <ProblemCard />
        </div>
        <div className="col-span-1">
          <ProblemCard />
        </div>
        <div className="col-span-1">
          <ProblemCard />
        </div>
      </div>
    </div>
  );
}
