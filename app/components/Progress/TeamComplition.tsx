"use client";

import { Progress } from "@/components/ui/progress";
import { div } from "framer-motion/client";
import { useState } from "react";
import profilepic from "@/public/images/profilepic.jpg";
import { FaGreaterThan } from "react-icons/fa";
import { PiGreaterThan } from "react-icons/pi";
import { FcPrevious } from "react-icons/fc";
import { GrNext, GrPrevious } from "react-icons/gr";
import Image from "next/image";

const TeamCompletion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const teamData = [
    {
      profile: profilepic,
      name: "Yetnayet",
      solved: 214,
      completion: 95,
      available: 11,
    },
    {
      profile: profilepic,
      name: "Naod",
      solved: 207,
      completion: 92,
      available: 18,
    },
    {
      profile: profilepic,
      name: "Hiwot",
      solved: 188,
      completion: 84,
      available: 37,
    },
    {
      profile: profilepic,
      name: "Tarikua",
      solved: 182,
      completion: 81,
      available: 43,
    },
    {
      profile: profilepic,
      name: "Mihret",
      solved: 180,
      completion: 80,
      available: 45,
    },
    {
      profile: profilepic,
      name: "Aryam",
      solved: 179,
      completion: 80,
      available: 46,
    },
  ];

  return (
    <div className=" w-full mx-auto bg-white border-b  overflow-hidden">
      {/* Header Row - Clickable */}
      <div
        className="flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-gray-700">Detail Team Completion</h3>
       <GrNext className={`${isOpen? "-rotate-90" : "rotate-90"}`}/>
      </div>

      {/* Dropdown Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {teamData.map((member, index) => (
          <div
            key={index}
            className="grid grid-cols-[120px_2fr] w-full gap-10 px-4 py-3 border-b last:border-b-0"
          >
            <div className="flex items-center gap-2 grid-cols-">
              <Image
                src={member.profile}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{member.name}</span>
            </div>
            <div className="flex flex-col gap-1 w-full ">
              <Progress value={member.completion} isTeam={true} />
              <div className="flex gap-2">
                <span>{member.available + member.solved} Exercises </span>
                <span>|</span>
                <span>{member.solved} Solved</span>
                <span>|</span>
                <span>{member.completion}% Completion</span>
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
