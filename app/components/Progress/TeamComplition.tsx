"use client";

import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import profilepic from "@/public/images/profilepic.jpg";
import { GrNext } from "react-icons/gr";
import Image from "next/image";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';

// Define the shape of a team member
interface TeamMember {
  user_id: number;
  name: string;
  solved: number;
  exercises: number;
  available: number;
  completion: number;
}

const TeamCompletion = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: teamData, status, error } = useSelector((state: RootState) => state.teamCompletion);

  // Handle loading and error states
  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-4 text-red-500">
        {error?.includes('Unauthorized') ? (
          <p>
            Please <Link href="/login" className="text-blue-500 underline">log in</Link> to view team completion data.
          </p>
        ) : (
          `Error: ${error}`
        )}
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white border-b overflow-hidden">
      <div
        className="flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-gray-700">Detail Team Completion</h3>
        <GrNext className={`${isOpen ? "-rotate-90" : "rotate-90"}`} />
      </div>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {teamData.map((member: TeamMember) => (
          <div
            key={member.user_id}
            className="grid grid-cols-[120px_2fr] w-full gap-10 px-4 py-3 border-b last:border-b-0"
          >
            <div className="flex items-center gap-2">
              <Image
                src={profilepic}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{member.name}</span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Progress value={member.completion} isTeam={true} />
              <div className="flex gap-2">
                <span>{member.exercises} Exercises</span>
                <span>|</span>
                <span>{member.solved} Solved</span>
                <span>|</span>
                <span>{Math.round(member.completion)}% Completion</span>
                <span>|</span>
                <span>{member.available} Available</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCompletion;