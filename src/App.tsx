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

function App() {
  const [processes, setProcesses] = useState<Process[]>([
    {
      id: 1,
      arrivalTime: 0,
      executionTime: 4,
      numPages: 35,
      deadline: 0,
      remainingTime: 0,
    },
    {
      id: 2,
      arrivalTime: 3,
      executionTime: 2,
      numPages: 15,
      deadline: 0,
      remainingTime: 0,
    },
  ]);

  const handleAddProcess = (): void => {
    const nextId =
      processes.length > 0 ? processes[processes.length - 1].id + 1 : 1;

    const newProcess: Process = {
      id: nextId,
      arrivalTime: 0,
      executionTime: 1,
      numPages: 1,
      deadline: 0,
      remainingTime: 0,
    };

    setProcesses([...processes, newProcess]);
  };

  function handleDelete(id: number): void {
    const newProcesses = processes.filter((process) => process.id !== id);
    setProcesses(newProcesses);
  }

  return (
    <div className="main-section">
      <header className="background-image">
        <h1 className="main-section-title"> SCHEDULLER SYSTEM</h1>
      </header>
      <div>
        <div className="process-section">
          <SystemSettings />
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
            />
          ))}
        </div>

        <div className="memory-section">
          <DiskMatrix />
          <RAM />
        </div>
        <div>
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
