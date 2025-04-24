"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { groups } from "@/data/groups"
import RadarChart from "@/app/components/Users/radar-chart"

export default function GroupDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("Students")
  const [activeTopTab, setActiveTopTab] = useState("Heads")
  const [group, setGroup] = useState<any>(null)

  useEffect(() => {
    // Find the group by ID
    const foundGroup = groups.find((g) => g.id === params.id)
    setGroup(foundGroup)
  }, [params.id])

  if (!group) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Group header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{group.name}</h1>

      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/groups" className="hover:text-gray-700">
          Groups
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span>{group.code}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-1">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border rounded-md p-6 relative">
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-green-500"></div>
              <h3 className="text-gray-500 mb-1">Time Spent</h3>
              <p className="text-3xl font-bold">{group.timeSpent}</p>
            </div>
            <div className="border rounded-md p-6 relative">
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-green-500"></div>
              <h3 className="text-gray-500 mb-1">Solved Problems</h3>
              <p className="text-3xl font-bold">{group.problemsSolved || 0}</p>
            </div>
            <div className="border rounded-md p-6 relative">
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-green-500"></div>
              <h3 className="text-gray-500 mb-1">Avg. Rating</h3>
              <p className="text-3xl font-bold">{group.avgRating}</p>
            </div>
          </div>

          {/* Top tabs */}
          <div className="border-b mb-8">
            <div className="flex">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTopTab === "Heads" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"
                }`}
                onClick={() => setActiveTopTab("Heads")}
              >
                Heads
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTopTab === "Titles" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"
                }`}
                onClick={() => setActiveTopTab("Titles")}
              >
                Titles
              </button>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="lg:w-1/3">
          <RadarChart />
        </div>
      </div>

      {/* Bottom tabs */}
      <div className="border-b mb-6">
        <div className="flex">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "Students" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Students")}
          >
            Students
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "Statistics" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Statistics")}
          >
            Statistics
          </button>
        </div>
      </div>

      {/* Students table */}
      {activeTab === "Students" && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium text-right">Problems</th>
                <th className="pb-3 font-medium text-right">Time Spent</th>
                <th className="pb-3 font-medium text-right">Rating</th>
                <th className="pb-3 font-medium text-right">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {group.students && group.students.length > 0 ? (
                group.students.map((student: any) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">{student.name}</td>
                    <td className="py-4 text-right">{student.solved}</td>
                    <td className="py-4 text-right">{student.timeSpent}</td>
                    <td className="py-4 text-right">{student.rating}</td>
                    <td className="py-4 text-right">{student.lastSeen || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No rows
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Statistics content */}
      {activeTab === "Statistics" && (
        <div className="py-8 text-center text-gray-500">Statistics content will be displayed here</div>
      )}
    </div>
  )
}
