"use client";
import Image from "next/image";
import { useState } from "react";
import { Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import profilepic from "@/public/images/profilepic.jpg";

export default function AttendanceTracker() {
  const [session, setSession] = useState<string>("");
  const [type, setType] = useState<string>("");

  const attendees = [
    {
      id: 1,
      name: "Abdulkerim Seid Osman",
      avatar: profilepic,
    },
    {
      id: 2,
      name: "Abdulmajid Awol Seid",
      avatar: profilepic,
    },
    {
      id: 3,
      name: "Abem Tigist Chegen",
      avatar: profilepic,
    },
    {
      id: 4,
      name: "Abigiya Getachew Gebre",
      avatar: profilepic,
    },
    {
      id: 5,
      name: "Amanuael Kebede Kassie",
      avatar: profilepic,
    },
    {
      id: 6,
      name: "Bereket Sintayehu Mengistu",
      avatar: profilepic,
    },
  ];

  return (
    <div className="w-full px-10 mx-auto p-6">
      <h1 className="text-xl font-medium text-gray-800 mb-4">
        Take attendance
      </h1>

      <div className="flex gap-4 mb-6">
        <div className="w-full">
          <Select value={session} onValueChange={setSession}>
            <SelectTrigger className="w-full h-12 border-gray-200 rounded-md">
              <SelectValue placeholder="Session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning Session</SelectItem>
              <SelectItem value="afternoon">Afternoon Session</SelectItem>
              <SelectItem value="evening">Evening Session</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-48">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full h-12 border-gray-200 rounded-md">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lecture">Lecture</SelectItem>
              <SelectItem value="lab">Lab</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-center mb-6">
        <span className="text-green-500 font-medium">Everyone Present</span>
      </div>

      <div className="space-y-4">
        {attendees.map((attendee) => (
          <div
            key={attendee.id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200">
                <div className="flex items-center justify-center">
                  <Image
                    src={attendee.avatar || "/images/default-profilepic.jpg"}
                    alt={`${attendee.name} profile picture`}
                    width={40}
                    height={40}
                    className="rounded-full items-center "
                  />
                </div>
              </div>
              <span className="font-medium text-gray-800">{attendee.name}</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-blue-500 font-medium">L</button>
              <button className="flex items-center justify-center w-5 h-5 text-red-500">
                <X className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center w-5 h-5">
                <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
              </button>
              <button className="flex items-center justify-center w-5 h-5 text-green-500">
                <Check className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
