import { Card } from "@/components/ui/card";
import CircularProgress from "./circular-progress";
import TasksStats from "./tasks-stats";
import ProjectSelectionDropDown from "../drop-downs/project-selection/project-selection";
import { Board } from "../project-area/project-area-tasks-board/types/kanban";
export default function RightSideBar({ boards }: { boards: Board[] }) {
  return (
    <Card className="shadow-none p-6 rounded-3xl max-h-[640px]">
      <div className="flex flex-col gap-0">
        <ProjectSelectionDropDown />
        <CircularProgress boards={boards} />
        <TasksStats />
      </div>
    </Card>
  );
}
