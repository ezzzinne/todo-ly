import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";
import { EditTodoDialog } from "./edit-todo";
import { ConfirmDeleteDialog } from "./confirm-delete";
import { mutate } from "swr";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import TodoRow from "./todo-row";
import { TodoDetails } from "./todo-details";
import { Spinner } from "../ui/spinner";

export type Todo = {
  name: string;
  description: string;
  status: string;
  priority: string;
  duration: number;
  tags: string;
  owner?: string;
  id: string;
};

type TodoTableProps = {
  todos: Todo[];
  search?: string;
  isLoading: boolean;
  isError: boolean;
};

export default function TodoTable({
  todos = [],
  search,
  isLoading,
  isError,
}: TodoTableProps) {
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteTodo, setDeleteTodo] = useState<Todo | null>(null);
  const { user } = useAuth();

  const handleOpen = (todoId: string) => {
    setSelectedTodoId(todoId);
    setOpen(true);
  };

  const handleOpenEdit = (todo: Todo) => {
    setEditTodo(todo);
    setOpenEdit(true);
  };

  const handleOpenDelete = (todo: Todo) => {
    setDeleteTodo(todo);
    setOpenDelete(true);
  };

  const canModify = (todo: Todo) => {
    if (!todo.owner) return true;
    if (todo.owner === user?.id) return true;
    return false;
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
    <div className="max-w-5xl mx-auto  sm:px-6 py-6 sm:py-8">
      {/* Mobile view*/}
      <div className="sm:hidden divide-y rounded-lg border bg-background w-full">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-start justify-between gap-3 p-4 active:bg-muted/50 transition"
          >
            <button
              className="min-w-0 cursor-pointer text-left"
              onClick={() => handleOpen(todo.id)}
            >
              <p className="font-semibold text-base truncate">{todo.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Tap to view details
              </p>
            </button>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <DropdownMenuItem
                            disabled={!canModify(todo)}
                            onClick={() =>
                              canModify(todo) && handleOpenEdit(todo)
                            }
                          >
                            Edit
                          </DropdownMenuItem>
                        </div>
                      </TooltipTrigger>
                      {!canModify(todo) && (
                        <TooltipContent>
                          This task belongs to another user
                        </TooltipContent>
                      )}
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <DropdownMenuItem
                            className="text-destructive"
                            disabled={!canModify(todo)}
                            onClick={() =>
                              canModify(todo) && handleOpenDelete(todo)
                            }
                          >
                            Delete
                          </DropdownMenuItem>
                        </div>
                      </TooltipTrigger>
                      {!canModify(todo) && (
                        <TooltipContent>
                          This task belongs to another user
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipProvider>
            </div>
          </div>
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
              <TableHead className="text-right sm:w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {todos.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                onClick={() => handleOpen(todo.id)}
                onEdit={(todo) => setEditTodo(todo)}
                onDelete={(todo) => setDeleteTodo(todo)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <TodoDetails id={selectedTodoId} open={open} onOpenChange={setOpen} />
      <EditTodoDialog
        todo={editTodo}
        open={!!editTodo}
        onOpenChange={() => setEditTodo(null)}
        onSave={async (updatedTodo) => {
          await api.patch(`/tasks/${updatedTodo.id}`, updatedTodo);
          await mutate("/tasks");
          setEditTodo(null);
        }}
      />
      <ConfirmDeleteDialog
        open={!!deleteTodo}
        openDelete={openDelete}
        onOpenChange={() => setDeleteTodo(null)}
        onConfirm={async () => {
          if (deleteTodo) {
            await api.delete(`/tasks/${deleteTodo.id}`);
            await mutate("/tasks");
            setDeleteTodo(null);
          }
        }}
      />
    </div>
  );
}
