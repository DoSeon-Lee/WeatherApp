import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders todo app header", () => {
  render(<App />);
  const headerElement = screen.getByText(/To Do/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders add todo input", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Add to your list.../i);
  expect(inputElement).toBeInTheDocument();
});
