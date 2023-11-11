import "./App.css";
import { DiskMatrix } from "./components/Disk";
import { NewButton } from "./components/NewButton";
import { ProcessBox } from "./components/ProcessBox";
import { RAM } from "./components/RAM/RAM";
import { Reset } from "./components/Reset";
import { Run } from "./components/Run";
import { SystemSettings } from "./components/SystemSettings";
import { FIFOScheduler } from "./schedulers/FIFOScheduler";
import { Process } from "./types/Process";

function App() {
  const processes: Process[] = [
    { id: 1, arrivalTime: 0, executionTime: 4 },
    { id: 2, arrivalTime: 2, executionTime: 5 },
    { id: 3, arrivalTime: 4, executionTime: 2 },
  ];

  const scheduler = new FIFOScheduler();
  const scheduleResult = scheduler.schedule(processes);

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
