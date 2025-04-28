import Image from "next/image";
import { useState } from "react";
import { Calendar } from "lucide-react";
import ratepic from "@/public/rate.png";
import ConsistencyGrid from "./ConsistencyGrid";
type AttendanceDay = {
  date: string;
  status: "present" | "excused" | "absent";
};

const attendanceData: AttendanceDay[] = Array.from({ length: 288 }, (_, i) => {
  const status =
    i === 10 || i === 42 || i === 105 || i === 220 || i === 260
      ? "excused"
      : "present";
  return {
    date: `2025-${Math.floor(i / 30) + 1}-${(i % 30) + 1}`,
    status,
  };
});

export default function ProfileDashboard() {
  const [showDetail, setShowDetail] = useState(false);

  const colorMap = {
    present: "bg-green-500",
    excused: "bg-yellow-400",
    absent: "bg-red-500",
  };

  const absentCount = attendanceData.filter(
    (d) => d.status === "absent"
  ).length;
  const excusedCount = attendanceData.filter(
    (d) => d.status === "excused"
  ).length;
  const presentCount = attendanceData.filter(
    (d) => d.status === "present"
  ).length;
  const total = attendanceData.length;
  const percentage = Math.round((presentCount / total) * 100);

  
  return (
    <div className="w-full mx-auto p-6 bg-white">
      {/* Consistency Section */}
      <ConsistencyGrid/>
      
      {/* Attendance Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Attendance</h2>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            Show detail
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={showDetail}
              onChange={() => setShowDetail((prev) => !prev)}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-1">
          {attendanceData.map((day, idx) => (
            <div
              key={idx}
              className={`w-4 h-4  ${colorMap[day.status]}`}
              title={`${day.date} - ${day.status}`}
            />
          ))}
        </div>

        <div className="mt-2 text-sm text-gray-700">
          Absent: <strong>{absentCount}</strong> | Excused:{" "}
          <strong>{excusedCount}</strong> | Present:{" "}
          <strong>{presentCount}</strong> | <strong>{percentage}%</strong>
        </div>
      </div>
      <div className="flex">
        {/* Profile Badge and Links */}
        <div className="grid grid-cols-2 gap-1 w-full mr-7">
          <div className="shadow-md col-span-2 grid grid-cols-2 px-6">
            <div className="  col-span-1 rounded-md px-6 mr-2 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold">1,522</div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>

            <div className=" col-span-1 rounded-md px-6 mx-5 flex flex-col items-center justify-center ">
              {/* <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gray-200"></div> */}
              <div className="text-2xl font-bold">437</div>
              <div className="text-sm text-gray-500">Problems</div>
            </div>
          </div>
          {/* Profile Badge */}
          <div className="shadow-md col-span-2 rounded-md p-10 flex flex-col items-center">
            <div className="relative w-40 h-40 mb-4">
              <Image
                src={ratepic}
                alt="Strategist Badge"
                width={160}
                height={160}
                className="rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-xl font-bold"></div>
                  {/*STRATEGIST*/}
                  <div className="text-lg"></div>
                  {/*1300*/}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg">Strategist | 1522</div>
              <div className="text-sm text-gray-500">Next: Knight III</div>
            </div>
          </div>
          {/* Division */}
          <div className="shadow-md col-span-2 rounded-md  flex flex-col items-center">
            <div className="mt-8 text-center">
              <div className="font-semibold text-lg">Div 3</div>
              <div className="text-sm ">Division III</div>
            </div>
          </div>
        </div>
        {/* Stats and Profile Section */}
        <div className=" gap-6 mb-8">
          <div className="shadow-md rounded-md p-6">
            <h3 className="text-lg font-medium text-green-800 mb-4">About</h3>
            <p className="text-sm text-gray-700 mb-6">
              Fast learner who is always ready to take on new challenges. Big
              interest in problem solving, web development, machine learning,
              and ethical hacking, constantly seeking out new opportunities to
              expand my knowledge and skills.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <div className="w-5 text-center mr-3">🌍</div>
                <span>Ethiopia</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 text-center mr-3">✉️</div>
                <span>Samuel.mulugeta@a2sv.org</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 text-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 18l6-6-6-6"></path>
                    <path d="M8 6l-6 6 6 6"></path>
                  </svg>
                </div>
                <span>Python</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 text-center mr-3">👨‍🎓</div>
                <span>Student at AASTU Group 55</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 text-center mr-3">🎓</div>
                <span>
                  Studied at Addis Ababa Science and Technology University
                  (AASTU)
                </span>
              </div>
            </div>
          </div>
          <div className="shadow-md rounded-md mt-3 p-6">
            <h3 className="text-lg font-medium mb-6">Links</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6  rounded-sm flex items-center justify-center text-white mr-3">
                  in
                </div>
                <span className="mr-2 font-medium">LinkedIn:</span>
                <a
                  href="https://www.linkedin.com/in/samuel-mulugeta-8638f12f7/"
                  className=" hover:underline"
                >
                  https://www.linkedin.com/in/samuel-mulugeta-8638f12f7/
                </a>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-400 rounded-sm flex items-center justify-center text-white mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm-2.426 14.741h-1.449l.009-.009-2.124-7.332h1.483l1.323 5.031 1.323-5.031h1.483l-2.048 7.341zm4.425.009h-1.5v-7.35h1.5v7.35zm4.5-7.341v7.341h-1.5v-5.668h-1.5v-1.673h3z" />
                  </svg>
                </div>
                <span className="mr-2 font-medium">Telegram:</span>
                <a
                  href="https://t.me/samuels5"
                  className=" hover:underline"
                >
                  https://t.me/samuels5
                </a>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-500 rounded-sm flex items-center justify-center text-white mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="mr-2 font-medium">Instagram:</span>
                <a
                  href="https://instagram.com/s5samuel/"
                  className=" hover:underline"
                >
                  https://instagram.com/s5samuel/
                </a>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-500 rounded-sm flex items-center justify-center text-white mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744.604 0 1.186-.229 1.702-.744.515-.515.744-1.111.744-1.715 0-.604-.229-1.186-.744-1.702l-2.696-2.607c-1.676-1.676-3.646-2.546-5.973-2.546-2.328 0-4.297.87-5.973 2.546l-4.319 4.38c-1.676 1.676-2.546 3.646-2.546 5.973 0 2.328.87 4.297 2.546 5.973l4.332 4.363c1.676 1.676 3.646 2.546 5.973 2.546s4.297-.87 5.973-2.546l2.697-2.607c.514-.514.744-1.111.744-1.714s-.23-1.186-.744-1.702c-.515-.515-1.111-.744-1.714-.744-.604 0-1.186.229-1.702.744z" />
                  </svg>
                </div>
                <span className="mr-2 font-medium">Leetcode:</span>
                <a
                  href="https://leetcode.com/samuels5"
                  className=" hover:underline"
                >
                  https://leetcode.com/samuels5
                </a>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center text-white mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm19.5 0c0-2.486-2.014-4.5-4.5-4.5h-3.75l.75 6H24v10.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-10.5h-4.5l-.75-6h-3v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15H1.5C.672 3 0 2.328 0 1.5S.672 0 1.5 0h18c2.486 0 4.5 2.014 4.5 4.5v3z" />
                  </svg>
                </div>
                <span className="mr-2 font-medium">Codeforces:</span>
                <a
                  href="https://codeforces.com/profile/samuels5"
                  className=" hover:underline"
                >
                  https://codeforces.com/profile/samuels5
                </a>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-600 rounded-sm flex items-center justify-center text-white mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <span className="mr-2 font-medium">HackerRank:</span>
                <a
                  href="https://www.hackerrank.com/samuelmulugeta51"
                  className=" hover:underline"
                >
                  https://www.hackerrank.com/samuelmulugeta51
                </a>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-800 rounded-sm flex items-center justify-center text-white mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <span className="mr-2 font-medium">Github:</span>
                <a
                  href="https://github.com/Samuels5"
                  className=" hover:underline"
                >
                  https://github.com/Samuels5
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
