import { Todo } from "@prisma/client";
import { create } from "zustand";

interface TodoStore {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  push: (todo: Todo) => void;
  remove: (todo: Todo) => void;
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
  remove(todo) {
    set((state) => {
      const newTodos = [...state.todos].filter((value) => value.id != todo.id);
      console.log(newTodos);

      return { ...state, todos: newTodos };
    });
  },
  todos: [],
}));
