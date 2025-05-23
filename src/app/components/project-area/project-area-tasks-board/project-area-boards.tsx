"use client";

import SingleBoard from "./single-board";
import { Project, Task } from "./types/kanban";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

type Props = {
  projects: Project[];
  setTaskBeingEdited: (data: {
    task: Task;
    projectId: string;
    boardIndex: number;
    taskIndex: number;
  }) => void;
  onTaskDrag: (
    taskId: string,
    projectId: string,
    targetBoard: Task["board"]
  ) => void;
  onDeleteTask: (projectId: string, boardName: string, taskId: string) => void; // ✅ FIXED
};

export default function ProjectAreaTasksBoard({
  projects,
  setTaskBeingEdited,
  onTaskDrag,
  onDeleteTask,
}: Props) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const [taskId, projectId] = active.id.toString().split(":");
    const targetBoardName = over.id.toString() as Task["board"];

    onTaskDrag(taskId, projectId, targetBoardName);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="space-y-10 mt-4">
        {projects.map((project) => (
          <div key={project.id} className="space-y-3">
            <div className="flex gap-4">
              {project.boards.map((board, index) => (
               <SingleBoard
               key={`${project.id}-${board.name}`}
               board={board}
               boardIndex={index}
               projectId={project.id}
               setTaskBeingEdited={(data) => setTaskBeingEdited({ ...data, projectId: project.id })}
               onDeleteTask={onDeleteTask}
             />
             
              ))}
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
}
