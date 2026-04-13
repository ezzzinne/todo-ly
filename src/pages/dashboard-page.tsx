import { useAuth } from "@/hooks/useAuth";
import { useUserTasks } from "@/hooks/useUserTasks";
import TodoTable from "@/components/todo/todo-table";
import { CreateTodo } from "@/components/todo/create-todo";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "use-debounce";
import { Spinner } from "@/components/ui/spinner";
import type { Todo } from "../components/todo/todo-table";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [debouncedSearch] = useDebounce(search, 400);
  const { user } = useAuth();
  const { todos, meta, isLoading, isError, mutate } = useUserTasks({
    page: page.toString(),
    limit: "15",
    search: debouncedSearch,
    status,
  });
  const [openCreate, setOpenCreate] = useState(false);

  if (!user) return null;

  const completed = todos.filter((todo: Todo) => todo.status === "DONE").length;

  const pending = todos.filter(
    (todo: Todo) => todo.status === "IN_PROGRESS" || todo.status === "TODO",
  ).length;

  const cancelled = todos.filter((t: Todo) => t.status === "CANCELLED").length;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage and track your personal tasks.
          </p>
        </div>
        <Button
          onClick={() => setOpenCreate(true)}
          className="w-full sm:w-auto"
        >
          + New Todo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mx-auto" />
            ) : (
              <p className="text-2xl font-bold">{todos.length}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mx-auto" />
            ) : (
              <p className="text-2xl font-bold text-green-600">{completed}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mx-auto" />
            ) : (
              <p className="text-2xl font-bold text-yellow-600">{pending}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mx-auto" />
            ) : (
              <p className="text-2xl font-bold text-red-600">{cancelled}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mt-4 mb-4">
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
          {isLoading && (
            <div className="min-h-[20vh] flex justify-center items-center">
              <Spinner className="size-6" />
            </div>
          )}

          {isError && (
            <div className="min-h-[20vh] flex items-center justify-center px-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-destructive">
                  Failed to load tasks.
                </p>
                <p className="text-xs text-muted-foreground">
                  Please refresh and try again.
                </p>
              </div>
            </div>
          )}

          {!isLoading && todos.length === 0 && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center text-muted-foreground">
              {!search && <p>You haven't created any tasks yet.</p>}
              {search && (
                <>
                  <p className="text-base font-medium break-words max-w-full">
                    No results found for "{search}"
                  </p>
                  <p className="text-sm mt-1">
                    Try adjusting your search or filters.
                  </p>
                </>
              )}
            </div>
          )}

          {!isLoading && todos.length > 0 && (
            <TodoTable todos={todos} isError={isError} isLoading={isLoading} />
          )}
        </CardContent>
      </Card>

      <CreateTodo
        open={openCreate}
        onOpenChange={setOpenCreate}
        onCreate={async (newTodo) => {
          await api.post("/tasks", newTodo);
          mutate();
          setOpenCreate(false);
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
