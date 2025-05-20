import { Card } from "@/components/ui/card";
import CircularProgress from "./circular-progress";
import TasksStats from "./tasks-stats";
import ProjectSelectionDropDown from "../drop-downs/project-selection/project-selection";

export default function RightSideBar() {
  return (
    <Card className="shadow-none p-6 rounded-3xl max-h-[640px]">
      <div className="flex flex-col gap-0">
        <ProjectSelectionDropDown />
        <CircularProgress />
        <TasksStats />
      </div>
    </Card>
  );
}
