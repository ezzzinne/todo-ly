export type Todo = {
  name: string;
  description: string;
  status: string;
  priority: string;
  duration: number;
  tags: string | string[];
  owner?: string;
  id: string;
  createdAt: number;
};

export type MetaData = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ApiResponse<T> = {
  data: T;
  meta: MetaData;
};
