"use client";

import TaskDialog from "../../window-dialogs/task-dialogs/task-dialog";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { SortingDropDown } from "../../drop-downs/sorting-drop-down";

type Props = {
  projectName: string;
  boardNames: string[];
  selectedProjectId: string;
  onAddTask: (task: any) => void;
};

export default function ProjectsAreaHeader({
  projectName,
  boardNames,
  selectedProjectId,
  onAddTask,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <span className="text-2xl font-bold">
          {projectName || "Select a project"}
        </span>
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
