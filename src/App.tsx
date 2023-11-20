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
import { SchedulerFactory } from "./schedulers";
import { Method } from "./types/Method";
import { Gantt } from "./components/Gantt";
import { ProcessState } from "./types/ProcessState";
import Memory from "./storage/Memory.ts";
import {PaginationAlgorithm} from "./types/PaginationAlgorithm.ts";

function App() {
  const processStates = [
    [
      "RUNNING",
      "RUNNING",
      "OVERHEAD",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "RUNNING",
      "RUNNING",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED"
    ],
    [
      "NOT_READY",
      "NOT_READY",
      "NOT_READY",
      "RUNNING",
      "RUNNING",
      "OVERHEAD",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "RUNNING",
      "RUNNING",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED"
    ],
    [
      "NOT_READY",
      "NOT_READY",
      "NOT_READY",
      "NOT_READY",
      "WAITING",
      "WAITING",
      "RUNNING",
      "RUNNING",
      "OVERHEAD",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "RUNNING",
      "RUNNING",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED",
      "FINISHED"
    ],
    [
      "NOT_READY",
      "NOT_READY",
      "NOT_READY",
      "NOT_READY",
      "NOT_READY",
      "NOT_READY",
      "NOT_READY",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "RUNNING",
      "RUNNING",
      "OVERHEAD",
      "WAITING",
      "WAITING",
      "WAITING",
      "WAITING",
      "RUNNING",
      "RUNNING",
      "OVERHEAD",
      "RUNNING",
      "RUNNING"
    ]
  ]

  const convertToProcessState = (state: string): ProcessState => {
    switch (state) {
      case "NOT_READY":
        return ProcessState.NOT_READY;
      case "RUNNING":
        return ProcessState.RUNNING;
      case "WAITING":
        return ProcessState.WAITING;
      case "OVERHEAD":
        return ProcessState.OVERHEAD;
      case "FINISHED":
        return ProcessState.FINISHED;
      case "OVER_TIME":
        return ProcessState.OVER_TIME;
      default:
        throw new Error(`Tipo de estado desconhecido: ${state}`);
    }
  };

  const convertedProcessStates: ProcessState[][] = processStates.map((column) =>
    column.map((state) => convertToProcessState(state))
  );

  const handleReset = (): void => {
    setScheduleResult(null);
    setProcesses([]);
  };

  const [processes, setProcesses] = useState<Process[]>([
    new Process(1, 0, 4, 0, 35),
  ]);
  const [scheduleResult, setScheduleResult] = useState<ProcessState[][] | null>(
    null
  );

  const [systemSettings, setSystemSettings] = useState<Conditions>({
    method: Method.FIFO,
    pagination: "FIFO",
    quantum: 0,
    overhead: 1,
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

    const scheduler = SchedulerFactory.chooseScheduler(systemSettings.method);

    const result = scheduler.schedule(
      processes,
      systemSettings.quantum,
      systemSettings.overhead
    );

    setScheduleResult(result);

    console.log("result", result);
  };


  const ps: Process[] = [
    {
      "id": 1,
      "arrivalTime": 0,
      "executionTime": 4,
      "remainingTime": 0,
      "deadline": 0,
      "numPages": 30
    },
    {
      "id": 2,
      "arrivalTime": 3,
      "executionTime": 4,
      "remainingTime": 0,
      "deadline": 0,
      "numPages": 30
    },
    {
      "id": 3,
      "arrivalTime": 4,
      "executionTime": 4,
      "remainingTime": 0,
      "deadline": 0,
      "numPages": 30
    },
    {
      "id": 4,
      "arrivalTime": 7,
      "executionTime": 6,
      "remainingTime": 0,
      "deadline": 0,
      "numPages": 30
    }
  ]

  const memory = new Memory(ps, convertedProcessStates, PaginationAlgorithm.LRU)

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  memory.nextTime()

  console.log("disco: ", memory.getDisk())
  console.log("RAM: ", memory.getRam())

  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())
  //
  // memory.nextTime()
  //
  // console.log("disco: ", memory.getDisk())
  // console.log("RAM: ", memory.getRam())


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
        <div className="gantt-chart-view">
          {scheduleResult && (
            <Gantt
              processStates={scheduleResult}
              delay={systemSettings.delay * 1000}
            />
          )}
        </div>

        {/* <Gantt processStates={convertedProcessStates} delay={0}/> */}
      </div>
    </div>
  );
}

export default App;
