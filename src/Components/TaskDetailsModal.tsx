import { X, CalendarRange, Flag, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '../types';

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetailsModal({ task, onClose }: TaskDetailsModalProps) {
  const priorityColors = {
    low: 'bg-blue-500/20 text-blue-300',
    medium: 'bg-yellow-500/20 text-yellow-300',
    high: 'bg-red-500/20 text-red-300',
  };

  const statusColors = {
    backlog: 'text-pink-400',
    'in-progress': 'text-orange-400',
    review: 'text-blue-400',
    completed: 'text-green-400',
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Task Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{task.title}</h3>
            <p className="text-gray-300">{task.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <Flag size={16} className="text-gray-400" />
            <span className={`px-3 py-1 rounded-full text-sm ${priorityColors[task.priority]}`}>
              {task.priority} priority
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={16} className="text-gray-400" />
            <span className={`text-sm ${statusColors[task.status]}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CalendarRange size={16} className="text-gray-400" />
            <div className="text-sm text-gray-300">
              <div>Starts: {format(new Date(task.startDate), 'MMM d, yyyy')}</div>
              <div>Ends: {format(new Date(task.endDate), 'MMM d, yyyy')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}