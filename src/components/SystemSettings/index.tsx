import React, { ReactElement } from "react";
import "./index.css";
import { Conditions } from "../../types/Conditions";

interface SystemSettingsProps extends Conditions {
  setSystemSettings: React.Dispatch<React.SetStateAction<Conditions>>;
}

export const SystemSettings = ({
  delay,
  method,
  override,
  pagination,
  quantum,
  setSystemSettings,
}: SystemSettingsProps): ReactElement => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let parsedValue = parseInt(value, 10);

    if (name === "delay" && parsedValue < 0) {
      parsedValue = 0;
    } else if (name === "quantum" && parsedValue < 0) {
      parsedValue = 0;
    } else if (name === "override" && parsedValue < 1) {
      parsedValue = 1;
    }

    setSystemSettings((prevSettings) => ({
      ...prevSettings,
      [name]: parsedValue,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setSystemSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

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
              name="method"
              id="scaling-system-algorithm"
              value={method || "FIFO"}
              onChange={handleSelectChange}
            >
              <option value="FIFO">FIFO</option>
              <option value="SJF">SJF</option>
              <option value="RR">Round Robin</option>
              <option value="EDF">EDF</option>
            </select>
            <div>
              <label
                htmlFor="scaling-system-pages"
                className="scaling-system-label"
              >
                Algoritmo de substituição de páginas:
              </label>
              <select
                name="pagination"
                id="scaling-system-pages"
                value={pagination || "FIFO"}
                onChange={handleSelectChange}
              >
                <option value="FIFO">FIFO</option>
                <option value="LRU">LRU</option>
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
                value={delay || 0}
                onChange={handleChange}
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
                value={quantum || 0}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="sobrecarga" className="form-label">
                {" "}
                Sobrecarga:{" "}
              </label>
              <input
                type="number"
                name="override"
                placeholder="1"
                id="sobrecarga"
                className="form-input"
                min="1"
                value={override || 1}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
