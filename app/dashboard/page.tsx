"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Dashboard from "../components/Dashboard/Dashboard";

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    console.log("DashboardPage: user state:", user);
    if (!user) {
      console.log("Redirecting to /login");
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
}