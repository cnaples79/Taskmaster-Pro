"use client";

import { format } from "date-fns";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Task, useTaskStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const priorityColors = {
    low: "bg-blue-500/20 text-blue-500",
    medium: "bg-yellow-500/20 text-yellow-500",
    high: "bg-red-500/20 text-red-500",
  };

  const statusColors = {
    todo: "bg-slate-500/20 text-slate-500",
    "in-progress": "bg-blue-500/20 text-blue-500",
    completed: "bg-green-500/20 text-green-500",
  };

  return (
    <Card className="group relative">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <span
            className={cn(
              "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
              priorityColors[task.priority]
            )}
          >
            {task.priority}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => deleteTask(task.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold leading-none tracking-tight">
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-muted-foreground mt-2">
            {task.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {task.dueDate && (
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{format(task.dueDate, "MMM d")}</span>
            </div>
          )}
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            <span>{format(task.createdAt, "MMM d")}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            className={cn(
              "text-xs",
              statusColors[task.status]
            )}
            onClick={() => {
              const statusOrder = ["todo", "in-progress", "completed"] as const;
              const currentIndex = statusOrder.indexOf(task.status);
              const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
              updateTask(task.id, { status: nextStatus });
            }}
          >
            <CheckCircle2 className="mr-1 h-3 w-3" />
            {task.status}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}