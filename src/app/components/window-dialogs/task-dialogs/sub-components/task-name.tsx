import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function TaskName({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-75 text-sm font-medium">Task Title</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="h-11" />
    </div>
  );
}
