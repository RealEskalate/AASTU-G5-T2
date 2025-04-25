"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProfile } from "@/redux/slices/profileSlice";
import ConsistencyAndAttendance from "./ConsistencyHeatmap";
import ProfileDashboard from "./ProfileDashboard";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { profile, loading, error } = useSelector((state: RootState) => state.profile);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) {
      console.log("No token found, redirecting to login");
      router.push("/login"); // Adjust route as needed
    } else {
      console.log("Fetching profile with token:", token);
      dispatch(fetchProfile(token));
    }
  }, [dispatch, router, token]);

  if (!token) {
    return null; // Prevent rendering while redirecting
  }

  if (loading) {
    return <div className="min-h-screen bg-white text-gray-800 w-full px-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-gray-800 w-full px-10">
        Error: {error}. Please try again or log in.
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-white text-gray-800 w-full px-10">
        No profile data available. Please ensure you are logged in.
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-white text-gray-800 w-full px-10">
        <div className="px-6 pt-6 text-2xl font-bold">Profile</div>
        <div className="px-6 text-sm text-gray-500 font-semibold space-x-1">
          <span>Users</span>
          <span>•</span>
          <span className="text-gray-600 font-semibold">{profile.name}</span>
        </div>

        <div className="mt-6 rounded-t-2xl bg-gradient-to-br from-emerald-900 to-emerald-800 relative">
          <div className="h-40 sm:h-52"></div>
          <div className="absolute -bottom-10 left-6 flex gap-3 items-center pb-5">
            <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden">
              <Image
                src={profile.photo || "/images/default-profile.jpg"}
                alt="Profile"
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="px-6 flex flex-col gap-2 pb-4">
              <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
              <div className="text-gray-300 flex items-center gap-4">
                <span>{profile.role}</span>
                <span className="text-green-500 font-semibold flex items-center gap-1">
                  online{" "}
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-6 flex justify-end w-full border-b border-gray-200">
          <nav className="flex space-x-10 text-sm font-medium">
            <a
              className="py-4 border-b-2 border-green-600 text-green-600 flex items-center gap-1"
              href="#"
            >
              <span>👤</span> Profile
            </a>
            <a className="py-4 text-gray-500 hover:text-gray-800" href="#">
              Problems
            </a>
            <a className="py-4 text-gray-500 hover:text-gray-800" href="#">
              Submissions
            </a>
            <a className="py-4 text-gray-500 hover:text-gray-800" href="#">
              Contests
            </a>
          </nav>
        </div>
        <ProfileDashboard/>
        {/* <ConsistencyAndAttendance /> */}
      </div>
    </div>
  );
}