"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import { fetchSessions, clearError } from '@/redux/slices/sessionsSlice'; // Adjust path
import { RootState, AppDispatch } from '@/redux/store'; // Adjust path

// Define SessionProps for the Session component
interface SessionProps {
  title: string;
  organizer?: string;
  groups: string[];
  timeAgo: string;
  date: string;
  timeRange: string;
  hasSettings?: boolean;
}

// Session component
const Session: React.FC<SessionProps> = ({
  title,
  organizer,
  groups,
  timeAgo,
  date,
  timeRange,
  hasSettings = false,
}) => {
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

// SessionsPage component
const SessionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sessions, status, error } = useSelector((state: RootState) => state.sessions);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSessions());
    }
  }, [dispatch, status]);

  // Function to format time ago
  const getTimeAgo = (date: string): string => {
    const now = new Date();
    const sessionDate = new Date(date);
    const diffMs = now.getTime() - sessionDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffDays}d ${diffHrs}h ${diffMins}m ago`;
  };

  // Function to format date
  const formatDate = (start: string): string => {
    const date = new Date(start);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Function to format time range
  const formatTimeRange = (start: string, end: string): string => {
    const startTime = new Date(start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const endTime = new Date(end).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${startTime}-${endTime}`;
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return (
    <div>
      Error: {error}{' '}
      <button onClick={() => dispatch(clearError())}>Clear Error</button>
    </div>
  );

  return (
    <div className="container mx-auto p-6 w-full px-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sessions</h1>
        <div className="flex gap-4 mb-6">
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-800">
            All
          </Link>
        </div>
      </div>

      <div>
        {sessions.map((session) => (
          <Session
            key={session.id}
            title={session.name}
            organizer={session.description.split('.')[0]} // Simplified, adjust as needed
            groups={Object.keys(session.group_lecturer_id)}
            timeAgo={getTimeAgo(session.created_at)}
            date={formatDate(session.start_time)}
            timeRange={formatTimeRange(session.start_time, session.end_time)}
            hasSettings={true} // Adjust based on your logic
          />
        ))}
      </div>
    </div>
  );
};

export default SessionsPage;