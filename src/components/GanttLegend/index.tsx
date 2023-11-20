import { ReactElement } from "react";
import "./index.css";

export const GanttLegend = (): ReactElement => {
  return (
    <div className="gantt-chart-legend">
      <h3>Gantt Chart Legend</h3>
      <div className="div-cell-box">
        <div className="div-cell-square not_ready"></div>
        <div className="div-cell-text">NOT READY</div>
      </div>
      <div className="div-cell-box">
        <div className="div-cell-square waiting"></div>
        <div className="div-cell-text">WAITING</div>
      </div>
      <div className="div-cell-box">
        <div className="div-cell-square running"></div>
        <div className="div-cell-text">RUNNING</div>
      </div>
      <div className="div-cell-box">
        <div className="div-cell-square finished"></div>
        <div className="div-cell-text">FINISHED</div>
      </div>
      <div className="div-cell-box">
        <div className="div-cell-square overhead"></div>
        <div className="div-cell-text">OVERHEAD</div>
      </div>
      <div className="div-cell-box">
        <div className="div-cell-square over_time"></div>
        <div className="div-cell-text">OVERTIME</div>
      </div>
    </div>
  );
};
