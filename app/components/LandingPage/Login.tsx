"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { EyeOff, Eye } from "lucide-react";

export default function Login({
  btnname,
  icon,
}: {
  btnname: string;
  icon?: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={loading}
          className="flex justify-between items-center bg-green-600 text-white rounded-full px-6 hover:bg-green-700"
        >
          {btnname} {icon && <span className="ml-2">{icon}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-6 w-[320px] rounded-2xl space-y-4"
        align="end"
      >
        <h3 className="text-2xl font-bold">Sign in to A2SV Hub</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <a href="#" className="text-green-600 font-medium hover:underline">
              Forgot password?
            </a>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Logging in…" : "Login"}
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}