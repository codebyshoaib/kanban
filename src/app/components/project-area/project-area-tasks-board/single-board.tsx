"use client";

import { useTheme } from "next-themes";
import { useDroppable } from "@dnd-kit/core";
import SingleTask from "./single-task";
import { Board, Task } from "./types/kanban";

export default function SingleBoard({
  board,
  boardIndex,
  projectId,
  setTaskBeingEdited,
  onDeleteTask,
}: {
  board: Board;
  boardIndex: number;
  projectId: string;
  setTaskBeingEdited: any;
  onDeleteTask: (projectId: string, boardName: string, taskId: string) => void;
}) {
  const { name: boardName, tasks } = board;
  const { theme } = useTheme();
  const numberTasks = tasks.length;
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-100";

  const { setNodeRef, isOver } = useDroppable({
    id: boardName,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-full border p-4 rounded-2xl transition-colors duration-200 ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      {/* Header */}
      <div
        className={`flex justify-between ${bgColor} p-4 rounded-lg items-center`}
      >
        <span className="font-medium text-md">{boardName}</span>
        <div className="size-6 rounded-full bg-primary text-white flex items-center justify-center">
          <span className="text-sm mt-[2px]">{numberTasks}</span>
        </div>
      </div>

      {/* Task List */}
      <div className="mt-7">
      {tasks.map((task, taskIndex) => (
  <SingleTask
    key={task.id}
    task={task}
    onEdit={() =>
      setTaskBeingEdited({
        task,
        boardIndex,
        taskIndex,
      })
    }
    onDelete={() => onDeleteTask(projectId, boardName, task.id)} // ✅ FIXED HERE
  />
))}
      </div>
    </div>
  );
}
