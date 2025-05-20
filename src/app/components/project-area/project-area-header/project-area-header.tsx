import TaskDialog from "../../window-dialogs/task-dialogs/task-dialog";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { SortingDropDown } from "../../drop-downs/sorting-drop-down";

export default function ProjectsAreaHeader({ onAddTask }: { onAddTask: (task: any) => void }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <span className="text-2xl font-bold">Projects</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <MdOutlineSortByAlpha className="text-xl text-gray-500" />
          <span className="text-gray-500 text-sm">Sort</span>
        </div>
        <SortingDropDown />
        <TaskDialog onAddTask={onAddTask} />
      </div>
    </div>
  );
}
