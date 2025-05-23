"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Project } from "../../project-area/project-area-tasks-board/types/kanban";
import { IconType } from "react-icons/lib";
import { FaQuestion } from "react-icons/fa6";
import ProjectCommandItems from "./project-command-items";

type Props = {
  projects: Project[];
  value: string;
  onChange: (projectId: string) => void;
};

export default function ProjectSelectionDropDown({
  projects,
  value,
  onChange,
}: Props) {
  const selectedProject = projects.find((p) => p.id === value) ?? null;
  const isDisabled = projects.length === 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isDisabled}
          variant="ghost"
          className={`w-full flex justify-between py-9 rounded-xl ${
            isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-gray-50"
          }`}
        >
          <div className="flex items-start flex-col text-[16px] gap-1">
            <p className="text-[13px] text-slate-500">PROJECT</p>
            <p className="font-bold">
              {isDisabled ? "Add a project" : selectedProject?.name}
            </p>
          </div>

          <div className="size-10 bg-primary rounded-full flex items-center justify-center text-2xl text-white">
            {selectedProject?.icon ? (
              <selectedProject.icon />
            ) : (
              <FaQuestion />
            )}
          </div>
        </Button>
      </PopoverTrigger>

      {!isDisabled && (
        <PopoverContent className="p-2 poppins rounded-xl">
          <ProjectCommandItems
            projects={projects}
            selectedProject={selectedProject}
            onSelect={onChange}
          />
        </PopoverContent>
      )}
    </Popover>
  );
}
