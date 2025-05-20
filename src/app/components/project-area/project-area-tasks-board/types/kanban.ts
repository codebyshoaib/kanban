export type Task = {
    id: string; // ✅ stable unique ID for drag
    title: string;
    description: string;
    priority: string;
    project: string;
  };
  
  export type Board = {
    name: string;
    createdAt: Date;
    tasks: Task[];
  };
  