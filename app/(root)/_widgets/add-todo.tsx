"use client";

import { Button } from "@/components/ui/button";

import { Plus, GripVertical, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useAddTodoMutation } from "../_hooks/useAddTodoMutation";
import { queryClient } from "@/lib/query-provider";

const addTodoFormSchema = z.object({
  title: z.string(),
});

export function AddTodo() {
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const session = useSession();

  const todoForm = useForm<z.infer<typeof addTodoFormSchema>>({
    resolver: zodResolver(addTodoFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const addTodoMutation = useAddTodoMutation({
    onSuccess: () => {
      // queryClient.refetchQueries({ queryKey: ["todo", data?.user.id] });
    },
  });

  function handleSubmit(data: z.infer<typeof addTodoFormSchema>) {
    console.log(data);
    addTodoMutation.mutate({
      title: data.title,
      userId: session.data?.user.id!,
    });
  }

  useEffect(() => {
    if (inputRef.current && isAdding) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  return (
    <div className="flex flex-col gap-2">
      {isAdding && (
        <Form {...todoForm}>
          <form
            onSubmit={todoForm.handleSubmit(handleSubmit)}
            className="flex gap-2 items-center px-2 bg-white"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <Checkbox disabled />
            <FormField
              control={todoForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="me-auto">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Add Todo Here"
                      ref={inputRef}
                      className="border-none focus:border-none focus:ring-0 focus-visible:ring-0 shadow-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => setIsAdding(false)}
              type="button"
            >
              <X className="w-4 h-4" />
            </Button>
          </form>
        </Form>
      )}
      <Button
        onClick={() => {
          setIsAdding((state) => !state);
        }}
        variant="secondary"
        className="flex items-center justify-start gap-4 w-full border-2 border-dashed"
      >
        <Plus />
        <div className="flex-1 text-start">Add Todo</div>
      </Button>
    </div>
  );
}
