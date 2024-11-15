"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@prisma/client";
import { GripVertical, Trash2 } from "lucide-react";
import { useRemoveTodoMutation } from "../_hooks/useRemoveTodoMutation";
import { useTodoCheckMutation } from "../_hooks/useTodoCheckMutation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function TodoCard({ todo }: { todo: Todo }) {
  const removeTodoMutation = useRemoveTodoMutation();
  const todoCheckMutation = useTodoCheckMutation();
  const [checked, setIsChecked] = useState(todo.done);
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2 rounded-md",
        checked ? "bg-secondary/80" : "bg-secondary/20"
      )}
    >
      <GripVertical className="w-4 h-4 text-muted-foreground" />
      <Checkbox
        checked={checked === true}
        disabled={todoCheckMutation.isPending}
        onCheckedChange={(checked) => {
          todoCheckMutation.mutate({ todo, status: checked === true });
          setIsChecked(checked === true);
        }}
      />
      <p
        className={cn(
          "me-auto",
          checked && "line-through text-muted-foreground"
        )}
      >
        {todo.title}
      </p>
      <Button
        disabled={removeTodoMutation.isPending}
        onClick={() => {
          removeTodoMutation.mutate(todo);
        }}
        className="text-muted-foreground"
        variant="ghost"
        size="icon"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
