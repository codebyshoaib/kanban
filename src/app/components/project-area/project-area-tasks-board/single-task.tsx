import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TasksDropDown from "../../drop-downs/tasks-drop-down";
import { GripVertical } from "lucide-react";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import { Task } from "./types/kanban";
import { Button } from "@/components/ui/button";

export default function SingleTask({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `${task.id}:${task.projectId}`,
    });

  const priorityStyleMap: Record<
    string,
    { icon: JSX.Element; bg: string; text: string }
  > = {
    Low: {
      icon: <MdKeyboardDoubleArrowDown className="mb-[2px]" />,
      bg: "bg-green-500/15",
      text: "text-green-900",
    },
    Medium: {
      icon: <MdKeyboardDoubleArrowRight className="mb-[2px]" />,
      bg: "bg-yellow-500/15",
      text: "text-yellow-900",
    },
    High: {
      icon: <MdOutlineKeyboardDoubleArrowUp className="mb-[2px]" />,
      bg: "bg-red-500/15",
      text: "text-red-900",
    },
  };

  const priority = priorityStyleMap[task.priority] || priorityStyleMap["Low"];

  return (
    <Card
    key={task.id}
    ref={setNodeRef}
    style={{
      transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined,
      opacity: isDragging ? 0.5 : 1,
    }}
    className="shadow-none cursor-default"
  >
    <CardHeader className="p-4">
      <div className="flex justify-between items-center">
        <div
          className={`p-1 py-[4px] ${priority.bg} rounded-3xl px-2 pr-4 font-medium ${priority.text} flex items-center gap-1 text-sm`}
        >
          {priority.icon}
          <span className="text-[12px]">{task.priority}</span>
        </div>
  
        <div className="flex items-center gap-2">
          {/* ✅ Separate drag handle */}
          <div
            className="cursor-grab"
            {...listeners}
            {...attributes}
          >
            <GripVertical size={18} />
          </div>
  
          {/* Buttons work properly now */}
          <TasksDropDown onEdit={onEdit} onDelete={onDelete} />
         
        </div>
      </div>
    </CardHeader>
  
    <CardContent className="flex flex-col gap-3 mt-1">
      <span className="font-bold text-lg">{task.title}</span>
      <span className="text-sm text-gray-600">{task.description}</span>
    </CardContent>
  </Card>
  
  );
}
