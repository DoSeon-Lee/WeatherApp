import React, { useState } from "react";
import "./TodoInput.css";

const TodoInput = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddClick = () => {
    if (inputValue) {
      addTodo(inputValue, dueDate);
      setInputValue("");
      setDueDate("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddClick();
    }
  };

  return (
    <div id="inputField">
      <input
        type="text"
        value={inputValue}
        placeholder="Add to your list..."
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress} // Enter 키 처리
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleAddClick}>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};

export default TodoInput;
