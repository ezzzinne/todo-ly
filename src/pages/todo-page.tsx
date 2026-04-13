import { useState } from "react";
import TodoTable from "../components/todo/todo-table";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "use-debounce";
import { api } from "@/lib/axios";
import { CreateTodo } from "@/components/todo/create-todo";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// const PER_PAGE = 10;

export default function TodoPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [debouncedSearch] = useDebounce(search, 400);
  const [createOpen, setCreateOpen] = useState(false);
  const { todos, meta, isError, isLoading, mutate } = useTasks({
    page: page.toString(),
    limit: "10",
    search: debouncedSearch,
    status,
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className=" space-y-4">
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(user ? "/dashboard" : "/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {user ? "Back to Dashboard" : "Back to Home"}
          </Button>
        </div>
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

          <div className="flex gap-2 w-full sm:w-auto">
            {/* <Button
              onClick={() => setCreateOpen(true)}
              className="whitespace-nowrap cursor-pointer"
            >
              + New Todo
            </Button> */}
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="TODO">Todo</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="DONE">Done</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <TodoTable
        todos={todos}
        isLoading={isLoading}
        isError={isError}
        search={search}
        // mutate={mutate}
      />

      <CreateTodo
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={async (newTodo) => {
          await api.post("/tasks", newTodo);
          mutate();
          setCreateOpen(false);
        }}
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
