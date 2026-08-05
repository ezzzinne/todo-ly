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

type CreateTodoProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (todo: {
    name: string;
    description: string;
    status: string;
    priority: string;
    duration: number;
    tags: string;
  }) => void;
};

export function CreateTodo({ open, onOpenChange, onCreate }: CreateTodoProps) {
  const initialForm = {
    name: "",
    description: "",
    status: "",
    priority: "",
    duration: "",
    tags: "",
  };

  const [form, setForm] = useState(initialForm);

  const [isCreating, setIsCreating] = useState(false);

  const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "DONE", "CANCELLED"];

  const PRIORITY_OPTIONS = ["LOW", "MEDIUM", "HIGH"];

  useEffect(() => {
    if (!open) setForm(initialForm);
  }, [open]);

  const handleSubmit = async () => {
    if (!form.name) {
      alert("Name of todo is required.");
      return;
    }
    if (!form.status) {
      alert("Status of todo is required.");
      return;
    }
    if (!form.priority) {
      alert("Priority of todo is required.");
      return;
    }
    try {
      setIsCreating(true);

      await onCreate({
        ...form,
        duration: Number(form.duration),
      });
      setForm(initialForm);
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>Create a new task.</DialogDescription>
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
                <SelectValue placeholder="Select todo status" />
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
          <Button type="button" onClick={handleSubmit} disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Todo"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
