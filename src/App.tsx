import { useState } from "react";
import "./App.css";
import { NewButton } from "./components/NewButton";
import { ProcessBox } from "./components/ProcessBox";
import { Reset } from "./components/Reset";
import { Run } from "./components/Run";
import { SystemSettings } from "./components/SystemSettings";
import { Process } from "./types/Process";
import { Conditions } from "./types/Conditions";
import { SchedulerFactory } from "./schedulers";
import { Method } from "./types/Method";
import { Gantt } from "./components/Gantt";
import { ProcessState } from "./types/ProcessState";
import Memory from "./storage/Memory.ts";
import { PaginationAlgorithm } from "./types/PaginationAlgorithm.ts";
import { Storage } from "./Storage.tsx";
import { GanttLegend } from "./components/GanttLegend/index.tsx";

function App() {
  const handleReset = (): void => {
    setScheduleResult(null);
    setProcesses([]);
    setMemory(null);
  };

  const [processes, setProcesses] = useState<Process[]>([]);
  const [scheduleResult, setScheduleResult] = useState<ProcessState[][] | null>(
    null
  );

  const [systemSettings, setSystemSettings] = useState<Conditions>({
    method: Method.FIFO,
    pagination: "FIFO",
    quantum: 1,
    overhead: 0,
    delay: 0,
  });

  const [memory, setMemory] = useState<Memory | null>(null);

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

    const scheduler = SchedulerFactory.chooseScheduler(systemSettings.method);

    const result = scheduler.schedule(
      processes,
      systemSettings.quantum,
      systemSettings.overhead
    );

    setScheduleResult(result);

    const memory = new Memory(
      processes,
      result,
      systemSettings.pagination as PaginationAlgorithm
    );

    setMemory(memory);
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
        {memory && (
          <Storage memory={memory} delay={systemSettings.delay * 1000} />
        )}
        <div className="control-system">
          <div>
            <Run
              title="Run"
              onClick={getProcessData}
              disabled={processes.length === 0}
            />
          </div>
          <div>
            <Reset title="Reset" onClick={handleReset} />
          </div>
        </div>
        <div className="gantt-box-legend">
          {scheduleResult && <GanttLegend />}
          <div className="gantt-chart-view">
            {scheduleResult && (
              <Gantt
                processStates={scheduleResult}
                delay={systemSettings.delay * 1000}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
