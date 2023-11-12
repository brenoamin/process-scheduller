import "./App.css";
import { DiskMatrix } from "./components/Disk";
import { NewButton } from "./components/NewButton";
import { ProcessBox } from "./components/ProcessBox";
import { RAM } from "./components/RAM/RAM";
import { Reset } from "./components/Reset";
import { Run } from "./components/Run";
import { SystemSettings } from "./components/SystemSettings";
import { Process } from "./types/Process";
import { EDFScheduler } from "./schedulers/EDFScheduler.ts";
import Memory from "./storage/Memory.ts";

function App() {
  const processes: Process[] = [
    new Process(1, 0, 4, 35),
    new Process(2, 3, 2, 15),
    //new Process(3, 6, 7,20),
    //new Process(4, 9, 8,25),
  ];

  const memory: Memory = new Memory(16, 4);

  memory.storePage(2, 1);
  memory.storePage(3, 2);
  memory.storePage(4, 1);
  memory.freeUpSpace(3,2)

  // memory.freeUpSpace(1, 5);
  // memory.storePage(1, 8);


  console.log(memory.storage);

  // const scheduler = new EDFScheduler();
  // const scheduleResult = scheduler.schedule(processes, 2, 1);

  // console.log(scheduleResult);
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

[
  [
    "NOT_READY",
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
  ],
  [
    "NOT_READY",
    "NOT_READY",
    "WAITING",
    "RUNNING",
    "RUNNING",
    "OVERHEAD",
    "OVER_TIME",
    "FINISHED",
    "FINISHED",
    "FINISHED",
    "FINISHED",
    "FINISHED",
    "FINISHED",
    "FINISHED",
  ],
  [
    "NOT_READY",
    "NOT_READY",
    "NOT_READY",
    "WAITING",
    "WAITING",
    "WAITING",
    "WAITING",
    "OVER_TIME",
    "OVER_TIME",
    "OVERHEAD",
    "OVER_TIME",
    "OVER_TIME",
    "FINISHED",
    "FINISHED",
  ],
  [
    "NOT_READY",
    "NOT_READY",
    "NOT_READY",
    "NOT_READY",
    "WAITING",
    "WAITING",
    "WAITING",
    "WAITING",
    "WAITING",
    "WAITING",
    "WAITING",
    "WAITING",
    "OVER_TIME",
    "OVER_TIME",
  ],
];
export default App;
