"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddExerciseForm() {
  const [track, setTrack] = useState("progress");
  const [allSelected, setAllSelected] = useState(false);

  return (
    <div className="w-full  mx-auto p-10">
      <h1 className="text-2xl font-medium mb-6">Add Exercise</h1>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Select a Track</p>
          <Select value={track} onValueChange={setTrack}>
            <SelectTrigger className="w-full bg-white border border-gray-200 h-12">
              <SelectValue placeholder="Select a track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="strength">Strength</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
              <SelectItem value="flexibility">Flexibility</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select>
            <SelectTrigger className="w-full bg-white border border-gray-200 h-12">
              <SelectValue placeholder="Select problem(s)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="problem1">Problem 1</SelectItem>
              <SelectItem value="problem2">Problem 2</SelectItem>
              <SelectItem value="problem3">Problem 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-full bg-white border border-gray-200 h-12">
              <SelectValue placeholder="Add to other groups (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="group1">Group 1</SelectItem>
              <SelectItem value="group2">Group 2</SelectItem>
              <SelectItem value="group3">Group 3</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Checkbox
              id="all"
              checked={allSelected}
              onCheckedChange={(checked) => setAllSelected(checked as boolean)}
            />
            <label htmlFor="all" className="text-base">
              All
            </label>
          </div>
        </div>

        <Button
          className="w-full h-12 bg-gray-200 hover:bg-gray-300 text-gray-500 font-normal"
          variant="secondary"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
