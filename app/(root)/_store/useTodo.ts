import { Database } from "@/types/database.types";
import { create } from "zustand";
interface Todo {
  created_by: string;
  id: number;
  title: string;
}

interface TodoStore {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  push: (todo: Todo) => void;
}

export const useTodo = create<TodoStore>((set) => ({
  setTodos(todos) {
    set((state) => ({ ...state, todos: todos }));
  },
  push(todo) {
    set((state) => {
      const newTodos = [...state.todos];
      newTodos.push(todo);
      return { ...state, todos: newTodos };
    });
  },
  todos: [],
}));
