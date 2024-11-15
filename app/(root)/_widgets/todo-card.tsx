import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical, Trash2 } from "lucide-react";

export function TodoCard({ todo }: { todo: { title: string; id: number } }) {
  return (
    <div className="flex items-center gap-2 bg-secondary/10 p-2 rounded-md">
      <GripVertical className="w-4 h-4 text-muted-foreground" />
      <Checkbox />
      <p className="me-auto">{todo.title}</p>
      <Button className="text-muted-foreground" variant="ghost" size="icon">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
