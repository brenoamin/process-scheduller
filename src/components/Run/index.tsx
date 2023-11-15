import { ReactElement } from "react";
import { ButtonProps } from "../Button/types";
import { Button } from "../Button";

interface RunProps extends ButtonProps {
  getProcessData: () => void;
}

export const Run = ({
  title,
  onClick,
  getProcessData,
}: RunProps): ReactElement => {
  const handleClick = () => {
    getProcessData();
    if (onClick) {
      onClick();
    }
  };
  return <Button title={title} onClick={handleClick} />;
};
