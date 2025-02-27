import React, { useCallback, useEffect } from "react";
import TodoInput from "../molecules/TodoInput";
import TodoList from "./TodoList";
import Button from "../atoms/Button";
import styles from "./TodoContainer.module.css";

interface Todo {
  id: string;
  content: string;
  complete: boolean;
  dueDate?: string;
}

interface TodoContainerProps {
  todos: Todo[];
  addTodo: (content: string, dueDate?: string) => void;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, content: string, dueDate?: string) => void;
  clearAll: () => void;
  reorderTodos: (startIndex: number, endIndex: number) => void;
}

const TodoContainer: React.FC<TodoContainerProps> = ({
  todos,
  addTodo,
  toggleComplete,
  deleteTodo,
  editTodo,
  clearAll,
  reorderTodos,
}) => {
  // Page Load 여부를 추적하는 ref
  const isInitialMount = React.useRef(true);

  // Due Date 알림 확인
  const checkDueDateNotifications = useCallback(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const dueTodayTodos = todos.filter(
      (todo) => !todo.complete && todo.dueDate === todayStr
    );

    if (dueTodayTodos.length > 0) {
      alert(`오늘 마감일인 할 일이 ${dueTodayTodos.length}개 있습니다!`);
    }
  }, [todos]);

  // Page Load 시에만 알림 확인
  useEffect(() => {
    if (isInitialMount.current) {
      checkDueDateNotifications();
      isInitialMount.current = false;
    }
  }, [checkDueDateNotifications]);

  // 매일 자정에 알림 확인 (실제 앱에서는 더 복잡한 알림 시스템 필요)
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const timerId = setTimeout(checkDueDateNotifications, timeUntilMidnight);
    return () => clearTimeout(timerId);
  }, [checkDueDateNotifications]);

  return (
    <div className={styles.todoContainer}>
      <h1>To Do</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        reorderTodos={reorderTodos}
      />
      <div className={styles.deleteBtnWrap}>
        <Button onClick={clearAll}>Clear All</Button>
      </div>
    </div>
  );
};

export default TodoContainer;
