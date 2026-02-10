import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TodoRow from "./todo-row";

export default function TodoTable({ todos }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Todo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {todos.map((todo) => (
          <TodoRow key={todo.id} todo={todo} />
        ))}
      </TableBody>
    </Table>
  );
}
