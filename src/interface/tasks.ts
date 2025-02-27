//types.ts
export interface Task {
    id: string;
    task: string;
    topic: string;
    description?: string;
    dueDate?: string;
    priority: number;
    isDone: boolean;
    isArchived: boolean;
}
  