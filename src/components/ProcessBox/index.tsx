import { ReactElement } from "react";
import close from "../../assets/close-button.svg";
import "./index.css";

export const ProcessBox = (): ReactElement => {
  return (
    <div className="form-wrapper">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-step-1 active">
          <div className="form-close-container">
            <img src={close} alt="Close button" />
          </div>
          <div className="form-title">
            <span>Processo: </span>
          </div>
          <div className="input-flex">
            <div>
              <label htmlFor="arrival" className="form-label">
                {" "}
                Chegada:
              </label>
              <input
                type="number"
                name="arrival"
                placeholder="0"
                id="arrival"
                className="form-input"
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
                name="execution"
                placeholder="1"
                id="execution"
                className="form-input"
              />
            </div>
          </div>

          <div className="input-flex">
            <div>
              <label htmlFor="dob" className="form-label">
                {" "}
                Deadline:{" "}
              </label>
              <input
                type="number"
                name="deadline"
                id="deadline"
                placeholder="0"
                className="form-input"
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
                className="form-input"
                min="1"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
