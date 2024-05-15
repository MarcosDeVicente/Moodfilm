import { ReactNode } from "react";
import "./button.css";

interface CustomButtonProps {
  text: ReactNode;
  onClick: () => void;
  className?: string;
}

const CustomButton = ({ text, onClick, className = "" }: CustomButtonProps) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;
