// board-list.tsx
"use client";

type Props = {
  value: string;
  onChange: (val: string) => void;
  boards: string[];
};

export default function BoardList({ value, onChange, boards }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">Board</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        {boards.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
    </div>
  );
}
