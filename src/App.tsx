import "./App.css";
import { DiskMatrix } from "./components/Disk";
import { NewButton } from "./components/NewButton";
import { ProcessBox } from "./components/ProcessBox";
import { RAM } from "./components/RAM/RAM";
import { Reset } from "./components/Reset";
import { Run } from "./components/Run";
import { SystemSettings } from "./components/SystemSettings";
import { Process } from "./types/Process";
import {EDFScheduler} from "./schedulers/EDFScheduler.ts";

function App() {
  const processes: Process[] = [
    { id: 1, arrivalTime: 1, executionTime: 2, deadline: 0 },
    { id: 2, arrivalTime: 2, executionTime: 3, deadline: 0 },
    { id: 3, arrivalTime: 3, executionTime: 4, deadline: 0 },
    { id: 4, arrivalTime: 4, executionTime: 2, deadline: 0 },
    { id: 5, arrivalTime: 5, executionTime: 1, deadline: 0 },
    { id: 6, arrivalTime: 6, executionTime: 2, deadline: 0 },
  ];

  const scheduler = new EDFScheduler();
  const scheduleResult = scheduler.schedule(processes, 2, 1);

  console.log(scheduleResult);
  return (
    <div className="main-section">
      <header className="background-image">
        <h1 className="main-section-title"> SCHEDULLER SYSTEM</h1>
      </header>
      <div>
        <div className="process-section">
          <SystemSettings />
          <NewButton />
          <ProcessBox />
        </div>

        <div className="memory-section">
          <DiskMatrix />
          <RAM />
        </div>
        <div>
          {/* <Gantt></Gantt> */}
          <div>
            <Run title="Run" onClick={() => {}} />
          </div>
        </div>
        <div>
          <Reset title="Reset" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default App;
