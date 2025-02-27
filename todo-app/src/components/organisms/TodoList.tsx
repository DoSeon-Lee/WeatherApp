import React from "react";
import TodoItem from "../atoms/TodoItem";
import styles from "./TodoList.module.css";

interface Todo {
  id: string;
  content: string;
  complete: boolean;
  dueDate?: string;
}

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, content: string, dueDate?: string) => void;
  reorderTodos: (startIndex: number, endIndex: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleComplete,
  deleteTodo,
  editTodo,
}) => {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={() => toggleComplete(todo.id)}
          deleteTodo={() => deleteTodo(todo.id)}
          editTodo={(content, dueDate) => editTodo(todo.id, content, dueDate)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
