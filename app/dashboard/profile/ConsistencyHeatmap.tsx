'use client';

import { useState } from 'react';

type AttendanceDay = {
  date: string;
  status: 'present' | 'excused' | 'absent';
};

const attendanceData: AttendanceDay[] = Array.from({ length: 288 }, (_, i) => {
  const status =
    i === 10 || i === 42 || i === 105 || i === 220 || i === 260
      ? 'excused'
      : 'present';
  return {
    date: `2025-${Math.floor(i / 30) + 1}-${(i % 30) + 1}`,
    status,
  };
});

export default function ConsistencyAndAttendance() {
  const [showDetail, setShowDetail] = useState(false);

  const colorMap = {
    present: 'bg-green-500',
    excused: 'bg-yellow-400',
    absent: 'bg-red-500',
  };

  const absentCount = attendanceData.filter(d => d.status === 'absent').length;
  const excusedCount = attendanceData.filter(d => d.status === 'excused').length;
  const presentCount = attendanceData.filter(d => d.status === 'present').length;
  const total = attendanceData.length;
  const percentage = Math.round((presentCount / total) * 100);

  return (
    <div className="px-6 py-4 space-y-6 bg-white shadow rounded-2xl">
      {/* Consistency Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Consistency</h2>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            2025 <span className="rotate-90">⌵</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-1">
            {Array.from({ length: 53 }).map((_, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIdx) => (
                  <div
                    key={dayIdx}
                    className="w-4 h-4 bg-gray-200 rounded-sm"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
          <div className="w-4 h-4 bg-gray-200 rounded-sm" />
          <div className="w-4 h-4 bg-green-100 rounded-sm" />
          <div className="w-4 h-4 bg-green-300 rounded-sm" />
          <div className="w-4 h-4 bg-green-500 rounded-sm" />
          <div className="w-4 h-4 bg-green-700 rounded-sm" />
        </div>
      </div>

      {/* Attendance Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Attendance</h2>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            Show detail
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={showDetail}
              onChange={() => setShowDetail(prev => !prev)}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-1">
          {attendanceData.map((day, idx) => (
            <div
              key={idx}
              className={`w-4 h-4 rounded-sm ${colorMap[day.status]}`}
              title={`${day.date} - ${day.status}`}
            />
          ))}
        </div>

        <div className="mt-2 text-sm text-gray-700">
          Absent: <strong>{absentCount}</strong> | Excused: <strong>{excusedCount}</strong> | Present: <strong>{presentCount}</strong> | <strong>{percentage}%</strong>
        </div>
      </div>
    </div>
  );
}