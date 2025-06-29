export type TaskStatus = 'Not Started' | 'Submitted' | 'Approved' | 'Rejected';

export interface Task {
    id: string;
    title: string;
    description: string;
    instructions: string;
    assignedDate: string;
    status: TaskStatus; 
  }
  