import { CommandItem } from "@/components/ui/command";
import { Project, projects } from "./project-selection";
import { IoMdCheckmark } from "react-icons/io";

export function SingleProjectCommandItem({
  project,
  taskCount,
  isSelected,
  onSelectedItem,
}: {
  project: Project;
  taskCount: number;
  isSelected: boolean;
  onSelectedItem: (project: Project) => void;
}) {
  // Destructure project
  const { name: projectName, tasks, icon: ProjectIcon } = project;

  return (
    <CommandItem
      value={projectName}
      onSelect={(value: string) => {
        const findProject = projects.find((proj) => proj.name === value);
        if (findProject) {
          onSelectedItem(findProject);
        }
      }}
      className="cursor-pointer hover:bg-gray-100 rounded-lg p-2"
    >
      <div className="flex items-center justify-between w-full">
        {/* Left: Project icon and info */}
        <div className="flex items-center gap-3">
          {/* Project icon */}
          <div className="size-8 bg-primary flex items-center justify-center rounded-md text-white">
            <ProjectIcon />
          </div>

          {/* Project name and task count */}
          <div className="flex flex-col">
            <span className="font-medium">{projectName}</span>
            <span className="text-[12px] text-gray-500">
              {taskCount} Tasks
            </span>
          </div>
        </div>

        {/* Right: checkmark if selected */}
        {isSelected && <IoMdCheckmark className="text-lg text-primary" />}
      </div>
    </CommandItem>
  );
}
