// pages/dashboard/problems.tsx
"use client";
import React, { useEffect } from "react";
import { Columns3Icon, Download } from "lucide-react";
import { BiFilter } from "react-icons/bi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, ExternalLink } from "lucide-react";
import { LiaArrowUpSolid } from "react-icons/lia";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { fetchProblems } from "@/redux/slices/problemsSlice";
import { RootState, AppDispatch } from "@/redux/store";

const Problems: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { problems, loading, error } = useSelector(
    (state: RootState) => state.problems
  );

  useEffect(() => {
    dispatch(fetchProblems());
  }, [dispatch]);

  console.log("problems", problems);

  return (
    <div className="px-10">
      <div>
        <div className="py-5 pb-10">
          <h1 className="text-2xl font-bold">Problems</h1>
          <p className="text-gray-400">All</p>
        </div>
        <div className="flex gap-6 bg-gray-200 px-4 py-6">
          <div className="flex gap-2 items-center">
            <Columns3Icon size={16} />
            <span className="text-sm font-bold">Column</span>
          </div>
          <div className="flex gap-2 items-center">
            <BiFilter size={25} />
            <span className="text-sm font-bold">Filter</span>
          </div>
          <div className="flex gap-2 items-center">
            <Download size={20} />
            <span className="text-sm font-bold">Export</span>
          </div>
        </div>
      </div>

      <div className="px-3">
        {loading && (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && problems.length === 0 && (
          <p>No problems found.</p>
        )}
        {!loading && !error && problems.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow className="grid grid-cols-[100px_2fr_150px_100px_100px_50px] hover:bg-transparent border-b-2 border-gray-100">
                <TableHead className="py-6 flex items-center">
                  Difficulty
                </TableHead>
                <TableHead className="py-6 flex items-center gap-1">
                  Name <ArrowUp className="w-4 h-4" />
                </TableHead>
                <TableHead className="py-6 flex items-center">
                  Platform
                </TableHead>
                <TableHead className="py-6 flex items-center">Added</TableHead>
                <TableHead className="py-6 flex items-center">Vote</TableHead>
                <TableHead className="py-6 flex items-center">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map((problem, index) => (
                <Link
                  href={`/dashboard/problems/problemsubmission?id=${problem.id}`}
                  key={index}
                >
                  <TableRow
                    className="grid grid-cols-[100px_2fr_150px_100px_100px_50px] hover:bg-muted border-b border-gray-200"
                  >
                    <TableCell className="py-6">
                      <Badge
                        className={
                          problem.difficulty.toLowerCase() === "easy"
                            ? "bg-green-50 text-green-500 font-bold"
                            : problem.difficulty.toLowerCase() === "medium"
                            ? "bg-yellow-50 text-yellow-500 font-bold"
                            : "bg-red-50 text-red-500 font-bold"
                        }
                      >
                        {problem.difficulty.charAt(0).toUpperCase() +
                          problem.difficulty.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium py-6 truncate max-w-[300px]">
                      {problem.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground py-6 truncate max-w-[150px]">
                      {problem.platform}
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
                </Link>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Problems;