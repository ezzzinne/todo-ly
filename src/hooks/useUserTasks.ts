import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { useTasksProps } from "./useTasks";
import type { ApiResponse, Todo } from "@/types/todo";

export function useUserTasks({ page, limit, search, status }: useTasksProps) {
  const shouldFetch = page != null;

  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (search) params.append("search", search);
  if (status && status !== "ALL") params.append("status", status);

  const query = params.toString();

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Todo[]>>(
    shouldFetch ? `/tasks/me?${query}` : null,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  return {
    todos: data?.data ?? [],
    meta: data?.meta ?? null,
    isLoading,
    isError: !!error,
    mutate,
  };
}
