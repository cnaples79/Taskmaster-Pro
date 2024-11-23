"use client";

import { useTaskStore, type Status } from "@/lib/store";
import { TaskCard } from "@/components/task-card";

interface TaskListProps {
  filter: Status | "all";
}

export function TaskList({ filter }: TaskListProps) {
  const tasks = useTaskStore((state) => state.tasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Sort by status
    const statusOrder = { todo: 0, "in-progress": 1, completed: 2 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;

    // Then by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    // Then by due date
    if (a.dueDate && b.dueDate) {
      return a.dueDate.getTime() - b.dueDate.getTime();
    }
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;

    // Finally by creation date
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  if (sortedTasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No tasks found. Add some tasks to get started!
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sortedTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}