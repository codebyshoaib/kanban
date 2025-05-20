import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgress() {
  const percentage = 66;
  const primaryColor = "#15A25F";

  return (
    <CircularProgressbar
      className="text-primary size-52 my-10"
      value={percentage}
      styles={{
        // Customize the path (progress bar)
        path: {
          stroke: primaryColor,              // Progress color
          strokeLinecap: "round",            // Rounded edges
          transition: "stroke-dashoffset 0.5s ease 0s", // Smooth animation
        },
        // Customize the trail (background)
        trail: {
          stroke: "#e2e8f0",                 // Light gray background
        },
        // Customize the text
        text: {
          fill: primaryColor,                // Text color
          fontSize: "16px",                  // Text size
        },
      }}
      text={`${percentage}%`}
    />
  );
}
