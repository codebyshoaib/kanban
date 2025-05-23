import { useState } from "react";
import { Project, Task } from "../components/project-area/project-area-tasks-board/types/kanban";

export function useProjectTasks(
  projects: Project[],
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
) {
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

        const updatedBoards = project.boards.map((board) =>
          board.name !== boardName
            ? board
            : { ...board, tasks: board.tasks.filter((task) => task.id !== taskId) }
        );

        return { ...project, boards: updatedBoards };
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

  return {
    taskBeingEdited,
    setTaskBeingEdited,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleDragTask,
  };
}
