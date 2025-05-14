import Image from "next/image";
import {
  ChevronDown,
  MessageSquare,
  Plus,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

interface ForumPostProps {
  avatar: string;
  username: string;
  date: string;
  title: string;
  content: string;
  tags?: string[];
  votes: number;
  comments: number;
}

const ForumPost = ({
  avatar,
  username,
  date,
  title,
  content,
  tags = [],
  votes,
  comments,
}: ForumPostProps) => {
  return (
    <div className="py-6 border-b border-gray-200 w-full">
      <div className="flex items-start gap-3 mb-3">
        <Image
          src={avatar || "/placeholder.svg?height=40&width=40"}
          alt={username}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h3 className="text-sm font-medium text-gray-800">{username}</h3>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-base font-medium text-gray-800 mb-1">{title}</h2>
        <p className="text-sm text-gray-700">{content}</p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs rounded-full border border-gray-200 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button className="text-gray-400 hover:text-gray-600">
              <ThumbsUp className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-500">{votes}</span>
            <button className="text-gray-400 hover:text-gray-600">
              <ThumbsDown className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">
              {comments} {comments === 1 ? "Comment" : "Comments"}
            </span>
          </div>
        </div>
        <button className="flex items-center gap-1 text-green-500 hover:text-green-600 text-sm">
          <span>Write A Comment</span>
        </button>
      </div>
    </div>
  );
};

export default function ForumPage() {
  const posts = [
    {
      avatar: "/images/profilepic.jpg",
      username: "Dolphin Mulugeta Gonfa",
      date: "25 Feb 2025 11:03 AM",
      title: "Codeforces - 15SA - [Rating - 800 (Easy)]",
      content: "Intuition",
      tags: ["Learning", "Code", "Resources", "Discussion"],
      votes: 0,
      comments: 0,
    },
    {
      avatar: "/images/profilepic.jpg",
      username: "Joshua Akintemi",
      date: "14 Mar 2024 7:35 PM",
      title: "5g meeting link",
      content: "Please can I get the link to today's session here?",
      tags: [],
      votes: 0,
      comments: 2,
    },
    {
      avatar: "/images/profilepic.jpg",
      username: "fikiremariam yalew",
      date: "01 Mar 2024 11:23 AM",
      title: "question",
      content: "how does the attendance work",
      tags: [],
      votes: 2,
      comments: 1,
    },
  ];

  return (
    <div className="container mx-auto p-6 w-full px-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Forum</h1>
          <p className="text-sm text-gray-500">Discussion forum</p>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm">
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-56">
          <button className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-500 bg-white">
            <span>Filter post...</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="relative w-32">
          <button className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-500 bg-white">
            <span>Latest</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {posts.map((post, index) => (
          <ForumPost
            key={index}
            avatar={post.avatar}
            username={post.username}
            date={post.date}
            title={post.title}
            content={post.content}
            tags={post.tags}
            votes={post.votes}
            comments={post.comments}
          />
        ))}
      </div>
    </div>
  );
}
