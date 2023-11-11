import { ReactElement } from "react";
import { ButtonProps } from "../Button/types";
import { Button } from "../Button";

export const Reset = ({ title, onClick }: ButtonProps): ReactElement => {
  return <Button title={title} onClick={onClick} />;
};
