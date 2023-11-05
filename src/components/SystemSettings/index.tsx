import { ReactElement } from "react";
import "./index.css";
export const SystemSettings = (): ReactElement => {
  return (
    <div className="scaling-system">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-step-1">
          <div className="form-title">
            <span>Configuração de Sistema: </span>
          </div>
          <div>
            <label
              htmlFor="scaling-system-algorithm"
              className="scaling-system-label"
            >
              Algoritmo de escalonamento:
            </label>
            <select
              name="scaling-system-algorithm"
              id="scaling-system-algorithm"
            >
              <option value="0">FIFO</option>
              <option value="1">SJF</option>
              <option value="2">Round Robin</option>
              <option value="3">EDF</option>
            </select>
            <div>
              <label
                htmlFor="scaling-system-pages"
                className="scaling-system-label"
              >
                Algoritmo de substituição de páginas:
              </label>
              <select name="scaling-system-pages" id="scaling-system-pages">
                <option value="0">FIFO</option>
                <option value="1">LRU</option>
              </select>
            </div>
          </div>
          <div className="input">
            <div>
              <label htmlFor="delay" className="form-label">
                {" "}
                Delay:{" "}
              </label>
              <input
                type="number"
                name="delay"
                placeholder="0"
                id="delay"
                className="form-input"
                min="1"
                max="2"
              />
            </div>
          </div>
          <div className="input-flex">
            <div>
              <label htmlFor="quantum" className="form-label">
                {" "}
                Quantum:{" "}
              </label>
              <input
                type="number"
                name="quantum"
                id="quantum"
                placeholder="0"
                className="form-input"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="sobrecarga" className="form-label">
                {" "}
                Sobrecarga:{" "}
              </label>
              <input
                type="number"
                name="sobrecarga"
                placeholder="1"
                id="sobrecarga"
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
