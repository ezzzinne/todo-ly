import { fetcher } from "@/lib/fetcher";
import type { Todo } from "@/types/todo";
import useSWR from "swr";

export function useTask(id: string | null, open = true) {
  const shouldFetch = id != null && open;

  const { data, error, isLoading } = useSWR<Todo>(
    shouldFetch ? `/tasks/${id}` : null,
    fetcher,
  );

  return {
    todo: data ?? null,
    isLoading,
    isError: !!error,
  };
}
