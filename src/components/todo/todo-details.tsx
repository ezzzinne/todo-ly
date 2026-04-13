import { useTask } from "@/hooks/useTask";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";

type TodoDetailsProp = {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TodoDetails({ id, open, onOpenChange }: TodoDetailsProp) {
  const { todo, isError, isLoading } = useTask(id, open);
  const { user } = useAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg">Todo Details</DialogTitle>
          <DialogDescription>
            View detailed information about this task.
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center py-6">
            <Spinner className="size-6" />
          </div>
        )}

        {isError && (
          <div className="text-center space-y-2">
            <p className="text-sm text-destructive">Failed to load tasks.</p>
            <p className="text-xs text-muted-foreground">
              Please refresh and try again.
            </p>
          </div>
        )}

        {todo && (
          <div className="space-y-6 text-sm">
            <div className="space-y-1">
              <h3 className="text-base font-semibold">{todo.name}</h3>
              <p className="text-muted-foreground mt-1">
                {todo.description || "No description"}
              </p>
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
                <p>
                  {todo.owner === user?.id ? user?.name : todo.owner || "—"}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground mb-1">Duration</p>
                <p>{Math.round(todo.duration) || "—"} mins</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Tags</p>

              {todo.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(todo.tags)
                    ? todo.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))
                    : todo.tags
                        ?.split(",")
                        .map((tag: string, index: number) => (
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
