import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useTasks(page, limit) {
  const shouldFetch = page != null;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? `/tasks?page=${page}&limit=${limit}` : null,
    fetcher,
  );

  return {
    todos: data?.data ?? [],
    meta: data?.meta ?? null,
    isLoading,
    isError: !!error,
  };
}
