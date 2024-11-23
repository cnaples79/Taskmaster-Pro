import { TaskBoard } from "@/components/task-board";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <TaskBoard />
      </div>
    </main>
  );
}