import { createClient } from "@/util/supabase/client";
import { Todo } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

async function setTodoCheck(data: { todo: Todo; status: boolean }) {
  const supabase = createClient();

  const res = await supabase
    .from("todo")
    .update({ done: data.status })
    .eq("id", data.todo.id);

  return res;
}

export const useTodoCheckMutation = () => {
  const todoCheckMutation = useMutation({
    mutationFn: setTodoCheck,
  });

  return todoCheckMutation;
};
