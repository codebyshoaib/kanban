"use client";

import TaskDialog from "../../window-dialogs/task-dialogs/task-dialog";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { SortingDropDown } from "../../drop-downs/sorting-drop-down";
import { Project, Task } from "../project-area-tasks-board/types/kanban";

type Props = {
  projects: Project[];
  selectedProjectId: string;
  onProjectChange: (id: string) => void;
  onAddTask: (task: Task) => void;
};

export default function ProjectsAreaHeader({
  projects,
  selectedProjectId,
  onProjectChange,
  onAddTask,
}: Props) {
  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const boardNames = selectedProject?.boards.map((b) => b.name) || [];

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <MdOutlineSortByAlpha className="text-xl text-gray-500" />
          <span className="text-gray-500 text-sm">Sort</span>
        </div>
        <SortingDropDown />
        <TaskDialog
          onAddTask={onAddTask}
          boards={boardNames}
          selectedProjectId={selectedProjectId}
        />
      </div>
    </div>
  );
}
