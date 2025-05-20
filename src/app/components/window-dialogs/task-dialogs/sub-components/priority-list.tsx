"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@radix-ui/react-dropdown-menu";

import {
  IoIosArrowDown,
  IoMdCheckmark,
} from "react-icons/io";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";

import { IconType } from "react-icons/lib";

type PriorityItem = {
  name: string;
  icon: IconType;
  textColor: string;
  backgroundColor: string;
};

const PriorityListArray: PriorityItem[] = [
  {
    name: "Low",
    icon: RiArrowDownDoubleFill,
    textColor: "text-green-700",
    backgroundColor: "bg-green-500/10",
  },
  {
    name: "Medium",
    icon: MdKeyboardDoubleArrowRight,
    textColor: "text-yellow-700",
    backgroundColor: "bg-yellow-500/10",
  },
  {
    name: "High",
    icon: MdOutlineKeyboardDoubleArrowUp,
    textColor: "text-red-700",
    backgroundColor: "bg-red-500/10",
  },
];

export default function PriorityList({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const getPriorityStyle = (priorityName: string) => {
    return (
      PriorityListArray.find((p) => p.name === priorityName) ||
      PriorityListArray[0]
    );
  };

  const current = getPriorityStyle(value);

  function renderSelectedPriority() {
    return (
      <div className="flex items-center gap-2">
        <div
          className={`size-6 ${current.backgroundColor} rounded-md flex items-center justify-center text-lg ${current.textColor}`}
        >
          <current.icon />
        </div>
        <span className={`${current.textColor}`}>{current.name}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-75 text-sm font-medium">Priority</Label>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
          >
            {renderSelectedPriority()}
            <IoIosArrowDown className="text-muted-foreground size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="poppins w-full">
          {PriorityListArray.map((priority, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                onChange(priority.name); // ✅ updates parent state
              }}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`size-6 ${priority.backgroundColor} rounded-md flex items-center justify-center text-lg ${priority.textColor}`}
                >
                  <priority.icon />
                </div>
                <span className={`${priority.textColor}`}>{priority.name}</span>
              </div>
              {value === priority.name && (
                <IoMdCheckmark className="text-muted-foreground size-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
