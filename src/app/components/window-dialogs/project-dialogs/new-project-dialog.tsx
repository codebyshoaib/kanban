// components/window-dialogs/project-dialog.tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProjectDialog({
  onAddProject,
}: {
  onAddProject: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleAdd = () => {
    if (projectName.trim()) {
      onAddProject(projectName.trim());
      setProjectName("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-3xl h-10 shadow-none">Add New Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <Input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
        />
        <DialogFooter>
          <Button onClick={handleAdd}>Add Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
