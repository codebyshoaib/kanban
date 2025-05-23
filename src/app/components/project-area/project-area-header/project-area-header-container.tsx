"use client";

import ProjectsAreaHeader from "./project-area-header";
import { Project, Task } from "../project-area-tasks-board/types/kanban";

type Props = {
  projects: Project[];
  selectedProjectId: string;
  onAddTask: (task: Task) => void;
};

export default function ProjectsAreaHeaderContainer({
  projects,
  selectedProjectId,
  onAddTask,
}: Props) {
  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const projectName = selectedProject?.name ?? "";
  const boardNames = selectedProject?.boards.map((b) => b.name) || [];

  return (
    <ProjectsAreaHeader
      projectName={projectName}
      boardNames={boardNames}
      selectedProjectId={selectedProjectId}
      onAddTask={onAddTask}
    />
  );
}
