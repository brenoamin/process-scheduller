import "./index.css";
import { ProcessState } from "../../types/ProcessState";
import { useEffect, useState } from "react";

export type GanttProps = {
  processStates: ProcessState[][];
  delay: number;
};

export const Gantt = ({ processStates, delay }: GanttProps) => {
  const numRows = processStates.length;
  const numColumns = processStates[0].length;
  const [renderedColumns, setRenderedColumns] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (renderedColumns < numColumns) {
        setRenderedColumns(renderedColumns + 1);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [renderedColumns, numColumns, delay]);

  return (
    <div className="gantt-wrapper">
      {/* TODO: Mexer na estilização desses números ou removê-los */}
      {/* Números dos processos ao lado da primeira coluna */}
      <div className="gantt-cell">
        {[...Array(numRows).keys()].reverse().map((rowIndex) => (
          <div key={rowIndex} className="process-number">
            {rowIndex + 1}
          </div>
        ))}
      </div>
      {/* Colunas principais */}
      {Array.from({ length: renderedColumns })
        .reverse()
        .map((_, columnIndex) => (
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
  );
};
