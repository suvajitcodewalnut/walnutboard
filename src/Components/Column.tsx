import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Status, Task } from '../types';

// ICONS 
import { ListTodo, Timer, Eye, CheckCircle2 } from 'lucide-react';
// COMPONENTS
import { TaskCard } from './TaskCard';

interface ColumnProps {
  status: Status;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const statusConfig = {
  backlog: {
    title: 'BACKLOG',
    gradient: 'from-pink-500 to-rose-500',
    icon: ListTodo,
  },
  'in-progress': {
    title: 'INPROGRESS',
    gradient: 'from-orange-500 to-amber-500',
    icon: Timer,
  },
  review: {
    title: 'REVIEW',
    gradient: 'from-blue-500 to-cyan-500',
    icon: Eye,
  },
  completed: {
    title: 'COMPLETED',
    gradient: 'from-green-500 to-emerald-500',
    icon: CheckCircle2,
  },
};

export function Column({ status, tasks, onTaskClick }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const Icon = statusConfig[status].icon;

  return (
    <div className="flex flex-col h-full">
      <h2
        className={`text-xl font-bold mb-4 bg-gradient-to-r ${statusConfig[status].gradient} bg-clip-text text-transparent flex items-center gap-2`}
      >
        <Icon className="w-6 h-6 text-white" />
        {statusConfig[status].title}
      </h2>
      <div
        ref={setNodeRef}
        className={`flex-1 bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border ${
          isOver 
            ? 'border-purple-500 ring-2 ring-purple-500/20' 
            : 'border-gray-800'
        } transition-all duration-200`}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task}
                onClick={() => onTaskClick(task)}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}