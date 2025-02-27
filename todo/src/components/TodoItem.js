import React from "react";
import "./TodoItem.css";

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.complete ? "complete" : ""} onDoubleClick={deleteTodo}>
      <button onClick={toggleComplete}></button>
      <span>{todo.content}</span>
      {todo.dueDate && <span> | {todo.dueDate}</span>}
    </li>
  );
};

export default TodoItem;
