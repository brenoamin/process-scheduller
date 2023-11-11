import { ReactElement } from "react";
import { ButtonProps } from "../Button/types";
import { Button } from "../Button";

export const Run = ({ title, onClick }: ButtonProps): ReactElement => {
  return <Button title={title} onClick={onClick} />;
};
