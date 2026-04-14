export type Todo = {
  name: string;
  description: string;
  status: string;
  priority: string;
  duration: number;
  tags: string;
  owner?: string;
  id: string;
};