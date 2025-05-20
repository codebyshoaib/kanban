import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Board } from "../project-area/project-area-tasks-board/types/kanban";

export default function CircularProgress({ boards }: { boards: Board[] }) {
  if (!boards || boards.length === 0) return null; // ✅ safely handle undefined or empty
  const totalTasks = boards.reduce((sum, board) => sum + board.tasks.length, 0);
  const completedTasks = boards.find(board => board.name === "Completed")?.tasks.length || 0;

  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const primaryColor = "#15A25F";

  return (
    <CircularProgressbar
      className="text-primary size-52 my-10"
      value={percentage}
      styles={{
        path: {
          stroke: primaryColor,
          strokeLinecap: "round",
          transition: "stroke-dashoffset 0.5s ease 0s",
        },
        trail: {
          stroke: "#e2e8f0",
        },
        text: {
          fill: primaryColor,
          fontSize: "16px",
        },
      }}
      text={`${percentage}%`}
    />
  );
}
