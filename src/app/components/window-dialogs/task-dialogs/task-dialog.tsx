"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { BiTask } from "react-icons/bi";

import TaskName from "./sub-components/task-name";
import TaskDescription from "./sub-components/task-description";
import ProjectsList from "./sub-components/project-list";
import BoardList from "./sub-components/BoardList";

import PriorityList from "./sub-components/priority-list";

import { Task } from "../../project-area/project-area-tasks-board/types/kanban";

type Props = {
  onAddTask?: (task: Task) => void;
  onSave?: (task: Task) => void;
  onClose?: () => void;
  task?: Task;
  boards?: string[];
  selectedProjectId?: string;
};

export default function TaskDialog({
  onAddTask,
  onSave,
  onClose,
  task,
  boards = ["Yet To Start", "In Progress", "Completed"],
  selectedProjectId = "",
}: Props) {
  const defaultBoard = boards[0] || "Yet To Start";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [board, setBoard] = useState<Task["board"]>(defaultBoard as Task["board"]);
  const [priority, setPriority] = useState("Low");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setBoard(task.board);
      setPriority(task.priority);
      setOpen(true);
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title.trim() || !selectedProjectId) {
      console.warn("❌ Missing title or selected project");
      return;
    }

    const newTask: Task = {
      id: task?.id ?? crypto.randomUUID(),
      title,
      description,
      priority,
      board,
      projectId: selectedProjectId,
    };

    console.log("✅ Task Submitted");
    console.log("🧾 Title:", title);
    console.log("📋 Description:", description);
    console.log("⚡ Priority:", priority);
    console.log("🗂️ Board:", board);
    console.log("📁 Project ID:", selectedProjectId);
    console.log("📦 Full Task Object:", newTask);

    if (task && onSave) {
      onSave(newTask);
    } else if (onAddTask) {
      onAddTask(newTask);
    }

    if (!task) {
      setTitle("");
      setDescription("");
      setBoard(defaultBoard as Task["board"]);
      setPriority("Low");
    }

    setOpen(false);
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) onClose?.();
      }}
    >
      {!task && (
        <DialogTrigger asChild>
          <Button
            className="rounded-3xl px-5"
            onClick={() => {
              setOpen(true);
              console.log("🟢 Dialog opened for Project:", selectedProjectId);
            }}
          >
            Add New Task
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="poppins max-w-3xl">
        <DialogHeader>
          <div className="size-10 bg-gray-200 rounded-full flex justify-center items-center">
            <BiTask className="text-xl text-gray-700" />
          </div>
          <div className="pt-2">
            <DialogTitle className="text-lg p-0 h-7">
              {task ? "Edit Task" : "New Task"}
            </DialogTitle>
            <DialogDescription className="p-0">
              Fill the form below to create or modify a task
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-4 left-0 absolute">
          <Separator />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="flex flex-col gap-3">
            <TaskName value={title} onChange={setTitle} />
            <TaskDescription value={description} onChange={setDescription} />
          </div>

          <div className="flex flex-col gap-[53px]">
          <BoardList
  value={board}
  onChange={(val) => setBoard(val as Task["board"])}
  boards={boards}
/>

            <PriorityList value={priority} onChange={setPriority} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSubmit}>
            {task ? "Update" : "Save Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
