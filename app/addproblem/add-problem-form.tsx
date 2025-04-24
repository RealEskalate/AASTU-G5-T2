"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, ChevronDown } from "lucide-react";

export default function AddProblemForm() {
  const [problemName, setProblemName] = useState("");
  const [tag, setTag] = useState("");
  const [platform, setPlatform] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [track, setTrack] = useState("");
  const [contest, setContest] = useState("");
  const [link, setLink] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      problemName,
      tag,
      platform,
      difficulty,
      track,
      contest,
      link,
    });
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Deleting problem:", selectedProblem);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Problem</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Problem name"
            value={problemName}
            onChange={(e) => setProblemName(e.target.value)}
            className="bg-white"
          />

          <Input
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select Platform</option>
              <option value="leetcode">LeetCode</option>
              <option value="hackerrank">HackerRank</option>
              <option value="codeforces">CodeForces</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select Track</option>
              <option value="algorithms">Algorithms</option>
              <option value="data-structures">Data Structures</option>
              <option value="dynamic-programming">Dynamic Programming</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={contest}
              onChange={(e) => setContest(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select Contest</option>
              <option value="weekly">Weekly Contest</option>
              <option value="biweekly">Biweekly Contest</option>
              <option value="special">Special Event</option>
              <option value="none">None</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>
        </div>

        <div className="relative">
          <Input
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="bg-white pr-10"
          />
          <Zap className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        <Button
          type="submit"
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-500 font-medium"
        >
          Submit
        </Button>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Delete problem
        </h2>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <select
              value={selectedProblem}
              onChange={(e) => setSelectedProblem(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select problem</option>
              <option value="problem1">Two Sum</option>
              <option value="problem2">Valid Parentheses</option>
              <option value="problem3">Merge Two Sorted Lists</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          <Button
            onClick={handleDelete}
            className="bg-gray-200 hover:bg-gray-300 text-gray-500 font-medium px-8"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
