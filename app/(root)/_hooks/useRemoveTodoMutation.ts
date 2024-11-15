import { createClient } from "@/util/supabase/client";
import { Todo } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

async function removeTodo(todo: Todo) {
  const supabase = createClient();

  const res = await supabase
    .from("todo")
    .update({ deleted_at: new Date().toUTCString() })
    .eq("id", todo.id);
  return res;
}

export const useRemoveTodoMutation = (props?: { onSuccess: () => void }) => {
  const removeTodoMutation = useMutation({
    mutationFn: removeTodo,
    onSuccess: props?.onSuccess,
  });

  return removeTodoMutation;
};
