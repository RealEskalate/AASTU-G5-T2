export default function ProblemCard() {
  return (
    <div className="p-6 max-w-xl my-4 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        {/* Header section with difficulty, title and action buttons */}
        <div className="flex items-center">
          <div className="flex items-center gap-4">
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
              Hard
            </span>
            <h2 className="text-xl font-bold text-gray-800">
              Number of Parallelograms
            </h2>
          </div>
          <div className="flex-1 min-w-[30px]"></div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-gray-800 font-medium">
              {/* Plus icon SVG */}
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
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span>New Solution</span>
            </button>
            <button className="text-gray-500 p-1">
              {/* External Link icon SVG */}
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
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tags section */}
        <div className="flex flex-col gap-2">
          <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm w-fit">
            geometry
          </span>
          <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm flex items-center gap-1 w-fit">
            {/* Bar Chart icon SVG */}
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
              className="text-gray-500"
            >
              <rect x="3" y="8" width="4" height="12" rx="1" />
              <rect x="10" y="4" width="4" height="16" rx="1" />
              <rect x="17" y="12" width="4" height="8" rx="1" />
            </svg>
            codeforces
          </span>
        </div>
      </div>
    </div>
  );
}
