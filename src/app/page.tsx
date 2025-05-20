// app/page.tsx
"use client";

import Navbar from "./components/nav-bar/nav-bar";
import { useTheme } from "next-themes";
import ProjectsArea from "./components/project-area/project-area";
import RightSideBar from "./components/right-side-bar/right-side-bar";

export default function Home() {
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-200";

  return (
    <div className={`${bgColor} border min-h-screen w-full`}>
      <Navbar />

      {/* Main content area with Projects and Sidebar */}
      <div className="grid px-6 mt-8 poppins gap-4">
        <ProjectsArea />
     
      </div>
    </div>
  );
}
