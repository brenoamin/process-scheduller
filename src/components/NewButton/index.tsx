import { ReactElement } from "react";
import "./index.css";
import { AddProcessLogo } from "./AddProcessLogo/AddProcessLogo";

interface NewButtonProps {
  onClick: () => void;
}

export const NewButton = ({ onClick }: NewButtonProps): ReactElement => {
  const handleClick = () => {
    onClick();
  };
  return (
    <div className="new-button-wrapper" onClick={handleClick}>
      <div className="img-title-wrapper">
        <AddProcessLogo />
        <span className="button-title">Processo </span>
      </div>
    </div>
  );
};
