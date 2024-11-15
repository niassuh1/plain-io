import { createClient } from "@/util/supabase/client";
import { useMutation } from "@tanstack/react-query";

async function addTodo({ userId, title }: { userId: string; title: string }) {
  const supabase = createClient();
  const res = await supabase.from("todo").insert({
    created_by: userId,
    title: title,
  });

  return res;
}

export const useAddTodoMutation = (props?: { onSuccess: () => void }) => {
  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: props?.onSuccess,
  });

  return addTodoMutation;
};
