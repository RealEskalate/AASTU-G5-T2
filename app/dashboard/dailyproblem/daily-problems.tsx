"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DailyProblems() {
  const [superGroup, setSuperGroup] = useState<string>("");
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-10">
        Daily Problems
      </h1>

      <div className="space-y-8">
        {/* Super Group Selection */}
        <div className="w-full">
          <Select value={superGroup} onValueChange={setSuperGroup}>
            <SelectTrigger className="w-full h-14 px-5 text-gray-400 border border-gray-200 rounded-md bg-white">
              <SelectValue placeholder="Select Super Group" />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="group1">Group 1</SelectItem>
              <SelectItem value="group2">Group 2</SelectItem>
              <SelectItem value="group3">Group 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4">
          <p className="text-gray-600 text-lg mb-6">
            Please select some problems to add...
          </p>

          <div className="flex gap-4 items-center">
            <Select>
              <SelectTrigger className="w-full h-14 px-5 text-gray-400 border border-gray-200 rounded-md bg-white">
                <SelectValue placeholder="Select problem(s)" />
                <ChevronDown className="h-4 w-4 opacity-50" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="problem1">Problem 1</SelectItem>
                <SelectItem value="problem2">Problem 2</SelectItem>
                <SelectItem value="problem3">Problem 3</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="secondary"
              className="h-14 px-6 bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-md"
            >
              Add Problems
            </Button>
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md">
            Save Order
          </Button>
        </div>
      </div>
    </div>
  );
}
