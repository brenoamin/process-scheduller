import React, { ReactElement, useEffect } from "react";
import close from "../../assets/close-button.svg";
import "./index.css";
import { Process } from "../../types/Process";

interface ProcessBoxProps {
  id: number;
  arrivalTime: number;
  executionTime: number;
  numPages: number;
  deadline: number;
  onClose: () => void;
  setProcesses: React.Dispatch<React.SetStateAction<Process[]>>;
}

export const ProcessBox = ({
  id,
  arrivalTime,
  executionTime,
  numPages,
  deadline,
  onClose,
  setProcesses,
}: ProcessBoxProps): ReactElement => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let parsedValue = parseInt(value, 10);

    if (name === "arrivalTime" && parsedValue < 0) {
      parsedValue = 0;
    } else if (name === "executionTime" && parsedValue < 1) {
      parsedValue = 1;
    } else if (name === "deadline" && parsedValue < 0) {
      parsedValue = 0;
    } else if (name === "numPages" && parsedValue < 1) {
      parsedValue = 1;
    }

    setProcesses((prevProcesses) =>
      prevProcesses.map((process) =>
        process.id === id
          ? {
              ...process,
              [name]: parsedValue,
            }
          : process
      )
    );
  };

  const handleProcessClose = () => {
    onClose();
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="form-close-container">
          <img src={close} alt="Close button" onClick={handleProcessClose} />
        </div>
        <div className="form-title">
          <span>Processo: {id} </span>
        </div>
        <div className="input-flex">
          <div>
            <label htmlFor="arrival" className="form-label">
              {" "}
              Chegada:
            </label>
            <input
              type="number"
              name="arrivalTime"
              placeholder="0"
              id="arrival"
              value={arrivalTime || 0}
              className="form-input"
              onChange={handleChange}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="execution" className="form-label">
              {" "}
              Execução:{" "}
            </label>
            <input
              type="number"
              name="executionTime"
              placeholder="1"
              id="execution"
              value={executionTime || 1}
              className="form-input"
              onChange={handleChange}
              min="1"
            />
          </div>
        </div>

        <div className="input-flex">
          <div>
            <label htmlFor="deadline" className="form-label">
              {" "}
              Deadline:{" "}
            </label>
            <input
              type="number"
              name="deadline"
              id="deadline"
              placeholder="0"
              value={deadline || 0}
              className="form-input"
              onChange={handleChange}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="numPages" className="form-label">
              {" "}
              Páginas:{" "}
            </label>
            <input
              type="number"
              name="numPages"
              placeholder="1"
              id="numPages"
              value={numPages || 1}
              onChange={handleChange}
              className="form-input"
              min="1"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
