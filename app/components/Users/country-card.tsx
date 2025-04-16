"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Country } from "@/types/country";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      {/* Main card - clickable to expand/collapse */}
      <div
        className="relative overflow-hidden h-40 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Flag background - positioned to cover the right side */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-5"></div>
          <Image
            src={country.flagImage || "/placeholder.svg"}
            alt={`${country.name} flag`}
            className="object-cover w-full h-full"
            width={600}
            height={300}
            priority
          />
        </div>

        {/* Content with z-index to appear above the flag */}
        <div className="relative z-10 flex flex-col  h-full p-6">
          {/* Country info */}
          <div className="flex-shrink-0 mr-12">
            <h3 className="text-xl font-bold text-gray-900">{country.name}</h3>
            <p className="text-sm text-gray-500">{country.members} Members</p>
          </div>

          {/* Stats */}
          
            <div className="flex-1 grid grid-cols-3 gap-8 w-1/3 mx-auto items-end ">
              <div className="text-center">
                <p className="text-2xl font-semibold text-green-500">
                  {country.problemsSolved.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Problems Solved</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-green-500">
                  {country.totalTimeSpent.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Total time spent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-green-500">
                  {country.averageRating.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Average rating</p>
              </div>
            </div>

           
          
        </div>

        {/* Gradient overlay to blend the flag with the background */}
        
      </div>

      {/* Expandable student list */}
      {isExpanded && (
        <div className="border-t">
          {/* Table header */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-500">
            <div className="col-span-1">Person</div>
            <div className="text-right">Solved</div>
            <div className="text-right">Time spent</div>
            <div className="text-right">Rating</div>
          </div>

          {/* Table rows */}
          <div className="divide-y">
            {country.students?.map((student) => (
              <div
                key={student.id}
                className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50"
              >
                <div className="col-span-1 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={student.avatar || "/placeholder.svg"}
                      alt={student.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">
                    {student.name}
                  </span>
                </div>
                <div className="text-right">
                  {student.solved.toLocaleString()}
                </div>
                <div className="text-right">
                  {student.timeSpent.toLocaleString()}
                </div>
                <div className="text-right">
                  {student.rating.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
