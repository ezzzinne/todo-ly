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

export default function TodoTable({ todos }) {
  const [selectedTodoId, setSelectedTodoId] = useState();
  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <>
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
            <TodoRow
              key={todo.id}
              todo={todo}
              onClick={() => {
                setSelectedTodoId(todo.id);
                setOpen(true);
              }}
            />
          ))}
        </TableBody>
      </Table>
      <TodoDetails id={selectedTodoId} open={open} onOpenChange={setOpen} />
    </>
  );
}
