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

export default function TodoTable({ todos = [] }) {
  const [selectedTodoId, setSelectedTodoId] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = (todoId) => {
    setSelectedTodoId(todoId);
    setOpen(true);
  };

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
