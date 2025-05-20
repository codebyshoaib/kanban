import { Separator } from "@radix-ui/react-separator";

// Define the type of each card
type TaskCard = {
  label: string;
  value: number;
};

// Component for each stat card
function SingleCard({ statCard }: { statCard: TaskCard }) {
  return (
    <div className="p-3 bg-gray-100 rounded-xl">
      {/* Label of each stat card */}
      <span className="text-gray-600 text-[12px]">
        {statCard.label.toUpperCase()}
      </span>

      {/* Vertical line and the number value */}
      <div className="flex gap-2 mt-1 items-center">
        <Separator className="w-1 h-4 bg-primary" orientation="vertical" />
        <span className="font-bold text-lg">{statCard.value}</span>
      </div>
    </div>
  );
}

export default function TasksStats() {
  // Statistic cards array
  const statisticCards: TaskCard[] = [
    { label: "total", value: 234 },
    { label: "in progress", value: 231 },
    { label: "waiting", value: 342 },
    { label: "completed", value: 212 },
  ];

  // JSX
  return (
    <div className="flex flex-col gap-2">
      {/* Tasks label */}
      <span className="font-bold text-xl">Tasks</span>

      {/* Mapping the array */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        {statisticCards.map((statCard, index) => (
          <SingleCard key={index} statCard={statCard} />
        ))}
      </div>
    </div>
  );
}
