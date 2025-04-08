"use client";

import React, { useState, useRef, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";
import profilePic from "@/public/images/profilepic.jpg";
import shining from "@/public/icons/shining.png";
import Image from "next/image";
import { MenuIcon } from "lucide-react";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  // Handle clicks outside of the search bar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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

  return (
    <div className="w-full relative fixed top-0 left-0 z-50">
      {/* Search Overlay with Smooth Transition */}
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

      {/* Main Navbar with Dynamic Background Transition */}
      <div
        className={`flex items-center justify-between py-3 px-10 w-full h-20 bg-transparent bg-opacity-20 transition-all duration-300 ${
          isSearchOpen ? "bg-opacity-50 backdrop-blur-md" : "bg-opacity-100"
        }`}
      >
        <div className="flex gap-4 items-center">

        <MenuIcon className="text-2xl text-gray-500 hidden max-xl:block " />
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
              <p className="text-sm text-white">1</p>
            </div>
            <MdNotifications className="text-2xl text-[#637381]" />
          </div>
          <div>
            <Image
              src={profilePic}
              alt="Profile Picture"
              className="rounded-full"
              width={38}
              height={38}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
