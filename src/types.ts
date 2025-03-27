export type Priority = 'low' | 'medium' | 'high';

export type Status = 'backlog' | 'in-progress' | 'review' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  startDate: string;
  endDate: string;
  status: Status;
}