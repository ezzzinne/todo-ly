import { useState } from "react";
import TodoTable from "./todo-table";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import { useTasks } from "@/hooks/useTasks";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "use-debounce";

const PER_PAGE = 10;

export default function TodoPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [debouncedSearch] = useDebounce(search, 400);
  const { todos, meta, isError, isLoading } = useTasks(
    page,
    PER_PAGE,
    debouncedSearch,
    status,
  );

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = status === "ALL" ? true : todo.status === status;

    return matchesSearch && matchesStatus;
  });

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className=" space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mt-4">
        <div className="relative w-full sm:max-w-sm">
          <Input
            placeholder="Search todos..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pr-10"
          />

          {search && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm px-2 cursor-pointer"
            >
              x
            </button>
          )}
        </div>

        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="TODO">Todo</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TodoTable
        todos={filteredTodos}
        isLoading={isLoading}
        isError={isError}
        search={search}
      />

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
