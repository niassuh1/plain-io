"use client";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AddTodo } from "./add-todo";
import { useTodo } from "../_store/useTodo";
import { useTodoQuery } from "../_hooks/useTodoQuery";
import { TodoCard } from "./todo-card";
import { supabaseJs } from "@/lib/client";
import { Todo } from "@prisma/client";

export function TodoBoard({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(true);

  const todoQuery = useTodoQuery({ userId: userId! });
  const { todos, setTodos, push, remove } = useTodo();

  useEffect(() => {
    if (todoQuery.data) {
      setTodos(todoQuery.data as Todo[]);
    }
  }, [todoQuery.data]);

  useEffect(() => {
    //Subscribe to data insert
    supabaseJs
      .channel("todo insert")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "todo" },
        (payload) => {
          push(payload.new as Todo);
        }
      )
      .subscribe();

    //Subscribe to data delete
    supabaseJs
      .channel("todo delete")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "todo" },
        (payload) => {
          const newData = payload.new as Todo;
          if (newData.deleted_at) {
            console.log("Removing", newData);
            remove(newData);
          }
        }
      )
      .subscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-secondary transition-all ease-in-out mb-2">
          <ChevronRight
            className={cn(
              isOpen ? "rotate-90" : "rotate-0",
              "transition-all ease-in-out w-4 h-4"
            )}
          />
          <div>📅 Today</div>
        </CollapsibleTrigger>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0, translateY: -16 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{
                opacity: 0,
                translateY: -16,
                transition: { ease: "circInOut", duration: 0.15 },
              }}
              className="flex flex-col gap-4"
            >
              {todos?.map((v) => (
                <TodoCard key={v.id} todo={v} />
              ))}
              <AddTodo />
            </motion.div>
          )}
        </AnimatePresence>
      </Collapsible>
    </div>
  );
}
