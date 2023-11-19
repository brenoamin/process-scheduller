import { ReactElement } from "react";
import { ButtonProps } from "../Button/types";
import { Button } from "../Button";

export const Run = ({ title, onClick, disabled }: ButtonProps): ReactElement => {
  const handleClick = () => {
    onClick();
  };
  return <Button title={title} onClick={handleClick} disabled={disabled} />;
};
