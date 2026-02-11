import { useTask } from "@/hooks/useTask";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export function TodoDetails({ id, open, onOpenChange }) {
  const { todo, isError, isLoading } = useTask(id, open);

  // console.log(id)
  // console.log(typeof id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Todo Details</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center py-6">
            <Spinner className="size-6" />
          </div>
        )}

        {isError && <p className="text-destructive">Failed to load task.</p>}

        {todo && (
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="text-base font-semibold">{todo.name}</h3>
              <p className="text-muted-foreground mt-1">{todo.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2">Status:</p>
                <Badge variant="outline">{todo.status}</Badge>
              </div>
              <div>
                <p className="mb-2">Priority:</p>
                <Badge variant="secondary">{todo.priority}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground mb-1">Owner</p>
                <p>{todo.owner || "—"}</p>
              </div>

              <div>
                <p className="text-muted-foreground mb-1">Duration</p>
                <p>{Math.round(todo.duration / 60) || "—"} hrs</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Tags</p>

              {todo.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(todo.tags)
                    ? todo.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))
                    : todo.tags?.split(",").map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag.trim()}
                        </Badge>
                      ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No tags</p>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
