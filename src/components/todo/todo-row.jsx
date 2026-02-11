import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";

export default function TodoRow({ todo, onClick }) {
  return (
    <TableRow onClick={onClick} className="cursor-pointer">
      <TableCell>{todo.name}</TableCell>
      <TableCell>
        <Badge variant="outline">{todo.status}</Badge>
      </TableCell>
      <TableCell>{todo.priority}</TableCell>
    </TableRow>
  );
}
