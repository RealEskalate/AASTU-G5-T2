import LandingNavbar from "../components/LandingPage/LandingNavbar";



import { ReactNode } from "react";

export default function LandingLayout({ children }: { children: ReactNode }) {
  

  return (
    <div>
      <LandingNavbar />
      <main>{children}</main>
    </div>
  );
}