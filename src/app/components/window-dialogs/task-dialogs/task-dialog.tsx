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
import PriorityList from "./sub-components/priority-list";

export type Task = {
  title: string;
  description: string;
  project: string;
  priority: string;
};

export default function TaskDialog({
  onAddTask,
  onSave,
  task,
  onClose,
  boards = ["Yet To Start", "In Progress", "Completed"]
}: {
  onAddTask?: (task: Task) => void;
  onSave?: (task: Task) => void;
  onClose?: () => void;
  task?: Task;
  boards?: string[];
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState(boards[0] || "Yet To Start");
  const [priority, setPriority] = useState("Low");
  const [open, setOpen] = useState(false);

  // Initialize form fields when editing
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setProject(task.project);
      setPriority(task.priority);
      setOpen(true);
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask: Task = { title, description, project, priority };

    if (onSave) {
      onSave(newTask);
    } else if (onAddTask) {
      onAddTask(newTask);
    }

    // Clear & close
    setTitle("");
    setDescription("");
    setProject(boards[0] || "Yet To Start");
    setPriority("Low");
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => {
      setOpen(v);
      if (!v && onClose) onClose();
    }}>
      {!task && (
        <DialogTrigger asChild>
          <Button className="rounded-3xl px-5">Add New Task</Button>
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
            <ProjectsList value={project} onChange={setProject} boards={boards} />
            <PriorityList value={priority} onChange={setPriority} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSubmit}>{task ? "Update" : "Save Task"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
