import { useRef, FC, useContext } from "react";
import { TodosContext } from "../store/todos-context";
import classes from "./NewTodo.module.css";

const NewTodo: FC = () => {
  const todoCtx = useContext(TodosContext);

  const todoInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const title = todoInputRef.current?.value;
    if (title!.trim().length === 0) {
      return;
    }
    todoCtx.addTodo(title!);
    todoInputRef.current!.value = "";
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="title">Todo Title</label>
      <input ref={todoInputRef} type="text" id="title" />
      <br />
      <button type="submit">Add Todo</button>
    </form>
  );
};
export default NewTodo;
