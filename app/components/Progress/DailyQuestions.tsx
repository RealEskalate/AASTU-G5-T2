"use client";

import React, { useEffect } from "react";
import QuestionCard from "./QuestionCard";
import { useSelector, useDispatch } from 'react-redux';
import { fetchDailyProblems } from '@/redux/slices/dailyProblemsSlice';
import { RootState, AppDispatch } from '@/redux/store';
import Link from 'next/link';


// Format date for display (e.g., "Wed Nov 06 2024")
const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

function DailyQuestions() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.dailyProblems);
  console.log("DailyProblems", data);

  // Fetch data on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDailyProblems());
    }
  }, [dispatch, status]);

  console.log("DailyProblems", data);

  // Handle loading and error states
  if (status === 'loading') {
    return <div className="text-center py-4">Loading daily problems...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-4 text-red-500">
        {error?.includes('Unauthorized') ? (
          <p>
            Please <Link href="/login" className="text-blue-500 underline">log in</Link> to view daily problems.
          </p>
        ) : (
          `Error: ${error}`
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {Object.entries(data).map(([date, entry]) => (
        <React.Fragment key={date}>
          <div className="flex flex-col sm:flex-row gap-4 items-center pt-6">
            <h1 className="text-xl sm:text-2xl font-bold">{formatDate(date)}</h1>
            <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
              
               
                  {entry.problems.map((problem) => (
                     <span
                  
                     className="bg-gray-200 rounded-full flex items-center px-3 py-1 text-center text-sm"
                   >{problem.link}</span>
                  ))} 
                
              
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10">
            {entry.problems.map((problem) => (
              <QuestionCard
                key={problem.id}
                id={problem.id}
                name={problem.name}
                difficulty={problem.difficulty}
                tags={problem.tag}
                platform={problem.platform || 'LeetCode'}
                link={problem.link}
                users_solved={problem.users_solved}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default DailyQuestions;