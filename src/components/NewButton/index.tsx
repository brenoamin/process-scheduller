import { ReactElement } from "react";
import "./index.css";
import { AddProcessLogo } from "./AddProcessLogo/AddProcessLogo";

export const NewButton = (): ReactElement => {
  return (
    <div className="new-button-wrapper">
      <div className="new-button-title">
        <div className="img-title-wrapper">
          <AddProcessLogo/>
          <span>Processo </span>
        </div>
      </div>
    </div>
  );
};
