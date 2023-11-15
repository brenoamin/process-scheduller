import { ReactElement } from "react";
import "./index.css";
import { AddProcessLogo } from "./AddProcessLogo/AddProcessLogo";

export const NewButton = (): ReactElement => {
  return (
    <div className="new-button-wrapper">
      <div className="img-title-wrapper">
        <AddProcessLogo />
        <span className="button-title">Processo </span>
      </div>
    </div>
  );
};
