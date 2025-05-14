import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExternalLink, Share } from "lucide-react";
import { fetchContests, clearError } from "@/redux/slices/contestsSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Link from "next/link";

// Define Contest type for type safety
interface Contest {
  id: number;
  name: string;
  link: string;
  problem_count: number;
  created_at: string;
  updated_at: string;
  unrated: boolean;
  type: string;
}

export default function ContestsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { contests, status, error } = useSelector(
    (state: RootState) => state.contests
  );
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (status === "idle" && user) {
      dispatch(fetchContests());
    }
  }, [dispatch, status, user]);

  // Function to format time ago
  const getTimeAgo = (date: string): string => {
    const now = new Date();
    const contestDate = new Date(date);
    const diffMs = now.getTime() - contestDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return `${diffDays}d ago`;
  };

  if (!user)
    return (
      <div>
        Please <Link href="/login">log in</Link> to view contests.
      </div>
    );
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (status === "failed")
    return (
      <div>
        Error: {error}{" "}
        <button onClick={() => dispatch(clearError())}>Clear Error</button>
      </div>
    );

  return (
    <div className="space-y-4">
      {contests.map((contest: Contest) => (
        <div
          key={contest.id}
          className="border border-gray-200 rounded-lg p-5 bg-white"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {contest.id}. {contest.name}
              </h2>
              <p className="text-gray-600 mt-1">
                {contest.problem_count} problems •{" "}
                {getTimeAgo(contest.created_at)}
                {contest.unrated && " • unrated"}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="text-green-500 hover:text-green-600">
                <Share className="h-5 w-5" />
              </button>
              <Link href={`https://codeforces.com${contest.link}`} passHref>
                <button className="text-green-500 hover:text-green-600">
                  <ExternalLink className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
