export type TaskStatus = 'Not Started' | 'Submitted' | 'Approved' | 'Rejected';

export interface Task {
    id: string;
    title: string;
    description: string;
    instructions: string;
    assignedDate: string;
    status: TaskStatus; 
  }
  
  export interface Message {
    id: string;
    title: string;
    content: string;
    date: string; 
    read: boolean;
  }
  