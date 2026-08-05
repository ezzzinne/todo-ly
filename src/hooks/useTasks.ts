import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { ApiResponse, Todo } from "@/types/todo";

export type useTasksProps = {
  page: string;
  limit: string;
  search: string;
  status: string;
};

export function useTasks({ page, limit, search, status }: useTasksProps) {
  const shouldFetch = !isNaN(Number(page)) && page.trim() !== "";

  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (search) params.append("search", search);
  if (status && status !== "ALL") params.append("status", status);

  const query = params.toString();

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Todo[]>>(
    shouldFetch ? `/tasks?${query}` : null,
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
