"use client";

import { useTheme } from "next-themes";
import Navbar from "./components/nav-bar/nav-bar";
import ProjectsArea from "./components/project-area/project-area";
import useKanbanProjects from "./hooks/useKanbanProjects";

export default function Home() {
  const { theme } = useTheme();
  const {
    projects,
    setProjects,
    selectedProjectId,
    setSelectedProjectId,
    handleAddProject,
  } = useKanbanProjects();

  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-200";

  return (
    <div className={`${bgColor} border min-h-screen w-full`}>
      <Navbar onAddProject={handleAddProject} />
      <div className="grid px-6 mt-8 poppins gap-4">
        <ProjectsArea
          projects={projects}
          setProjects={setProjects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
        />
      </div>
    </div>
  );
}
