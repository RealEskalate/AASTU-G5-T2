"use client"

import { useEffect, useState } from "react"

interface ProgressStatProps {
  value: number
  total: number
  label: string
  color: string
}

const ProgressStat = ({ value, total, label, color }: ProgressStatProps) => {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    // Calculate percentage
    const calculatedPercentage = Math.round((value / (value + total)) * 100)
    setPercentage(calculatedPercentage)
  }, [value, total])

  return (
    <div className="flex items-center">
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
          {/* Progress circle */}
          <circle
            className={`text-${color}-500`}
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
            strokeDasharray={`${percentage * 2.64}, 264`}
            strokeDashoffset="0"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-medium">{percentage}%</span>
        </div>
      </div>
      <div className="ml-6">
        <div className="text-3xl font-semibold">{value}</div>
        <div className="text-gray-500">{label}</div>
      </div>
    </div>
  )
}

export default function ProgressStats() {
  return (
    <div className=" flex flex-col  md:flex-row justify-between p-6 bg-white rounded-lg border border-gray-100 shadow-sm mb-10 ">
      <ProgressStat value={165} total={59} label="Solved" color="green" />
      <div className="hidden md:block w-px bg-gray-200 mx-4"></div>
      <ProgressStat value={59} total={165} label="Available" color="yellow" />
    </div>
  )
}
