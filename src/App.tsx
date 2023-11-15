import { useState } from "react";
import "./App.css";
import { DiskMatrix } from "./components/Disk";
import { NewButton } from "./components/NewButton";
import { ProcessBox } from "./components/ProcessBox";
import { RAM } from "./components/RAM/RAM";
import { Reset } from "./components/Reset";
import { Run } from "./components/Run";
import { SystemSettings } from "./components/SystemSettings";
import { Process } from "./types/Process";
import { Conditions } from "./types/Conditions";

function App() {
  const [processes, setProcesses] = useState<Process[]>([
    new Process(1, 0, 4, 0, 35),
  ]);

  const [systemSettings, setSystemSettings] = useState<Conditions>({
    method: "FIFO",
    pagination: "FIFO",
    quantum: 0,
    override: 1,
    delay: 0,
  });

  const handleAddProcess = (): void => {
    const nextId =
      processes.length > 0 ? processes[processes.length - 1].id + 1 : 1;

    const newProcess: Process = new Process(nextId, 0, 1, 0, 1);

    setProcesses([...processes, newProcess]);
  };

  const handleDelete = (id: number): void => {
    const newProcesses = processes.filter((process) => process.id !== id);
    setProcesses(newProcesses);
  };

  const getProcessData = (): void => {
    console.log("Processes", processes);

    console.log("System Settings", systemSettings);
  };

  return (
    <div className="main-section">
      <header className="background-image">
        <h1 className="main-section-title"> SCHEDULLER SYSTEM</h1>
      </header>
      <div>
        <div className="process-section">
          <SystemSettings
            {...systemSettings}
            setSystemSettings={setSystemSettings}
          />
          <NewButton onClick={handleAddProcess} />
          {processes.map((process) => (
            <ProcessBox
              key={process.id}
              id={process.id}
              deadline={process.deadline}
              arrivalTime={process.arrivalTime}
              numPages={process.numPages}
              executionTime={process.executionTime}
              onClose={() => handleDelete(process.id)}
              setProcesses={setProcesses}
            />
          ))}
        </div>

        <div className="memory-section">
          <DiskMatrix />
          <RAM />
        </div>
        <div>
          <div>
            <Run
              title="Run"
              onClick={() => {}}
              getProcessData={getProcessData}
            />
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
