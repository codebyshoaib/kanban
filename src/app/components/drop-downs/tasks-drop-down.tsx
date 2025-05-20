"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

type MenuItem = {
  icon: JSX.Element;
  label: string;
  className?: string;
  separator?: boolean;
};

export default function TasksDropDown({
  onEdit,
}: {
  onEdit: () => void;
}) {
  const menuItems: MenuItem[] = [
    {
      icon: <FaRegEdit />,
      label: "Edit Task",
      className: "",
    },
    {
      icon: <MdOutlineDelete className="text-lg" />,
      label: "Delete Task",
      className: "text-red-600",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="poppins">
        {menuItems.map((item, index) =>
          item.separator ? (
            <DropdownMenuSeparator key={index} />
          ) : (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                if (item.label === "Edit Task") {
                  onEdit(); // ✅ this is what was missing!
                }
              }}
              className={`flex items-center gap-1 p-[10px] ${item.className}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
