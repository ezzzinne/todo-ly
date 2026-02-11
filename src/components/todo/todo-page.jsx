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
      <div className="min-h-[60vh] flex justify-center items-center">
        <Spinner className="size-6" />
      </div>
    );
  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-destructive">Failed to load tasks.</p>
          <p className="text-xs text-muted-foreground">
            Please refresh and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" space-y-4">
      <div className="items-start sm:items-center">
        <h1 className="text-xl sm:text-2xl font-semibold">All Todos</h1>
      </div>

      <TodoTable todos={todos} />

      <div className="flex items-center justify-between sm:justify-end gap-2 pt-2">
        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={!meta?.hasPreviousPage}
          onClick={() => setPage((page) => page - 1)}
        >
          Prev
        </Button>
        <div className="text-xs sm:text-sm text-muted-foreground px-2">
          Page {page} of {meta?.totalPages}
        </div>
        <Button
          className="cursor-pointer"
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
