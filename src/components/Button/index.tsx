import { ReactElement } from "react";
import { ButtonProps } from "./types";
import "./index.css";

export const Button = ({ title, onClick }: ButtonProps): ReactElement => {
  return (
    <button onClick={onClick}>
      <span>{title}</span>
    </button>
  );
};
