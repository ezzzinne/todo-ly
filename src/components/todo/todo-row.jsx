import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";

export default function TodoRow({ todo }) {
  return (
    <TableRow className="cursor-pointer">
      <TableCell>{todo.name}</TableCell>
      <TableCell>
        <Badge variant="outline">{todo.status}</Badge>
      </TableCell>
      <TableCell>{todo.priority}</TableCell>
    </TableRow>
  );
}
