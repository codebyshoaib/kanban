export type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  board: "Yet To Start" | "In Progress" | "Completed";
  projectId: string;
};

export type Board = {
  name: "Yet To Start" | "In Progress" | "Completed";
  tasks: Task[];
  projectId: string;
};

export type Project = {
  id: string;
  name: string;
  boards: Board[];
};
