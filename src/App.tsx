import { useState } from "react";
import { Status, Task } from "../src/types"

// ICONS
import { Plus, Kanban } from 'lucide-react';

// STORE
import { useTaskStore } from "./store/store";

// COMPONENTS
import { TaskModal } from "./Components/TaskModal";
import { Column } from "./Components/Column";
import { TaskCard } from "./Components/TaskCard";
import { TaskDetailsModal } from "./Components/TaskDetailsModal";

// DND-KIT
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';

const columns: Status[] = ['backlog', 'in-progress', 'review', 'completed'];

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};


const App = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const tasks = useTaskStore((state) => state.tasks);
  const moveTask = useTaskStore((state) => state.moveTask);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      moveTask(active.id as string, over.id as Status);
    }
    setActiveTask(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-950 backdrop-blur-sm border-b-2 border-gray-800 px-5 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-cursive text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
            <Kanban className="w-8 h-8 text-white animate-pulse" />
            WalnutBoard
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
            {columns.map((status) => (
              <Column
                key={status}
                status={status}
                tasks={tasks.filter((task) => task.status === status)}
                onTaskClick={setSelectedTask}
              />
            ))}
          </div>
          <DragOverlay dropAnimation={dropAnimation}>
            {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </main>

      {showAddModal && <TaskModal onClose={() => setShowAddModal(false)} />}
      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}

    </div>
  );
}

export default App;