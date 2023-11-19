import { ReactElement } from "react";
import { ButtonProps } from "./types";
import "./index.css";

export const Button = ({
  title,
  onClick,
  disabled,
}: ButtonProps): ReactElement => {
  return (
    <button onClick={onClick} disabled={disabled}>
      <span>{title}</span>
    </button>
  );
};
