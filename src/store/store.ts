import { create } from 'zustand';
import { Task, Status } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  moveTask: (taskId: string, status: Status) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: crypto.randomUUID(),
          status: 'backlog',
        },
      ],
    })),
  moveTask: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    })),
}));