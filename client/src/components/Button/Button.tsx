import React from "react";
import "./Button.css";

// interface
interface ButtonProps {
  label: string | JSX.Element;
  type?: "button" | "submit" | "reset";
  variant?: "outlined" | "contained";
  fullWidth?: boolean;
  cssClasses?: Array<string>;
  onClick?: () => void;
  onSubmit?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  variant = "contained",
  fullWidth = false,
  cssClasses,
  onClick,
  onSubmit,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      className={`btn btn-${variant} ${
        fullWidth && "btn-full"
      } ${cssClasses?.join(" ")}`}
    >
      {label}
    </button>
  );
};

export default Button;
