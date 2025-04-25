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
import { ArrowUp, ArrowDown } from "lucide-react";
import { LiaArrowUpSolid } from "react-icons/lia";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const submissions = [
  {
    name: "Yosef Solomon Teferra",
    timeSpent: 2,
    tries: 1,
    language: "Python",
    inContest: 1,
    added: "4h",
    image: "/images/profilepic.jpg",
  },
  {
    name: "Anteneh Addisu",
    timeSpent: 95,
    tries: 1,
    language: "Python-Li...",
    inContest: 1,
    added: "5h",
    image: "/images/profilepic.jpg",
  },
  {
    name: "Lemi",
    timeSpent: 45,
    tries: 2,
    language: "Python-Li...",
    inContest: 1,
    added: "5h",
    image: "/images/profilepic.jpg",
  },
  {
    name: "Segni Girma",
    timeSpent: 114,
    tries: 5,
    language: "Python-Li...",
    inContest: 1,
    added: "5h",
    image: "/images/profilepic.jpg",
  },
];

export default function ProblemSubmission() {
  return (
    <div className="px-10">
      <h1 className="text-3xl font-bold">Submissions</h1>
      <p className="text-gray-500 mt-1">Problems - <span className="text-black font-medium">E - Kidus and Robot</span></p>

      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">Open Problem</Button>
        <Button variant="outline" className="bg-green-500 text-white hover:bg-green-600">New Submission</Button>
      </div>

      <div className="border-b mt-6">
        <nav className="flex space-x-4">
          <button className="border-b-2 border-green-500 py-2 px-1 text-green-600 font-semibold">Submissions</button>
          <button className="text-gray-400 py-2 px-1">Comments</button>
        </nav>
      </div>

      <div className="flex gap-6 bg-gray-200 px-4 py-6 mb-6 rounded-md">
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

      <div className="px-3 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-[60px_2fr_100px_80px_140px_100px_60px] border-b-2 border-gray-100 hover:bg-transparent">
              <TableHead className="py-6 flex items-center"></TableHead>
              <TableHead className="py-6 flex items-center gap-1">
                Name <ArrowUp className="w-4 h-4" />
              </TableHead>
              <TableHead className="py-6 flex items-center">Time spent</TableHead>
              <TableHead className="py-6 flex items-center">Tries</TableHead>
              <TableHead className="py-6 flex items-center">Language</TableHead>
              <TableHead className="py-6 flex items-center">In contest</TableHead>
              <TableHead className="py-6 flex items-center">Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((sub, index) => (
              <TableRow
                key={index}
                className="grid grid-cols-[60px_2fr_100px_80px_140px_100px_60px] hover:bg-muted border-b border-gray-200"
              >
                <TableCell className="flex items-center justify-center py-3">
                  <Image
                    src={sub.image}
                    alt={sub.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell className="font-medium py-6 truncate max-w-[300px]">
                  {sub.name}
                </TableCell>
                <TableCell className="text-muted-foreground py-6 truncate max-w-[100px] flex justify-center">
                  {sub.timeSpent}
                </TableCell>
                <TableCell className="text-muted-foreground py-6 flex justify-center">
                  {sub.tries}
                </TableCell>
                <TableCell className="flex items-center gap-1 py-6 ">
                  <span>{sub.language}</span>
                </TableCell>
                <TableCell className="text-muted-foreground py-6 flex justify-center">
                  {sub.inContest}
                </TableCell>
                <TableCell className="text-muted-foreground py-6 flex justify-center">
                  {sub.added}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
