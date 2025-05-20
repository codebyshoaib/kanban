import SingleBoard from "./single-board";
import { Board ,Task} from "./types/kanban";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
export default function ProjectsAreaTasksBoard({
  boards,
  setTaskBeingEdited,
  setBoards,
}: {
  boards: Board[];
  setTaskBeingEdited: any;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const draggedTaskId = active.id.toString();
    const targetBoardName = over.id.toString();

    setBoards(prevBoards => {
      const updated = [...prevBoards];
      let taskToMove: Task | null = null;

      // Remove from source board
      for (let i = 0; i < updated.length; i++) {
        const taskIndex = updated[i].tasks.findIndex(t => t.id === draggedTaskId);
        if (taskIndex !== -1) {
          taskToMove = updated[i].tasks.splice(taskIndex, 1)[0];
          break;
        }
      }

      if (!taskToMove) return prevBoards;

      // Move to destination
      const targetBoard = updated.find(b => b.name === targetBoardName);
      if (targetBoard) {
        taskToMove.project = targetBoard.name;
        targetBoard.tasks.push(taskToMove);
      }

      return updated;
    });
  };
  
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
    <div className="h-full rounded-2xl flex items-center mt-4 gap-3">
      {boards.map((board, index) => (
        <SingleBoard
          key={index}
          board={board}
          boardIndex={index}
          setTaskBeingEdited={setTaskBeingEdited}
        />
      ))}
    </div>
  </DndContext>
  );
}
