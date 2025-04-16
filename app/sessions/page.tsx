import Link from "next/link";
import { Settings } from "lucide-react";

interface SessionProps {
  title: string;
  organizer?: string;
  groups: string[];
  timeAgo: string;
  date: string;
  timeRange: string;
  hasSettings?: boolean;
}

const Session = ({
  title,
  organizer,
  groups,
  timeAgo,
  date,
  timeRange,
  hasSettings = false,
}: SessionProps) => {
  return (
    <div className="border-t border-gray-200 py-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              Ended
            </span>
            <h2 className="text-base font-medium text-gray-800">{title}</h2>
          </div>

          {organizer && (
            <p className="text-sm text-gray-500 mb-4">{organizer}</p>
          )}

          <div className="flex flex-wrap gap-2">
            {groups.map((group, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-md"
              >
                {group}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end">
          {hasSettings && (
            <button className="text-gray-400 hover:text-gray-600 mb-2">
              <Settings className="h-5 w-5" />
            </button>
          )}
          <div className="text-right">
            <p className="text-green-600 font-medium">{timeAgo}</p>
            <p className="text-sm text-gray-600">
              {date} | {timeRange}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SessionsPage() {
  const sessions = [
    {
      title: "uytutr",
      organizer: "gufyytd",
      groups: ["AASTU Group 55", "AASTU Group 56", "AASTU Group 57"],
      timeAgo: "4d 23h 49m 19s ago",
      date: "Fri Apr 11",
      timeRange: "05:30-08:00",
      hasSettings: true,
    },
    {
      title: "Camp II <> Fun Contest",
      groups: [
        "AAIT Group 51",
        "AAIT Group 52",
        "AAIT Group 53",
        "AAIT Group 54",
        "AASTU Group 55",
        "AASTU Group 56",
        "AASTU Group 57",
        "ASTU Group 58",
        "ASTU Group 59",
      ],
      timeAgo: "158d 23h 49m 19s ago",
      date: "Fri Nov 08",
      timeRange: "05:30-08:00",
      hasSettings: false,
    },
    {
      title: "Camp II <> Practice Session and Internal Interview Contest",
      groups: [
        "AAIT Group 51",
        "AAIT Group 52",
        "AAIT Group 53",
        "AAIT Group 54",
        "AASTU Group 55",
        "AASTU Group 56",
        "AASTU Group 57",
        "ASTU Group 58",
        "ASTU Group 59",
      ],
      timeAgo: "159d 23h 49m 19s ago",
      date: "Thu Nov 07",
      timeRange: "05:30-08:00",
      hasSettings: false,
    },
    {
      title: "Camp II <> Group Contest",
      groups: [
        "AAIT Group 51",
        "AAIT Group 52",
        "AAIT Group 53",
        "AAIT Group 54",
        "AASTU Group 55",
        "AASTU Group 56",
        "AASTU Group 57",
        "ASTU Group 58",
        "ASTU Group 59",
      ],
      timeAgo: "160d 23h 49m 19s ago",
      date: "Wed Nov 06",
      timeRange: "05:30-08:00",
      hasSettings: false,
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sessions</h1>
        <div className="flex gap-4 mb-6">
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-800">
            All
          </Link>
        </div>
      </div>

      <div>
        {sessions.map((session, index) => (
          <Session
            key={index}
            title={session.title}
            organizer={session.organizer}
            groups={session.groups}
            timeAgo={session.timeAgo}
            date={session.date}
            timeRange={session.timeRange}
            hasSettings={session.hasSettings}
          />
        ))}
      </div>
    </div>
  );
}
