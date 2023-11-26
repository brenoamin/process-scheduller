import "./index.css";
import {ProcessState} from "../../types/ProcessState";
import {useEffect, useState} from "react";

export type GanttProps = {
  processStates: ProcessState[][];
  delay: number;
};

export const Gantt = ({ processStates, delay }: GanttProps) => {
  const numRows = processStates.length;
  const numColumns = processStates[0].length;
  const [renderedColumns, setRenderedColumns] = useState(1);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (renderedColumns < numColumns) {
        setRenderedColumns(renderedColumns + 1);
      }
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [renderedColumns, numColumns, delay]);
  
  const calculateAverageTurnaround = (): string => {
    const numberProcesses = numRows
    const processStateArray = processStates.flat();
    const targetStates: ProcessState[] = [ProcessState.RUNNING, ProcessState.WAITING, ProcessState.OVERHEAD, ProcessState.OVER_TIME];
    
    const turnAround = processStateArray.reduce((contador, state) => {
      if (targetStates.includes(state)) {
        contador++;
      }
      return contador;
    }, 0);

    return (turnAround / numberProcesses).toFixed(2)
  }
  
  return (
    <div className="gantt-wrapper">
      <div className="average-turnaround-number"><h4>Turnaround médio: {calculateAverageTurnaround()}</h4></div>
      <div className="gantt-scrollable">
        <div className="gantt-content">
          {/* Colunas principais */}
          {Array.from({ length: renderedColumns }).map((_, columnIndex) => (
            <div key={columnIndex} className="gantt-cell">
              {processStates
                .slice()
                .reverse()
                .map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`process ${row[columnIndex].toLowerCase()}`}
                    >
                    {numRows - rowIndex}
                  </div>
                ))}
              {/* Número do tempo abaixo da primeira linha */}
              <div className="time-number">{columnIndex}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
