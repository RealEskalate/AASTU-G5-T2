"use client";

import { Button } from "@/components/ui/button";
import { FaGreaterThan } from "react-icons/fa";
import { FcNext } from "react-icons/fc";
import { GrNext } from "react-icons/gr";
import Login from "./Login";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-32 px-4 bg-[#fafaf2] relative overflow-hidden h-screen">
      <img
        src="/background-pattern-left.svg"
        alt=""
        className="absolute left-0 top-0 h-full opacity-30"
      />
      <img
        src="/background-pattern-right.svg"
        alt=""
        className="absolute right-0 top-0 h-full opacity-30"
      />

      <h1 className="text-2xl sm:text-4xl font-bold  leading-tight mb-6">
        No more jumbling in sheets. focus on your code, <br />
        we&apos;ll keep track of{" "}
        <span className="text-green-600 underline decoration-green-400/30">
          everything.
        </span>
      </h1>
      <p className="text-gray-700 max-w-4xl pb-40">
        Empower Collaboration and Efficiency: Experience Seamless Educational
        Endeavors with the A2SV Hub, Your Centralized Solution for Streamlining
        Organization, Collaboration, and Knowledge Sharing.
      </p>

      <Login btnname="Get Started Now"  icon={<GrNext/>}/>
    </section>
  );
}
