"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Login from "./Login"
import Image from "next/image"
import logo from "@/public/images/a2sv hub.png"
import { PiGreaterThan } from "react-icons/pi"

export default function LandingNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-2 bg-[#fafaf2]">
      <div className="flex items-center space-x-2">
        <Image src={logo} alt="A2SV Hub Logo" width={120} height={120} className="rounded-full" />
      </div>
      <div className="flex space-x-6 items-center py-4">
        <Link
          href="/"
          className=" text-green-600 font-bold underline underline-offset-8"
        >
          Home
        </Link>
        <Link href="/doc" className="text-gray-700">Docs</Link>
        <Link href="/blog" className="text-gray-700">Blog</Link>
        <Link href="/about" className="text-gray-700">About A2SV</Link>
      </div>
      <Login btnname="Login" />
    </nav>
  )
}