"use client";

import { Button } from "@/components/ui/button";
import { Project } from "../../project-area/project-area-tasks-board/types/kanban";

export default function ProjectCommandItems({
  projects,
  selectedProject,
  onSelect,
}: {
  projects: Project[];
  selectedProject: Project;
  onSelect: (projectId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {projects.map((project) => (
        <Button
          key={project.id}
          variant={project.id === selectedProject.id ? "default" : "ghost"}
          className="w-full justify-start text-left"
          onClick={() => onSelect(project.id)}
        >
          {project.name}
        </Button>
      ))}
    </div>
  );
}
