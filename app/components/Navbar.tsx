"use client";

import React, { useState, useRef, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";
import shining from "@/public/icons/shining.png";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { fetchProfile } from "@/redux/slices/profileSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BiHome, BiMapPin, BiRun } from "react-icons/bi";
import { TbTrack } from "react-icons/tb";
import { PiNetwork } from "react-icons/pi";
import { BsPeople, BsPerson, BsPersonPlus, BsPlusSquare } from "react-icons/bs";
import logo from "@/public/images/a2sv hub.png";
import { GiTeamIdea } from "react-icons/gi";
import { HiHandRaised } from "react-icons/hi2";
import { MdEvent } from "react-icons/md";
import { Brain } from "lucide-react";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Sidebar({ isCollapsed, setIsCollapsed, isDrawer = false, onClose }: { isCollapsed: boolean; setIsCollapsed: (value: boolean) => void; isDrawer?: boolean; onClose?: () => void }) {
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isContestOpen, setIsContestOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.profile);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchProfile(token));
    }
  }, [dispatch]);

  const dropdownVariants = {
    open: { height: "auto", opacity: 1 },
    closed: { height: 0, opacity: 0 },
  };

  const handleLinkClick = () => {
    if (isDrawer && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`h-screen ${
        isCollapsed ? "w-20" : isDrawer ? "w-64" : "w-[20%]"
      } ${isDrawer ? "block" : "hidden lg:block"} border-r border-dashed border-gray-400 overflow-y-auto transition-all duration-300 bg-white`}
    >

      <Link href={"/dashboard/profile"} onClick={handleLinkClick}>
        <div className="flex gap-4 items-center bg-gray-100 py-4 px-4 mx-3 rounded-lg">
          {profile?.photo ? (
            <Image
              src={profile.photo}
              alt="Profile Picture"
              className="rounded-full"
              width={38}
              height={38}
            />
          ) : (
            <div className="w-[38px] h-[38px] bg-gray-300 rounded-full" />
          )}
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold">
                {loading ? "Loading..." : profile?.name || "John Smith"}
              </span>
              <span className="text-gray-400 text-sm">
                {loading ? "Loading..." : profile?.role || "Head of Academy"}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="pl-4 py-2 pt-4">
        {!isCollapsed && <p className="font-semibold text-sm">STUDENT</p>}
        <div>
          <Link
            href="/dashboard"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 focus:text-green-300 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <BiHome className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Home</span>}
          </Link>

          <Link
            href={"/dashboard/tracks"}
            className="flex justify-between items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2 cursor-pointer"
            prefetch
            onClick={handleLinkClick}
          >
            <div className="flex gap-3 items-center">
              <TbTrack className="text-gray-500 text-xl" />
              {!isCollapsed && <span className="text-gray-500 font-semibold">Track</span>}
            </div>
            {!isCollapsed && (
              <div className="hover:bg-gray-200 rounded-full p-2" onClick={() => setIsTrackOpen(!isTrackOpen)}>
                <GrNext className={`text-gray-500 text-sm transition-transform duration-300 ${isTrackOpen ? "rotate-90" : "rotate-0"}`} />
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
                href="/dashboard/progress"
                className="flex items-center justify-between w-full hover:bg-gray-100 focus:bg-green-100 hover:rounded-lg p-3 px-4"
                prefetch
                onClick={handleLinkClick}
              >
                {!isCollapsed && <span>Progress</span>}
                {!isCollapsed && (
                  <div className="flex gap-2 items-center">
                    <span className="bg-gray-200 rounded-2xl text-black px-2 py-0.5 text-sm">10</span>
                  </div>
                )}
              </Link>
            </div>
          </motion.div>

          <Link
            href="/dashboard/problems"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <PiNetwork className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Problems</span>}
          </Link>

          <Link href="/dashboard/contests" prefetch onClick={handleLinkClick}>
            <div className="flex justify-between items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2 cursor-pointer">
              <div className="flex gap-3 items-center">
                <BiRun className="text-gray-500 text-xl" />
                {!isCollapsed && <span className="text-gray-500 font-semibold">Contests</span>}
              </div>
              {!isCollapsed && (
                <div className="hover:bg-gray-200 rounded-full p-2" onClick={() => setIsContestOpen(!isContestOpen)}>
                  <GrNext className={`text-gray-500 text-sm transition-transform duration-300 ${isContestOpen ? "rotate-90" : "rotate-0"}`} />
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
                href="/dashboard/problems"
                className="flex items-center justify-between w-full hover:bg-gray-100 focus:bg-green-100 hover:rounded-lg p-3 px-4"
                prefetch
                onClick={handleLinkClick}
              >
                {!isCollapsed && <span>Upsolve</span>}
                {!isCollapsed && (
                  <div className="flex gap-2 items-center">
                    <span className="bg-gray-200 rounded-2xl text-black px-2 py-0.5 text-sm">97</span>
                  </div>
                )}
              </Link>
            </div>
          </motion.div>
          <Link
            href="/dashboard/roadmap"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <BiMapPin className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Roadmap</span>}
          </Link>
          <Link
            href="/dashboard/users"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <BsPerson className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Users</span>}
          </Link>
          <Link
            href="/dashboard/groups"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <BsPeople className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Groups</span>}
          </Link>
          <Link
            href="/dashboard/forum"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <GiTeamIdea className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Forum</span>}
          </Link>
          <Link
            href="/dashboard/events"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <MdEvent className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Events</span>}
          </Link>
          <Link
            href="/dashboard/sessions"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <Brain className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Session</span>}
          </Link>
        </div>
      </div>
      <div className="pl-4 py-2 pt-4">
        {!isCollapsed && <p className="font-semibold text-sm">HEAD</p>}
        <div>
          <Link
            href="/dashboard/attendance"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
            onClick={handleLinkClick}
          >
            <HiHandRaised className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Take Attendance</span>}
          </Link>
          <Link
            href="/dashboard/addproblem"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
            onClick={handleLinkClick}
          >
            <BsPlusSquare className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Add Problem</span>}
          </Link>
          <Link
            href="/dashboard/dailyproblem"
            className="flex gap-3 items-center hover:bg-gray-100 py-3 px-4 mx-3 rounded-lg mt-2"
            onClick={handleLinkClick}
          >
            <BsPlusSquare className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Daily Problem</span>}
          </Link>
          <Link
            href="/dashboard"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <BsPlusSquare className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Add Contest</span>}
          </Link>
          <Link
            href="/dashboard"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <BsPlusSquare className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Add Track</span>}
          </Link>
          <Link
            href="/dashboard/addexercise"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <BsPlusSquare className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Add Exercise</span>}
          </Link>
          <Link
            href="/dashboard"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            prefetch
            onClick={handleLinkClick}
          >
            <BsPlusSquare className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Add Event</span>}
          </Link>
        </div>
      </div>
      <div className="pl-4 py-2 pt-4">
        {!isCollapsed && <p className="font-semibold text-sm">HEAD OF ACADEMY</p>}
        <div>
          <Link
            href="/dashboard"
            className="flex gap-3 items-center hover:bg-gray-100 focus:bg-green-100 py-3 px-4 mx-3 rounded-lg mt-2"
            onClick={handleLinkClick}
          >
            <BsPersonPlus className="text-gray-500 text-xl" />
            {!isCollapsed && <span className="text-gray-500 font-semibold">Generate Invite</span>}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { profile, loading, error } = useAppSelector((state) => state.profile);
  const { token, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && !profile && !loading && !error) {
      console.log("Fetching profile with token:", token);
      dispatch(fetchProfile(token));
    }
  }, [dispatch, token, profile, loading, error]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const imageSrc = profile?.photo && profile.photo.startsWith("https://res.cloudinary.com") ? profile.photo : "/images/default-profile.jpg";
  const displayName = profile?.name || user?.email || "Guest";
  const displayEmail = profile?.email || user?.email || "Not logged in";

  return (
    <>
      <div className="w-full relative fixed top-0 left-0 z-50">
        {isSearchOpen && (
          <div
            ref={searchRef}
            className="absolute top-0 left-0 w-full h-20 bg-transparent backdrop-blur-lg p-3 px-10 z-50 flex items-center justify-between shadow-md transition-all duration-300"
          >
            <BiSearch className="text-xl text-gray-500" />
            <input
              type="text"
              className="w-full px-4 py-2 bg-transparent text-black placeholder-gray-700 focus:outline-none"
              placeholder="Search..."
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-3 px-4 py-2 bg-[#00ab55] text-white rounded-lg transition-all duration-300"
            >
              Search
            </button>
          </div>
        )}

        <div
          className={`flex items-center justify-between py-3 px-10 w-full h-20 bg-transparent bg-opacity-20 transition-all duration-300 ${
            isSearchOpen ? "bg-opacity-50 backdrop-blur-md" : "bg-opacity-100"
          }`}
        >
          <div className="flex gap-4 items-center">
            <IconButton
              className="text-2xl text-gray-500 lg:hidden"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon className="block lg:hidden"/>
            </IconButton>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center hover:bg-gray-200 hover:rounded-full transform hover:scale-105 p-2 transition-all duration-300"
            >
              <BiSearch className="text-xl text-gray-500" />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <Image src={shining} alt="shining" width={26} height={26} />
            <div className="relative">
              <div className="absolute -top-1.5 left-2 bg-red-400 flex justify-center items-center w-5 h-5 rounded-full">
                <p className="text-sm text-white">2</p>
              </div>
              <MdNotifications className="text-2xl text-[#637381]" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-[38px] h-[38px] rounded-full overflow-hidden cursor-pointer">
                  <Image
                    src={imageSrc}
                    alt="Profile Picture"
                    className="rounded-full object-cover"
                    width={38}
                    height={38}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2">
                <DropdownMenuLabel className="text-gray-500">{displayEmail}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/dashboard"}>
                  <DropdownMenuItem>Home</DropdownMenuItem>
                </Link>
                <Link href={"/dashboard/profile"}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href={"/dashboard"}>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
                <Link href={"/dashboard"}>
                  <DropdownMenuItem>Sync leetcode</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{ style: { width: isSidebarCollapsed ? 80 : 256 } }}
      >
        <div className="flex justify-between items-center p-4">
          {!isSidebarCollapsed && <Image src={logo} alt="logo" width={120} height={120} />}
          <IconButton onClick={() => setIsDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          isDrawer={true}
          onClose={() => setIsDrawerOpen(false)}
        />
      </Drawer>

    </>
  );
}

export default Navbar;