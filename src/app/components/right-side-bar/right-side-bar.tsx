"use client";

import { Card } from "@/components/ui/card";
import CircularProgress from "./circular-progress";
import TasksStats from "./tasks-stats";
import ProjectSelectionDropDown from "../drop-downs/project-selection/project-selection";
import { Project } from "../project-area/project-area-tasks-board/types/kanban";

type Props = {
  projects: Project[];
  selectedProjectId: string;
  onProjectChange: (projectId: string) => void;
};

export default function RightSideBar({
  projects,
  selectedProjectId,
  onProjectChange,
}: Props) {
  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) ?? projects[0];

  return (
    <Card className="shadow-none p-6 rounded-3xl max-h-[640px]">
      <div className="flex flex-col gap-0">
        {/* Project Selector */}
        <ProjectSelectionDropDown
          projects={projects}
          value={selectedProjectId}
          onChange={onProjectChange}
        />

        {/* Project-Specific Stats */}
        <CircularProgress boards={selectedProject?.boards || []} />
        <TasksStats boards={selectedProject?.boards || []} />
      </div>
    </Card>
  );
}
