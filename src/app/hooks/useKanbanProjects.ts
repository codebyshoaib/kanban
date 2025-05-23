"use client";

import { useEffect, useState } from "react";
import { Project } from "../components/project-area/project-area-tasks-board/types/kanban";

export default function useKanbanProjects() {
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
      setProjects([]);
      setSelectedProjectId("");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanban-projects", JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = (name: string) => {
    const newProject: Project = {
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

  return {
    projects,
    setProjects,
    selectedProjectId,
    setSelectedProjectId,
    handleAddProject,
  };
}
