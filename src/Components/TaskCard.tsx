import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { Task } from '../types';

// ICONS 
import { CalendarRange, GripVertical, X } from 'lucide-react';
// COMPONENTS
import { useTaskStore } from '../store/store';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  onClick?: () => void;
}

export function TaskCard({ task, isDragging, onClick }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    low: 'bg-blue-500/20 text-blue-300',
    medium: 'bg-yellow-500/20 text-yellow-300',
    high: 'bg-red-500/20 text-red-300',
  };

  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click event when dragging
    if (!isSortableDragging && onClick) {
      onClick();
    }
  };

  // Handle deletion of the task
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className={`bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border cursor-move transition-all duration-200 group ${isSortableDragging || isDragging
        ? 'border-purple-500 ring-2 ring-purple-500/20 rotate-3 scale-105'
        : 'border-gray-700 hover:border-gray-600'
        }`}
    >
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-200 mb-2">{task.title}</h3>
        <div className="flex items-center gap-2">
          {/* Cross icon for deletion */}
          <X
            className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(e);
            }}
          />
          <GripVertical className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between text-sm">
        <span
          className={`px-2 py-1 rounded-full ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
        <div className="text-gray-400 flex items-center gap-2">
          <CalendarRange className="w-4 h-4" />
          <div>
            <div>{format(new Date(task.startDate), 'MMM d')}</div>
            <div>{format(new Date(task.endDate), 'MMM d')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
