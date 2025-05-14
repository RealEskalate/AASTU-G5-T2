import Image, { StaticImageData } from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import profilepic from "@/public/images/profilepic.jpg";
import { ArrowUp } from "lucide-react";

interface Problem {
  name: string;
  problem: string;
  timeSpent: number;
  language: string;
  added: string;
  profilepic?: StaticImageData; // Made optional for mock data
}

const problems: Problem[] = [
  {
    name: "Tewodros Mekonnen",
    problem: "Reverse Linked List",
    timeSpent: 32,
    language: "Python",
    added: "32m",
    profilepic: profilepic,
  },
  {
    name: "Fatima Ahmed",
    problem: "Merge Intervals",
    timeSpent: 28,
    language: "Python",
    added: "34m",
    profilepic: profilepic,
  },
  {
    name: "Kwame Nkrumah",
    problem: "Two Sum",
    timeSpent: 12,
    language: "Python",
    added: "37m",
    profilepic: profilepic,
  },
  {
    name: "Amina Jallow",
    problem: "Binary Tree Inorder Traversal",
    timeSpent: 40,
    language: "Python",
    added: "39m",
    profilepic: profilepic,
  },
  {
    name: "Yohannes Assefa",
    problem: "Longest Palindromic Substring",
    timeSpent: 55,
    language: "Python",
    added: "42m",
    profilepic: profilepic,
  },
  {
    name: "Naledi Modise",
    problem: "Container With Most Water",
    timeSpent: 35,
    language: "Python",
    added: "45m",
    profilepic: profilepic,
  },
];

function LatestSubmissionsTable() {
  return (
    <div className=" py-5">
      <div className="container py-5 rounded-xl bg-white shadow-md shadow-gray-100 px-10 border border-gray-100">
        <h2 className="text-lg font-bold mb-6">Latest Submissions</h2>
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-[100px_2fr_150px_100px_100px_80px] hover:bg-transparent border-b-2 border-gray-100">
              <TableHead className="py-6 flex items-center"></TableHead>
              <TableHead className="py-6 flex items-center gap-3">
                <span className="text-gray-300">|</span>
                <div className="flex gap-1 items-center">
                  <span>Name</span>
                  <ArrowUp className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead className="py-6 flex gap-2 items-center">
                <span className="text-gray-300">|</span>
                <span>Problem</span>
              </TableHead>
              <TableHead className="py-6 flex gap-2 items-center">
                <span className="text-gray-300">|</span>
                <span>Time Spent</span>
              </TableHead>
              <TableHead className="py-6 flex gap-2 items-center">
                <span className="text-gray-300">|</span>
                <span>Language</span>
              </TableHead>
              <TableHead className="py-6 flex gap-2 items-center">
                <span className="text-gray-300">|</span>
                <span>Added</span>
                <span className="text-gray-300">|</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((problem, index) => (
              <TableRow
                key={index}
                className="grid grid-cols-[100px_2fr_150px_100px_100px_80px] hover:bg-muted border-b border-gray-200"
              >
                {/* Profile image rendered with Next.js Image component */}
                <TableCell className="py-4">
                  <div className="flex items-center justify-center">
                    <Image
                      src={
                        problem.profilepic || "/images/default-profilepic.jpg"
                      }
                      alt={`${problem.name} profile picture`}
                      width={40}
                      height={40}
                      className="rounded-full items-center "
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium py-6 truncate max-w-[300px]">
                  {problem.name}
                </TableCell>
                <TableCell className="text-muted-foreground py-6 truncate max-w-[150px]">
                  {problem.problem}
                </TableCell>
                <TableCell className="text-muted-foreground py-6 text-center ">
                  {problem.timeSpent}
                </TableCell>
                <TableCell className="flex items-center gap-1 py-6 ">
                  <span className="text-muted-foreground text-center">{problem.language}</span>
                </TableCell>
                <TableCell className="py-6 text-center">
                  <span className="text-muted-foreground">{problem.added}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default LatestSubmissionsTable;
