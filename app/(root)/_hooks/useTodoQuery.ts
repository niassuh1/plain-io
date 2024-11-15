import { createClient } from "@/util/supabase/client";
import { useQuery } from "@tanstack/react-query";

async function fetchTodo({ userId }: { userId: string }) {
  const supabase = createClient();
  const res = await supabase
    .from("todo")
    .select("*")
    .eq("created_by", userId)
    .is("deleted_at", null)
    .order("done");
  return res.data;
}

export const useTodoQuery = ({ userId }: { userId: string }) => {
  const todoQuery = useQuery({
    queryKey: ["todo", userId],
    queryFn: () => fetchTodo({ userId }),
  });

  return todoQuery;
};
