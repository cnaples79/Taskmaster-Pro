import { GanttChartSquare } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center space-x-2">
          <GanttChartSquare className="h-6 w-6 text-blue-500" />
          <span className="font-bold">TaskMaster Pro</span>
        </div>
      </div>
    </header>
  );
}