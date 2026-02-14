import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function TodoRow({ todo, onClick, onDelete, onEdit }) {
  const { user } = useAuth();

  const canModify = (todo) => {
    if (!todo.owner) return true;
    if (todo.owner === user?.id) return true;
    return false;
  };

  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell className="p-4">
        <div className="flex flex-col gap-2">
          <button onClick={onClick} className="text-left cursor-pointer">
            <p className="font-medium text-surface-900 dark:text-white truncate">
              {todo.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Tap to view details
            </p>
          </button>
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell p-4">
        <Badge variant="outline">{todo.status}</Badge>
      </TableCell>
      <TableCell className="hidden sm:table-cell p-4">
        <Badge variant="secondary">{todo.priority}</Badge>
      </TableCell>
      <TableCell className="text-right">
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
                      onClick={() => canModify(todo) && onEdit(todo)}
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
                      onClick={() => canModify(todo) && onDelete(todo)}
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
      </TableCell>
    </TableRow>
  );
}
