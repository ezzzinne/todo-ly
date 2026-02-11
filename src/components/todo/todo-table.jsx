import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import TodoRow from "./todo-row";
import { TodoDetails } from "./todo-details";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";

export default function TodoTable({ todos = [], search, isLoading, isError }) {
  const [selectedTodoId, setSelectedTodoId] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = (todoId) => {
    setSelectedTodoId(todoId);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Spinner className="size-6" />
      </div>
    );
  }

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

  if (!isLoading && todos.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center text-muted-foreground">
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
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Mobile view*/}
      <div className="sm:hidden divide-y rounded-lg border bg-background w-full">
        {todos.map((todo) => (
          <button
            key={todo.id}
            className="w-full text-left p-4 active:bg-muted/50 transition"
            onClick={() => handleOpen(todo.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-base truncate">{todo.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tap to view details
                </p>
              </div>

              <div className="flex items-end">
                <Badge variant="outline" className="text-xs">
                  {todo.status}
                </Badge>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="hidden sm:block overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="text-left w-full sm:w-1/2">Todo</TableHead>
              <TableHead className="hidden sm:table-cell text-center sm:w-1/4">
                Status
              </TableHead>
              <TableHead className="hidden sm:table-cell text-center sm:w-1/4">
                Priority
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {todos.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                onClick={() => handleOpen(todo.id)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <TodoDetails id={selectedTodoId} open={open} onOpenChange={setOpen} />
    </div>
  );
}
