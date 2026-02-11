import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";

export default function TodoRow({ todo, onClick }) {
  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell className="p-4">
        <div className="flex flex-col gap-2">
          <button onClick={onClick} className="text-left cursor-pointer">
            <p className="font-medium text-surface-900 dark:text-white truncate">
              {todo.name}
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
    </TableRow>
  );
}
