export interface TodoItem {
  id: number;
  title: string;
  description?: string;
  dueDate?: number;
  completed: boolean;
}

export interface TodoItemAtCreation {
  id: number;
  title: string;
  description?: string;
  dueDate?: number;
}

export interface TodoItemAtUpdate {
  id: number;
  title?: string;
  description?: string;
  dueDate?: number;
  completed?: boolean;
}
