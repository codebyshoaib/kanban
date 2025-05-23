"use client";

import ProjectsAreaHeaderContainer from "./project-area-header/project-area-header-container";
import ProjectAreaTasksBoard from "./project-area-tasks-board/project-area-boards";
import TaskDialog from "../window-dialogs/task-dialogs/task-dialog";
import RightSideBar from "../right-side-bar/right-side-bar";
import { Project } from "./project-area-tasks-board/types/kanban";
import { useProjectTasks } from "@/app/hooks/useProjectTasks";

type Props = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
};

export default function ProjectArea({
  projects,
  setProjects,
  selectedProjectId,
  setSelectedProjectId,
}: Props) {
  const {
    taskBeingEdited,
    setTaskBeingEdited,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleDragTask,
  } = useProjectTasks(projects, setProjects);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <ProjectsAreaHeaderContainer
          projects={projects}
          selectedProjectId={selectedProjectId}
          onAddTask={handleAddTask}
        />
        <ProjectAreaTasksBoard
          projects={selectedProject ? [selectedProject] : []}
          setTaskBeingEdited={setTaskBeingEdited}
          onTaskDrag={handleDragTask}
          onDeleteTask={handleDeleteTask}
        />
        {taskBeingEdited && (
          <TaskDialog
            task={taskBeingEdited.task}
            onSave={handleUpdateTask}
            onClose={() => setTaskBeingEdited(null)}
            boards={selectedProject?.boards.map((b) => b.name) || []}
            selectedProjectId={taskBeingEdited.projectId}
          />
        )}
      </div>
      <RightSideBar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onProjectChange={setSelectedProjectId}
      />
    </div>
  );
}
