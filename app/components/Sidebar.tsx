"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BiHome, BiMapPin, BiRun } from "react-icons/bi";
import { TbTrack } from "react-icons/tb";
import { PiNetwork } from "react-icons/pi";
import { BsPeople, BsPerson, BsPersonPlus, BsPlusSquare } from "react-icons/bs";
import logo from "@/public/images/a2sv hub.png";
import profilepic from "@/public/images/profilepic.jpg";
import { GiTeamIdea } from "react-icons/gi";
import { HiHandRaised } from "react-icons/hi2";
import { MdEvent } from "react-icons/md";
import { Brain } from "lucide-react";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isContestOpen, setIsContestOpen] = useState(false);

  const dropdownVariants = {
    open: { height: "auto", opacity: 1 },
    closed: { height: 0, opacity: 0 },
  };

  return (
    <div
      className={`h-screen ${
        isCollapsed ? "w-30" : "w-[20%]"
      } hidden lg:block border-r border-dashed border-gray-400 overflow-y-auto transition-all duration-300`}
    >
      <div className="flex items-center justify-between px-2 py-5">
        {!isCollapsed && (
          <Image src={logo} alt="logo" width={120} height={120} />
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex relative hover:bg-gray-200 rounded-full w-10 h-10 items-center justify-center transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        >
          <GrPrevious className="text-md absolute top-3 left-2" />
          <GrPrevious className="text-md absolute top-3 left-4 text-gray-400" />
        </button>
      </div>

      <div className="flex gap-4 items-center bg-gray-100 py-4 px-4 mx-3 rounded-lg">
        <Image
          src={profilepic}
          alt="Profile Picture"
          className="rounded-full"
          width={38}
          height={38}
        />
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-semibold">John Smith</span>
            <span className="text-gray-400 text-sm">Head of Academy</span>
          </div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <div className="pl-4 py-2 pt-4">
        {!isCollapsed && <p className="font-semibold">STUDENT</p>}
        <div>
          {/* Home Link */}
          <Link
            href="/"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <BiHome className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Home</span>
            )}
          </Link>

          {/* Track Dropdown */}
          <Link
            href={"./tracks"}
            className="flex justify-between items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2 cursor-pointer"
            onClick={() => setIsTrackOpen(!isTrackOpen)}
          >
            <div className="flex gap-3 items-center">
              <TbTrack className="text-gray-500 text-xl" />
              {!isCollapsed && (
                <span className="text-gray-500 font-semibold">Track</span>
              )}
            </div>
            {!isCollapsed && (
              <div className="hover:bg-gray-200 rounded-full p-2">
                <GrNext
                  className={`text-gray-500 text-sm transition-transform duration-300 ${
                    isTrackOpen ? "rotate-90" : "rotate-0"
                  }`}
                />
              </div>
            )}
          </Link>
          <motion.div
            variants={dropdownVariants}
            initial="closed"
            animate={isTrackOpen ? "open" : "closed"}
            transition={{ duration: 0.3, delay: isTrackOpen ? 0.1 : 0 }}
            className="overflow-hidden"
          >
            <div className="text-gray-400 flex items-center gap-2 py-2 px-4 mx-3 rounded-lg ml-6">
              <div className="border-l h-12"></div>
              <Link
                href="/progress"
                className="flex items-center justify-between w-full hover:bg-gray-100 hover:rounded-lg p-3 px-4"
              >
                {!isCollapsed && <span>Progress</span>}
                {!isCollapsed && (
                  <div className="flex gap-2 items-center">
                    <span className="bg-gray-200 rounded-2xl text-black px-2 py-0.5 text-sm">
                      10
                    </span>
                  </div>
                )}
              </Link>
            </div>
          </motion.div>

          {/* Problems Link */}
          <Link
            href="/problems"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <PiNetwork className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Problems</span>
            )}
          </Link>

          {/* Contests Dropdown */}
          <Link href="/contests">
            <div
              className="flex justify-between items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2 cursor-pointer"
              onClick={() => setIsContestOpen(!isContestOpen)}
            >
              <div className="flex gap-3 items-center">
                <BiRun className="text-gray-500 text-xl" />
                {!isCollapsed && (
                  <span className="text-gray-500 font-semibold">Contests</span>
                )}
              </div>
              {!isCollapsed && (
                <div className="hover:bg-gray-200 rounded-full p-2">
                  <GrNext
                    className={`text-gray-500 text-sm transition-transform duration-300 ${
                      isContestOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </div>
              )}
            </div>
          </Link>

          <motion.div
            variants={dropdownVariants}
            initial="closed"
            animate={isContestOpen ? "open" : "closed"}
            transition={{ duration: 0.3, delay: isContestOpen ? 0.1 : 0 }}
            className="overflow-hidden"
          >
            <div className="text-gray-400 flex items-center gap-2 py-2 px-4 mx-3 rounded-lg ml-6">
              <div className="border-l h-12"></div>
              <Link
                href="/problems"
                className="flex items-center justify-between w-full hover:bg-gray-100 hover:rounded-lg p-3 px-4"
              >
                {!isCollapsed && <span>Upsolve</span>}
                {!isCollapsed && (
                  <div className="flex gap-2 items-center">
                    <span className="bg-gray-200 rounded-2xl text-black px-2 py-0.5 text-sm">
                      97
                    </span>
                  </div>
                )}
              </Link>
            </div>
          </motion.div>
          <Link
            href="/roadmap"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <BiMapPin className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Roadmap</span>
            )}
          </Link>
          <Link
            href="/users"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <BsPerson className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Users</span>
            )}
          </Link>
          <Link
            href="/groups"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <BsPeople className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Groups</span>
            )}
          </Link>
          <Link
            href="/forum"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <GiTeamIdea className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Forum</span>
            )}
          </Link>
          <Link
            href="/events"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <MdEvent className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Events</span>
            )}
          </Link>
          <Link
            href="/sessions"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <Brain className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Session</span>
            )}
          </Link>
        </div>
      </div>
      <div className="pl-4 py-2 pt-4">
        {!isCollapsed && <p className="font-semibold">HEAD</p>}
        <div>
          <Link
            href="/"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <HiHandRaised className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">
                Take Attendance
              </span>
            )}
          </Link>
          <Link
            href="/"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <BsPlusSquare className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Add Problem</span>
            )}
          </Link>
          <Link
            href="/"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <BsPlusSquare className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Add Contest</span>
            )}
          </Link>
          <Link
            href="/"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <BsPlusSquare className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Add Track</span>
            )}
          </Link>
          <Link
            href="/"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <BsPlusSquare className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">Add Event</span>
            )}
          </Link>
        </div>
      </div>
      <div className="pl-4 py-2 pt-4">
        {!isCollapsed && <p className="font-semibold">HEAD OF ACADEMY</p>}
        <div>
          <Link
            href="/"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
          >
            <BsPersonPlus className="text-gray-500 text-xl" />
            {!isCollapsed && (
              <span className="text-gray-500 font-semibold">
                Generate Invite
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;