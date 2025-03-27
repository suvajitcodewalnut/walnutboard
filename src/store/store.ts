// store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Status } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  moveTask: (taskId: string, status: Status) => void;
  deleteTask: (taskId: string) => void; // New deletion method
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
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
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
    }),
    {
      name: 'walnutboard',
    }
  )
);
