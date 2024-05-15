import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomButton from "./button";

describe("CustomButton", () => {
  it("renders the button with the provided text", () => {
    render(<CustomButton text="Click me" onClick={() => {}} />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<CustomButton text="Click me" onClick={handleClick} />);
    const buttonElement = screen.getByText(/Click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the provided className to the button", () => {
    render(
      <CustomButton
        text="Click me"
        onClick={() => {}}
        className="custom-class"
      />
    );
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toHaveClass("custom-class");
  });

  it("renders correctly without a className", () => {
    render(<CustomButton text="Click me" onClick={() => {}} />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement.className).toBe("");
  });
});
