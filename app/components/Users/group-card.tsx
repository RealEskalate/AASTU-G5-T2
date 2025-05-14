"use client"

import { useRouter } from "next/navigation"
import type { Group } from "@/types/group"

interface GroupCardProps {
  group: Group
}

export default function GroupCard({ group }: GroupCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/groups/${group.id}`)
  }

  return (
    <div
      className={`p-6 rounded-lg border ${group.highlight ? "bg-green-50" : "bg-white"} cursor-pointer hover:bg-green-100 transition-shadow`}
      onClick={handleClick}
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
        <p className="text-sm text-gray-500">
          {group.code} • {group.members} Members
        </p>
      </div>

      <div className="flex gap-6  pt-20">
        <div className="border-l-4 border-gray-300 pl-2">
          <p className="text-sm text-gray-500">Time Spent</p>
          <p className="text-xl ">{group.timeSpent.toLocaleString()}</p>
        </div>
        <div className="border-l-4 border-gray-300 pl-2">
          <p className="text-sm text-gray-500">Avg. Rating</p>
          <p className="text-lg ">{group.avgRating.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
