import React from "react";
import "./TodoList.css";
import TodoItem from "./TodoItem";
//import { Draggable } from "react-beautiful-dnd";

const TodoList = ({ todos, toggleComplete, deleteTodo }) => {
  return (
    <ul id="todoList">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          toggleComplete={() => toggleComplete(index)}
          deleteTodo={() => deleteTodo(index)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
