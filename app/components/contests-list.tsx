import { ExternalLink, Share } from "lucide-react";

export default function ContestsList() {
  return (
    <div className="space-y-4">
      {/* Contest 1 */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              137. A2SV Remote Education Contest #9
            </h2>
            <p className="text-gray-600 mt-1">6 problems • 1d ago</p>
          </div>
          <div className="flex gap-2">
            <button className="text-green-500 hover:text-green-600">
              <Share className="h-5 w-5" />
            </button>
            <button className="text-green-500 hover:text-green-600">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contest 2 */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              136. A2SV Ghana G6 - Round #7
            </h2>
            <p className="text-gray-600 mt-1">5 problems • 3d ago • unrated</p>
          </div>
          <div className="flex gap-2">
            <button className="text-green-500 hover:text-green-600">
              <Share className="h-5 w-5" />
            </button>
            <button className="text-green-500 hover:text-green-600">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contest 3 */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              135. A2SV G6 - Round #9 | Adwa Special
            </h2>
            <p className="text-gray-600 mt-1">6 problems • 8d ago</p>
          </div>
          <div className="flex gap-2">
            <button className="text-green-500 hover:text-green-600">
              <Share className="h-5 w-5" />
            </button>
            <button className="text-green-500 hover:text-green-600">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contest 4 */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              134. A2SV Ghana G6 - Round #6
            </h2>
            <p className="text-gray-600 mt-1">5 problems • 9d ago</p>
          </div>
          <div className="flex gap-2">
            <button className="text-green-500 hover:text-green-600">
              <Share className="h-5 w-5" />
            </button>
            <button className="text-green-500 hover:text-green-600">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Contest 5 */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              133. A2SV Ghana G6 - Round #6
            </h2>
            <p className="text-gray-600 mt-1">5 problems • 9d ago</p>
          </div>
          <div className="flex gap-2">
            <button className="text-green-500 hover:text-green-600">
              <Share className="h-5 w-5" />
            </button>
            <button className="text-green-500 hover:text-green-600">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Contest 4 */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              132. A2SV Ghana G6 - Round #6
            </h2>
            <p className="text-gray-600 mt-1">5 problems • 9d ago</p>
          </div>
          <div className="flex gap-2">
            <button className="text-green-500 hover:text-green-600">
              <Share className="h-5 w-5" />
            </button>
            <button className="text-green-500 hover:text-green-600">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
