// components/nav-bar/nav-bar.tsx
"use client";

import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/app/mode-toggle";
import AppNameAndLogo from "./logo-app";
import SearchBar from "./search-bar";
import ProjectDialog from "../window-dialogs/project-dialogs/new-project-dialog";
export default function Navbar({
  onAddProject,
}: {
  onAddProject: (name: string) => void;
}) {
  return (
    <div className="poppins p-6 flex justify-between items-center">
      <div className="flex items-center gap-16">
        <AppNameAndLogo />
        
      </div>
      <div className="flex items-center gap-5">
        <ModeToggle />
        <Separator orientation="vertical" className="h-5 w-[2px] bg-gray-500" />
        <ProjectDialog onAddProject={onAddProject} />
      </div>
    </div>
  );
}
