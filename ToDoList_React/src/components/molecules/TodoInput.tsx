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

  //추가되는 List 항목
  const handleAddClick = () => {
    if (inputValue.trim()) {
      addTodo(inputValue.trim(), dueDate);
      setInputValue("");
      setDueDate("");
    }
  };

  // Enter 키가 눌렸을 때 항목 추가 기능
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddClick();
    }
  };

  //InputField 구현
  return (
    <div className={styles.inputField}>
      <InputField
        type="text"
        value={inputValue}
        placeholder="Add to your list..."
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <InputField
        type="date"
        value={dueDate}
        placeholder="Due date"
        onChange={(e) => setDueDate(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div className={styles.addButtonWrapper}>
        <Button onClick={handleAddClick} />
      </div>
    </div>
  );
};

export default TodoInput;
