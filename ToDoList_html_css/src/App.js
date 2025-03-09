import React, { useState, useEffect } from "react";
import TodoContainer from "./components/TodoContainer";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("saved-items"));
    if (savedTodos) setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("saved-items", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (content, dueDate) => {
    setTodos([...todos, { content, dueDate, complete: false }]);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <TodoContainer
      todos={todos}
      setTodos={setTodos}
      addTodo={addTodo}
      toggleComplete={toggleComplete}
      deleteTodo={deleteTodo}
      clearAll={clearAll}
    />
  );
}

export default App;
