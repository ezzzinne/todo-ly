import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useTasks(page, limit, search, status) {
  const shouldFetch = page != null;

  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (search) params.append("search", search);
  if (status && status !== "ALL") params.append("status", status);

  const query = params.toString();

  const { data, error, isLoading } = useSWR(
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
  };
}
