// components/project-area/project-area.tsx
"use client";

import { useState } from "react";
import ProjectsAreaHeader from "./project-area-header/project-area-header";
import ProjectAreaTasksBoard from "./project-area-tasks-board/project-area-boards";
import TaskDialog from "../window-dialogs/task-dialogs/task-dialog";
import RightSideBar from "../right-side-bar/right-side-bar";
import { Project, Task } from "./project-area-tasks-board/types/kanban";

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
  const [taskBeingEdited, setTaskBeingEdited] = useState<{
    task: Task;
    projectId: string;
    boardIndex: number;
    taskIndex: number;
  } | null>(null);

  const handleAddTask = (task: Task) => {
    const newTask = { ...task, id: crypto.randomUUID() };
    setProjects((prev) =>
      prev.map((p) =>
        p.id === task.projectId
          ? {
              ...p,
              boards: p.boards.map((b) =>
                b.name === task.board
                  ? { ...b, tasks: [...b.tasks, newTask] }
                  : b
              ),
            }
          : p
      )
    );
  };

  const handleUpdateTask = (updatedTask: Task) => {
    if (!taskBeingEdited) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === taskBeingEdited.projectId
          ? {
              ...p,
              boards: p.boards.map((b, i) => {
                if (i === taskBeingEdited.boardIndex) {
                  return {
                    ...b,
                    tasks: b.tasks.filter((_, idx) => idx !== taskBeingEdited.taskIndex),
                  };
                }
                if (b.name === updatedTask.board) {
                  return {
                    ...b,
                    tasks: [...b.tasks, updatedTask],
                  };
                }
                return b;
              }),
            }
          : p
      )
    );
    setTaskBeingEdited(null);
  };

  const handleDeleteTask = (projectId: string, boardName: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== projectId) return project;

        const updatedBoards = project.boards.map((board) => {
          if (board.name !== boardName) return board;
          return {
            ...board,
            tasks: board.tasks.filter((task) => task.id !== taskId),
          };
        });

        return {
          ...project,
          boards: updatedBoards,
        };
      })
    );
  };

  const handleDragTask = (taskId: string, projectId: string, targetBoard: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;

        let movedTask: Task | undefined;
        const cleanedBoards = p.boards.map((b) => {
          const idx = b.tasks.findIndex((t) => t.id === taskId);
          if (idx !== -1) {
            movedTask = { ...b.tasks[idx], board: targetBoard };
            return { ...b, tasks: b.tasks.filter((_, i) => i !== idx) };
          }
          return b;
        });

        return movedTask
          ? {
              ...p,
              boards: cleanedBoards.map((b) =>
                b.name === targetBoard ? { ...b, tasks: [...b.tasks, movedTask!] } : b
              ),
            }
          : p;
      })
    );
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <ProjectsAreaHeader
          projects={projects}
          selectedProjectId={selectedProjectId}
          onProjectChange={setSelectedProjectId}
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
