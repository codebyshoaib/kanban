import { Separator } from "@radix-ui/react-separator";
import { Board } from "../project-area/project-area-tasks-board/types/kanban";

// Type for each stat card
type TaskCard = {
  label: string;
  value: number;
};

// Stat Card UI Component
function SingleCard({ statCard }: { statCard: TaskCard }) {
  return (
    <div className="p-3 bg-gray-100 rounded-xl">
      <span className="text-gray-600 text-[12px]">
        {statCard.label.toUpperCase()}
      </span>
      <div className="flex gap-2 mt-1 items-center">
        <Separator className="w-1 h-4 bg-primary" orientation="vertical" />
        <span className="font-bold text-lg">{statCard.value}</span>
      </div>
    </div>
  );
}

export default function TasksStats({ boards }: { boards: Board[] }) {
  // Flatten all tasks from all boards
  const allTasks = boards.flatMap((b) => b.tasks);

  // Filter counts
  const total = allTasks.length;
  const inProgress = allTasks.filter((t) => t.board === "In Progress").length;
  const waiting = allTasks.filter((t) => t.board === "Yet To Start").length;
  const completed = allTasks.filter((t) => t.board === "Completed").length;

  const statisticCards: TaskCard[] = [
    { label: "total", value: total },
    { label: "in progress", value: inProgress },
    { label: "waiting", value: waiting },
    { label: "completed", value: completed },
  ];

  return (
    <div className="flex flex-col gap-2 mt-6">
      <span className="font-bold text-xl">Tasks</span>
      <div className="grid grid-cols-2 gap-3 mt-3">
        {statisticCards.map((statCard, index) => (
          <SingleCard key={index} statCard={statCard} />
        ))}
      </div>
    </div>
  );
}
