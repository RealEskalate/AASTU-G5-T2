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
      className={`p-6 rounded-lg border ${group.highlight ? "bg-green-50" : "bg-white"} cursor-pointer hover:shadow-md transition-shadow`}
      onClick={handleClick}
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
        <p className="text-sm text-gray-500">
          {group.code} • {group.members} Members
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          <p className="text-sm text-gray-500">Time Spent</p>
          <p className="text-xl font-semibold">{group.timeSpent.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Avg. Rating</p>
          <p className="text-xl font-semibold">{group.avgRating.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
