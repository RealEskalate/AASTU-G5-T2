import Image from "next/image"
import type { User } from "@/types/users"

interface UserCardProps {
  user: User
  viewMode: "grid" | "list"
}

// Static social media data for icons and bgColor
const socialLinks = [
  { name: "Link 1", icon: "/icons/leetcode.svg", bgColor: "#ff9800" },
  { name: "Link 2", icon: "/icons/code-forces.svg", bgColor: "#2196f3" },
  { name: "Link 3", icon: "/icons/hackerrank.svg", bgColor: "#4caf50" },
  { name: "Link 4", icon: "/icons/telegram.svg", bgColor: "#e91e63" },
]

export default function UserCard({ user, viewMode }: UserCardProps) {
  return (
    <div className={`bg-white border rounded-lg overflow-hidden shadow-sm ${viewMode === "list" ? "flex" : ""}`}>
      {/* Background image with overlay */}
      <div className={`relative ${viewMode === "list" ? "w-1/4" : "h-48"}`}>
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
          style={{ backgroundColor: user.bgColor || "#000000" }}
        ></div>
        <Image
          src={user.backgroundImage || "/placeholder.svg"}
          alt={`${user.name} background`}
          className="w-full h-full object-cover"
          width={400}
          height={200}
        />
        <div
          className={`absolute ${viewMode === "list" ? "bottom-4 left-4" : "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"}`}
        >
          <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-full h-full object-cover"
              width={80}
              height={80}
            />
          </div>
        </div>
      </div>

      {/* User info */}
      <div className={`p-6 ${viewMode === "list" ? "w-3/4" : "pt-12"} text-center`}>
        <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
        <p className="text-sm text-gray-500">
          {user.role} • {user.group}
        </p>

        {/* Social icons */}
        <div className="flex justify-center gap-3 my-4">
          {socialLinks.map((staticSocial, index) => {
            // Find the corresponding dynamic social link from user.socialLinks
            const dynamicSocial = user.socialLinks.find(
              (link) => link.name === staticSocial.name
            );
            return (
              <a
                key={index}
                href={dynamicSocial?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center"
                
              >
                <Image
                  src={staticSocial.icon}
                  alt={staticSocial.name}
                  width={16}
                  height={16}
                />
              </a>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 my-4">
          <div>
            <p className="text-xs text-gray-500">Problems</p>
            <p className="text-lg font-semibold">{user.stats.problems}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Submissions</p>
            <p className="text-lg font-semibold">{user.stats.submissions}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Dedicated Time</p>
            <p className="text-lg font-semibold">{user.stats.dedicatedTime}</p>
          </div>
        </div>

        {/* View profile button */}
        <button className="w-full py-2 mt-2 text-green-500 font-medium hover:text-green-600 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  )
}