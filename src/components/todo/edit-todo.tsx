import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";
import type { Todo } from "@/types/todo";

type TodoForm = Omit<Todo, "duration" | "id"> & {
  duration: string;
};

type EditTodoDialogProps = {
  todo: Todo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (todo: Todo) => Promise<void> | void;
};

export function EditTodoDialog({
  todo,
  open,
  onOpenChange,
  onSave,
}: EditTodoDialogProps) {
  const [form, setForm] = useState<TodoForm>({
    name: "",
    description: "",
    status: "",
    priority: "",
    duration: "",
    tags: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "DONE", "CANCELLED"];

  const PRIORITY_OPTIONS = ["LOW", "MEDIUM", "HIGH"];

  useEffect(() => {
    if (todo) {
      setForm({
        name: todo.name || "",
        description: todo.description || "",
        status: todo.status || "",
        priority: todo.priority || "",
        duration: todo.duration == null ? "" : String(todo.duration),
        tags: todo.tags || "",
      });
    }
  }, [todo]);

  const handleSubmit = async () => {
    try {
      setIsSaving(true);

      if (!todo) return;

      await onSave({
        ...todo,
        ...form,
        duration: Number(form.duration),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>Edit todo information.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label>Task Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) => setForm({ ...form, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Priority</Label>
            <Select
              value={form.priority}
              onValueChange={(value) => setForm({ ...form, priority: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {PRIORITY_OPTIONS.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Duration (mins)</Label>
            <Input
              type="number"
              value={form.duration}
              onChange={(e) =>
                setForm({
                  ...form,
                  duration: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>Tags</Label>
            <Input
              value={form.tags}
              onChange={(e) =>
                setForm({
                  ...form,
                  tags: e.target.value,
                })
              }
            />
          </div>

          <Button type="button" onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
