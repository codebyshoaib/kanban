"use client";

import { useEffect, useState } from "react";
import ProjectsAreaHeader from "./project-area-header/project-area-header";
import ProjectAreaTasksBoard from "./project-area-tasks-board/project-area-boards";
import { Board, Task } from "./project-area-tasks-board/types/kanban";
import TaskDialog from "../window-dialogs/task-dialogs/task-dialog";
import RightSideBar from "../right-side-bar/right-side-bar";

export default function ProjectArea() {
  const [boards, setBoards] = useState<Board[]>([
    { name: "Yet To Start", createdAt: new Date(), tasks: [] },
    { name: "In Progress", createdAt: new Date(), tasks: [] },
    { name: "Completed", createdAt: new Date(), tasks: [] },
  ]);

  const [taskBeingEdited, setTaskBeingEdited] = useState<{
    task: Task;
    boardIndex: number;
    taskIndex: number;
  } | null>(null);

  // Load boards from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kanban-boards");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const sanitizedBoards: Board[] = parsed.map((b: any) => ({
          name: b.name || "Unnamed",
          createdAt: new Date(b.createdAt),
          tasks: Array.isArray(b.tasks) ? b.tasks : [],
        }));
        setBoards(sanitizedBoards);
      } catch (e) {
        console.error("Failed to load from localStorage:", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("kanban-boards", JSON.stringify(boards));
  }, [boards]);

  const handleAddTask = (task: Task) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(), // ✅ generate unique ID here
    };

    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.name === "Yet To Start"
          ? { ...board, tasks: [...board.tasks, newTask] }
          : board
      )
    );
  };

  const handleUpdateTask = (updatedTask: Task) => {
    if (!taskBeingEdited) return;

    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards];

      // Remove from old board
      updatedBoards[taskBeingEdited.boardIndex].tasks.splice(
        taskBeingEdited.taskIndex,
        1
      );

      // Add to new board
      const newBoardIndex = updatedBoards.findIndex(
        (board) =>
          board.name.toLowerCase() === updatedTask.project.toLowerCase()
      );
      if (newBoardIndex !== -1) {
        updatedBoards[newBoardIndex].tasks.push(updatedTask);
      }

      return updatedBoards;
    });

    setTaskBeingEdited(null);
  };

  return (
    <div className="flex gap-6">
      {/* Left Area (Board + Header) */}
      <div className="flex-1">
        <ProjectsAreaHeader onAddTask={handleAddTask} />
        <ProjectAreaTasksBoard
          boards={boards}
          setBoards={setBoards}
          setTaskBeingEdited={setTaskBeingEdited}
        />
  
        {taskBeingEdited && (
          <TaskDialog
            task={taskBeingEdited.task}
            onSave={handleUpdateTask}
            onClose={() => setTaskBeingEdited(null)}
            boards={boards.map((b) => b.name)}
          />
        )}
      </div>
  
      {/* Right Sidebar with live progress */}
      <RightSideBar boards={boards} />
    </div>
  );
  
}
