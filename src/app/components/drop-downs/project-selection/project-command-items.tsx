import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandList,
  } from "@/components/ui/command";
  import { Project, projects } from "./project-selection";
  import { SingleProjectCommandItem } from "./singleProjectItem";
  import { Dispatch, SetStateAction } from "react";
  
  interface ProjectCommandItemsProps {
    selectedProject: Project;
    setSelectedProject: Dispatch<SetStateAction<Project>>;
  }
  
  export default function ProjectCommandItems({
    selectedProject,
    setSelectedProject,
  }: ProjectCommandItemsProps) {
    // Handle project selection
    function handleProjectSelect(project: Project) {
      setSelectedProject(project);
    }
  
    return (
      <Command>
        <CommandInput placeholder="Search a project..." />
        <CommandList className="my-3">
          <CommandEmpty>No results found.</CommandEmpty>
  
          {/* Render project list */}
          <div className="flex flex-col gap-3">
            {projects.map((project, index) => (
              <SingleProjectCommandItem
                key={index}
                project={project}
                onSelectedItem={() => handleProjectSelect(project)}
                isSelected={selectedProject.name === project.name}
              />
            ))}
          </div>
        </CommandList>
      </Command>
    );
  }
  