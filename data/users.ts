import type { User } from "@/types/users"

export const users: User[] = [
  {
    id: "1",
    name: "Yohannes Arega Habte",
    role: "Student",
    group: "G55",
    avatar: "/images/profilepic.jpg",
    backgroundImage: "/images/profilepic.jpg",
    bgColor: "#2e7d32",
    socialLinks: [
        { name: "Link 1", icon: "/icons/leetcode.svg", bgColor: "#ff9800" },
      { name: "Link 2", icon: "/icons/code-forces.svg", bgColor: "#2196f3" },
      { name: "Link 3", icon: "/icons/hackerrank.svg", bgColor: "#4caf50" },
      { name: "Link 4", icon: "/icons/telegram.svg", bgColor: "#e91e63" },
    ],
    stats: {
      problems: 524,
      submissions: 561,
      dedicatedTime: "9.26k",
    },
  },
  {
    id: "2",
    name: "Yordanos Wuletaw Mekonin",
    role: "Head",
    group: "G59",
    avatar: "/images/profilepic.jpg",
    backgroundImage: "/images/profilepic.jpg",
    bgColor: "#00796b",
    socialLinks: [
        { name: "Link 1", icon: "/icons/leetcode.svg", bgColor: "#ff9800" },
      { name: "Link 2", icon: "/icons/code-forces.svg", bgColor: "#2196f3" },
      { name: "Link 3", icon: "/icons/hackerrank.svg", bgColor: "#4caf50" },
      { name: "Link 4", icon: "/icons/telegram.svg", bgColor: "#e91e63" },
    ],
    stats: {
      problems: 145,
      submissions: 147,
      dedicatedTime: "2.71k",
    },
  },
  {
    id: "3",
    name: "Eyob Alemu",
    role: "Student",
    group: "G12",
    avatar: "/images/profilepic.jpg",
    backgroundImage: "/images/profilepic.jpg",
    bgColor: "#00796b",
    socialLinks: [
      { name: "Link 1", icon: "/icons/leetcode.svg", bgColor: "#ff9800" },
      { name: "Link 2", icon: "/icons/code-forces.svg", bgColor: "#2196f3" },
      { name: "Link 3", icon: "/icons/hackerrank.svg", bgColor: "#4caf50" },
      { name: "Link 4", icon: "/icons/telegram.svg", bgColor: "#e91e63" },
    ],
    stats: {
      problems: 0,
      submissions: 0,
      dedicatedTime: 0,
    },
  },
]
