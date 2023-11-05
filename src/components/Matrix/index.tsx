import { ReactElement } from "react";
import "./index.css";
import { MatrixTypeProps } from "./types";

export const Matrix = ({
  title,
  defaultCells,
}: MatrixTypeProps): ReactElement => {
  return (
    <div className="matrix-wrapper">
      <div className="matrix-title">
        <span>{title}</span>
      </div>
      <div className="matrix-row">
        {defaultCells.map((cell, index) => (
          <div className="matrix-cell" key={index}>
            <div className="matrix-value">{cell}</div>
            <div className="matrix-address">{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
