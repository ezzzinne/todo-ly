import { useState } from "react";
import TodoTable from "./todo-table";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import { useTasks } from "@/hooks/useTasks";

const PER_PAGE = 10;

export default function TodoPage() {
  const [page, setPage] = useState(1);
  const { todos, meta, isError, isLoading } = useTasks(page, PER_PAGE);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Spinner className="size-6" />
      </div>
    );
  if (isError) return <p>Failed to load tasks</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-4">Tasks</h1>
      </div>

      <TodoTable todos={todos} />

      <div className="flex gap-2 justify-end items-center">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          Prev
        </Button>
        <span className="px-2 text-sm">
          Page {page} of {meta?.totalPages}
        </span>
        <Button
          variant="outline"
          disabled={!meta?.hasNextPage}
          onClick={() => setPage((page) => page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
