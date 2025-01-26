import { createContext, FC, useState } from "react";
import Todo from "../model/todo";

type ctxType = {
  items: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = createContext<ctxType>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

const TodosContextProvider: FC = (props: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addToHandler = (title: string) => {
    console.log(todos);
    setTodos((prevTodos) => {
      // return [...prevTodos, new Todo(title, completed)];
      return prevTodos.concat(new Todo(title)); // same as above
    });
  };
  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };
  const ctxValue: ctxType = {
    items: todos,
    addTodo: addToHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={ctxValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
