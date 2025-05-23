// app/page.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Navbar from "./components/nav-bar/nav-bar";
import ProjectsArea from "./components/project-area/project-area";
import { Project } from "./components/project-area/project-area-tasks-board/types/kanban";

export default function Home() {
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-200";

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("kanban-projects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProjects(parsed);
        setSelectedProjectId(parsed[0]?.id || "");
      } catch (e) {
        console.error("Failed to load projects:", e);
      }
    } else {
        setProjects([]); // no default projects
        setSelectedProjectId(""); // no project selected
      }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanban-projects", JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = (name: string) => {
    const newProject = {
      id: crypto.randomUUID(),
      name,
      boards: [
        { name: "Yet To Start", tasks: [] },
        { name: "In Progress", tasks: [] },
        { name: "Completed", tasks: [] },
      ],
    };
    setProjects((prev) => [...prev, newProject]);
    setSelectedProjectId(newProject.id);
  };

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
