import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import TodoTable from "@/components/todo/todo-table";
import { CreateTodo } from "@/components/todo/create-todo";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { api } from "@/lib/axios";

export default function DashboardPage() {
  const { user } = useAuth();
  const { todos, isLoading, isError, mutate } = useTasks(1, 100);
  const [openCreate, setOpenCreate] = useState(false);

  if (!user) return null;

  const userTasks = todos.filter((todo) => todo.owner === user.id);

  const completed = userTasks.filter((todo) => todo.status === "DONE").length;

  const pending = userTasks.filter(
    (todo) => todo.status === "IN_PROGRESS" || todo.status === "TODO",
  ).length;

  const cancelled = userTasks.filter((t) => t.status === "CANCELLED").length;

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
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{userTasks.length}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
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
              <Skeleton className="h-8 w-16" />
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
            <p className="text-2xl font-bold text-red-600">{cancelled}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <p className="text-muted-foreground">Loading tasks...</p>
          )}

          {isError && <p className="text-destructive">Failed to load tasks.</p>}

          {!isLoading && userTasks.length === 0 && (
            <p className="text-muted-foreground">
              You haven't created any tasks yet.
            </p>
          )}

          {!isLoading && userTasks.length > 0 && (
            <TodoTable todos={userTasks} />
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
    </div>
  );
}
