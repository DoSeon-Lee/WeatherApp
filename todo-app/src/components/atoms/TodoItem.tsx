import React, { useState } from "react";
import styles from "./TodoItem.module.css";

interface Todo {
  id: string;
  content: string;
  complete: boolean;
  dueDate?: string;
}

interface TodoItemProps {
  todo: Todo;
  toggleComplete: () => void;
  deleteTodo: () => void;
  editTodo: (content: string, dueDate?: string) => void;
  dragHandleProps?: any;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
  editTodo,
  dragHandleProps,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(todo.content);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");

  const handleEdit = () => {
    editTodo(editContent, editDueDate || undefined);
    setIsEditing(false);
  };

  const getDueDateColor = () => {
    if (!todo.dueDate) return "";

    const today = new Date();
    const dueDate = new Date(todo.dueDate);
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) return "red"; // 지난 날짜
    if (daysDiff <= 1) return "#ff9800"; // 오늘/내일
    return "#f1b116"; // 여유 있음
  };

  return (
    <li
      className={`${styles.todoItem} ${todo.complete ? styles.complete : ""}`}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={styles.editInput}
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className={styles.editDateInput}
          />
          <button onClick={handleEdit} className={styles.editButton}>
            save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className={styles.editButton}
          >
            cancel
          </button>
        </>
      ) : (
        <>
          <div
            className={`${styles.todoContent} ${
              todo.complete ? styles.completeContent : ""
            }`}
          >
            {dragHandleProps && (
              <span className={styles.dragHandle} {...dragHandleProps}>
                ⋮⋮
              </span>
            )}
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={toggleComplete}
              className={styles.checkbox}
            />
            <span>{todo.content}</span>
            {todo.dueDate && (
              <span
                className={styles.dueDateTag}
                style={{ color: getDueDateColor() }}
              >
                {todo.dueDate}
              </span>
            )}
          </div>

          <div className={styles.todoActions}>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
              disabled={todo.complete}
              style={{ opacity: todo.complete ? 0.5 : 1 }}
            >
              ✎
            </button>
            <button className={styles.deleteButton} onClick={deleteTodo}>
              ✕
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
