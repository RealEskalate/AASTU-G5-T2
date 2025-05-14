import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ArrowBigUp,
  ArrowDown,
  ArrowUp,
  ArrowUp01,
  ArrowUpDown,
  ArrowUpIcon,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

import { LiaArrowUpSolid } from "react-icons/lia";

const problems = [
  {
    difficulty: "Easy",
    name: "A - Presents",
    tag: "Contest",
    added: "20h",
    votes: 0,
    link: "#",
  },
  {
    difficulty: "Medium",
    name: "B - Was there an Array?",
    tag: "Contest",
    added: "20h",
    votes: 0,
    link: "#",
  },
  {
    difficulty: "Medium",
    name: "Broken Keyboard",
    tag: "brute force",
    added: "2h",
    votes: 0,
    link: "#",
  },
  {
    difficulty: "Medium",
    name: "C - Milya and Two Arrays",
    tag: "Contest",
    added: "20h",
    votes: 0,
    link: "#",
  },
  {
    difficulty: "Medium",
    name: "Construct Quad Tree",
    tag: "Array, Divide and Conquer",
    added: "4h",
    votes: 0,
    link: "#",
  },
  {
    difficulty: "Medium",
    name: "D - Greedy Monocarp",
    tag: "Contest",
    added: "20h",
    votes: 0,
    link: "#",
  },
];

function LatestProblemsTable() {
  return (
    <div className=" py-5">
      <div className="container py-5 rounded-xl bg-white shadow-md shadow-gray-100 px-10 border-1 border-gray-100">
        <h2 className="text-lg font-bold mb-6">Latest Problems</h2>
        <div className="">
          <Table>
            <TableHeader>
              <TableRow className=" grid grid-cols-[100px_2fr_150px_100px_100px_50px] hover:bg-transparent border-b-2 border-gray-100">
                <TableHead className="py-6 flex items-center">Difficulty</TableHead>
                <TableHead className="py-6 flex items-center gap-1">
                  Name <ArrowUp className="w-4 h-4" />
                </TableHead>
                <TableHead className="py-6 flex items-center">Tag</TableHead>
                <TableHead className="py-6 flex items-center">Added</TableHead>
                <TableHead className="py-6 flex items-center">Vote</TableHead>
                <TableHead className="py-6 flex items-center">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map((problem, index) => (
                <TableRow
                  key={index}
                  className="grid grid-cols-[100px_2fr_150px_100px_100px_50px] hover:bg-muted border-b border-gray-200"
                >
                  <TableCell className="py-6">
                    <Badge
                      className={
                        problem.difficulty === "Easy"
                          ? "bg-green-50 text-green-500 font-bold"
                          : problem.difficulty === "Medium"
                          ? "bg-yellow-50 text-yellow-500 font-bold"
                          : "bg-red-50 text-red-500 font-bold"
                      }
                    >
                      {problem.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium py-6 truncate max-w-[300px]">
                    {problem.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-6 truncate max-w-[150px]">
                    {problem.tag}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-6">
                    {problem.added}
                  </TableCell>
                  <TableCell className="flex items-center gap-1 py-6">
                    <LiaArrowUpSolid className="w-4 h-4 text-green-500" />
                    <span>{problem.votes}</span>
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  </TableCell>
                  <TableCell className="py-6">
                    <Link href={problem.link} target="_blank">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default LatestProblemsTable;
