"use client";

import { Dot } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProgress } from '@/redux/slices/userProgressSlice';
import { fetchTeamCompletion } from '@/redux/slices/teamCompletionSlice';
import { fetchDailyProblems } from '@/redux/slices/dailyProblemsSlice';
import { RootState, AppDispatch } from '@/redux/store';
import TeamCompletion from "./TeamComplition";
import DailyQuestions from "./DailyQuestions";
import Link from 'next/link';
import Progressbar from "./Progressbar";

function ProgressComp() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const {
    teamCompletion: { status: teamCompletionStatus, error: teamCompletionError },
    dailyProblems: { status: dailyProblemsStatus, error: dailyProblemsError },
  } = useSelector((state: RootState) => ({
    userProgress: state.userProgress,
    teamCompletion: state.teamCompletion,
    dailyProblems: state.dailyProblems,
  }));

  // Fetch all data on mount
  useEffect(() => {
    
    if (teamCompletionStatus === 'idle') {
      dispatch(fetchTeamCompletion());
    }
    if (dailyProblemsStatus === 'idle') {
      dispatch(fetchDailyProblems());
    }
  }, [dispatch,  teamCompletionStatus, dailyProblemsStatus, user]);

  // Determine combined loading and error states
  const isLoading =
    teamCompletionStatus === 'loading' ||
    dailyProblemsStatus === 'loading';

  const error =
    teamCompletionError || dailyProblemsError;

  // Handle loading and error states
  if (isLoading) {
    return <div className="text-center py-4">Loading progress data...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        {error.includes('Unauthorized') ? (
          <p>
            Please <Link href="/login" className="text-blue-500 underline">log in</Link> to view progress data.
          </p>
        ) : (
          `Error: ${error}`
        )}
      </div>
    );
  }

  return (
    <div className="px-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">Exercises</span>
          <div className="flex items-center gap-2">
            <span>Track</span>
            <Dot />
            <span className="text-gray-400">Progress</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <select
            name="view"
            id="view"
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="expanded">Expanded</option>
            <option value="compact">Compact</option>
          </select>
          <select
            name="filter"
            id="filter"
            className="border border-gray-300 rounded-md p-2 w-15"
          >
            <option value="all">All</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
        </div>
      </div>
      <Progressbar/>
      <TeamCompletion />
      <DailyQuestions />
    </div>
  );
}

export default ProgressComp;