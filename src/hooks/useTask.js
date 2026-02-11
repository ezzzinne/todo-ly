import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export function useTask(id, open = true) {
  const shouldFetch = id != null && open;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? `tasks/${id}` : null,
    fetcher,
  );

  return {
    todo: data ?? null,
    isLoading,
    isError: !!error,
  };
}
