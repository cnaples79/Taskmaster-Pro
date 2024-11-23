"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskDialog } from "@/components/task-dialog";
import { TaskList } from "@/components/task-list";
import { TaskFilter } from "@/components/task-filter";
import { Status } from "@/lib/store";

export function TaskBoard() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Status | "all">("all");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <TaskFilter value={filter} onValueChange={setFilter} />
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      <TaskList filter={filter} />
      <TaskDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}