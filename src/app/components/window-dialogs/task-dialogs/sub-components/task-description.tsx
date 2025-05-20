import { Label } from "@/components/ui/label"; // ✅ correct import
import { FaCircleExclamation } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function TaskDescription({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {/* Label */}
      <Label className="opacity-75 text-sm font-medium">Task Description</Label>

      {/* Textarea Input */}
      <Textarea
        value={value}
        onChange={(e) => {
          const input = e.target.value;
          if (input.length <= 50) {
            onChange(input);
          }
        }}
        placeholder="Give a description of the task..."
        className="resize-none"
      />

      {/* Error + Character Counter */}
      <div className="flex justify-between items-center">
        {/* Static Error (customize later)
        <div className="text-red-500 text-[12px] flex items-center gap-1">
          <FaCircleExclamation />
          <p>This is an error</p>
        </div> */}

        {/* Character Counter */}
        <p className="text-[12px] text-gray-500">
          {value.length} / 50 characters
        </p>
      </div>
    </div>
  );
}
