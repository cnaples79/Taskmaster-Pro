"use client";

import { Button } from "@/components/ui/button";
import { Status } from "@/lib/store";

interface TaskFilterProps {
  value: Status | "all";
  onValueChange: (value: Status | "all") => void;
}

export function TaskFilter({ value, onValueChange }: TaskFilterProps) {
  const filters: Array<{ value: Status | "all"; label: string }> = [
    { value: "all", label: "All" },
    { value: "todo", label: "To Do" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="flex items-center space-x-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={value === filter.value ? "default" : "outline"}
          size="sm"
          onClick={() => onValueChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}