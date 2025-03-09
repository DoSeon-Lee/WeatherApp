import React from "react";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./TodoContainer.css"; // CSS 임포트
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoContainer = ({
  todos,
  setTodos,
  addTodo,
  toggleComplete,
  deleteTodo,
  clearAll,
}) => {
  /*
  const handleDragEnd = (result) => {
    if (!result.destination) return; // 드롭되지 않은 경우
    const reorderedTodos = Array.from(todos);
    const [movedTodo] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, movedTodo);
    setTodos(reorderedTodos);
  };
  */
  return (
    <div className="todo-container">
      <h1>To Do</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
      <div className="delete-btn-wrap">
        <button className="delete-btn" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default TodoContainer;
