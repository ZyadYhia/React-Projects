import { FC } from "react";
import Todo from "../model/todo";
import classes from "./TodoItem.module.css";

type TodoProp = {
  todo: Todo;
  onRemoveTodo: () => void;
};

const TodoItem: FC<TodoProp> = (props) => {
  return (
    <li onClick={props.onRemoveTodo} className={classes.item}>
      {props.todo.title}
    </li>
  );
};
export default TodoItem;
