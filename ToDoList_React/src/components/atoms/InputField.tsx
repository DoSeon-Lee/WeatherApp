import React from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  placeholder,
  onChange,
  onKeyPress,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

export default InputField;
