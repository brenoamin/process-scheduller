
import './index.css'

export const Gantt = () => {
  return (
    <div className="gantt-wrapper">
      <div className="gantt-cell">
        <div className="process" style={{ backgroundColor: "blue" }}>
          Processo 1
        </div>
        <div className="process" style={{ backgroundColor: "green" }}>
          Processo 2
        </div>
        <div className="process" style={{ backgroundColor: "orange" }}>
          Processo 3
        </div>
        <div className="process" style={{ backgroundColor: "orange" }}>
          Processo 4
        </div>
        <div className="process" style={{ backgroundColor: "orange" }}>
          Processo 5
        </div>
        <div className="process" style={{ backgroundColor: "orange" }}>
          Processo 5
        </div>
      </div>
    </div>
  );
};
