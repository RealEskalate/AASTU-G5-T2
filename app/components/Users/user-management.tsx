"use client"

import { useState } from "react"
import { Search, Grid, List } from "lucide-react"
import UserCard from "./user-card"
import GroupCard from "./group-card"
import CountryCard from "./country-card"
import { users } from "@/data/users"
import { groups } from "@/data/groups"
import { countries } from "@/data/countries"

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("Users")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="flex w-full justify-between">
        {["Users", "Groups", "Countries"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-4 text-base font-medium w-1/3 ${
              activeTab === tab ? "text-green-500 border-b-2 border-green-500 " : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Users" && (
        <>
          {/* Search and filters */}
          <div className="flex items-center justify-between mt-6 mb-8">
            <div className="flex items-center gap-4">
              <button
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid size={20} />
              </button>
              <button
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List size={20} />
              </button>
            </div>

            <div className="relative flex-1 max-w-md mx-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search user..."
              />
            </div>

            <div className="relative">
              <select className="appearance-none w-48 py-3 px-4 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>All</option>
                <option>Students</option>
                <option>Heads</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* User cards grid */}
          <div
            className={`grid ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            } gap-6`}
          >
            {users.map((user) => (
              <UserCard key={user.id} user={user} viewMode={viewMode} />
            ))}
          </div>
        </>
      )}

      {activeTab === "Groups" && (
        <div className="mt-6 space-y-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}

      {activeTab === "Countries" && (
        <div className="mt-6 space-y-6">
          {countries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      )}
    </div>
  )
}
