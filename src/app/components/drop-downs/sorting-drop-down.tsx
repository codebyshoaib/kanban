"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";

const options = ["A-Z", "Z-A"];

export function SortingDropDown() {
  // Selection option state
  const [selectedOption, setSelectedOption] = React.useState("A-Z");

  // JSX
  return (
    <DropdownMenu>
      {/* Trigger button */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="font-medium text-sm">{selectedOption}</span>

          {/* Optional rendering of the icons based on the selected option */}
          {selectedOption === "A-Z" ? (
            <IoMdArrowDown className="text-sm" />
          ) : (
            <IoMdArrowUp className="text-sm" />
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* Drop down content options */}
      <DropdownMenuContent className="w-20 poppins">
        {options.map((option, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            className="h-9"
            checked={selectedOption === option}
            // When user clicks on the option, update selected state
            onCheckedChange={() => setSelectedOption(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
