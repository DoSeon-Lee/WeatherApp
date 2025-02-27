import React, { useState, useEffect } from "react";
import TodoContainer from "./components/organisms/TodoContainer";
import { v4 as uuidv4 } from "uuid"; // uuid 패키지 설치 필요: npm install uuid @types/uuid

interface Todo {
  id: string;
  content: string;
  complete: boolean;
  dueDate?: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // 로컬 스토리지에서 데이터 불러오기
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });

  // todos가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (content: string, dueDate?: string) => {
    setTodos([...todos, { id: uuidv4(), content, complete: false, dueDate }]);
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, content: string, dueDate?: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, content, dueDate } : todo
      )
    );
  };

  const clearAll = () => {
    setTodos([]);
  };

  const reorderTodos = (startIndex: number, endIndex: number) => {
    const result = Array.from(todos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTodos(result);
  };

  return (
    <div className="app-container">
      <TodoContainer
        todos={todos}
        addTodo={addTodo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        clearAll={clearAll}
        reorderTodos={reorderTodos}
      />
    </div>
  );
};

export default App;
