import React, { useState } from "react";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";
import styles from "./TodoInput.module.css";

interface TodoInputProps {
  addTodo: (content: string, dueDate?: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddClick = () => {
    if (inputValue.trim()) {
      addTodo(inputValue.trim(), dueDate);
      setInputValue("");
      setDueDate("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddClick(); // Enter 키가 눌렸을 때 항목 추가
    }
  };

  return (
    <div className={styles.inputField}>
      <InputField
        type="text"
        value={inputValue}
        placeholder="Add to your list..."
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress} // Enter 키 처리 추가
      />
      <InputField
        type="date"
        value={dueDate}
        placeholder="Due date"
        onChange={(e) => setDueDate(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={handleAddClick} /> {/* '+' 기호가 기본으로 표시됨 */}
    </div>
  );
};

export default TodoInput;
