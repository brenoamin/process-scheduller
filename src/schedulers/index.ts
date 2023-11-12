import { FIFOScheduler } from "./FIFOScheduler";
import { EDFScheduler } from "./EDFScheduler";
import { SJFScheduler } from "./SJFScheduler";
import { RoundRobinScheduler } from "./RoundRobinScheduler";
import { Scheduler } from "../types/Scheduler";
import { Method } from "../types/Method";

export class SchedulerFactory {
  static chooseScheduler(method_type: Method): Scheduler {
    switch (method_type) {
      case Method.FIFO:
        return new FIFOScheduler();
      case Method.SJF:
        return new SJFScheduler();
      case Method.RoundRobin:
        return new RoundRobinScheduler();
      case Method.EDF:
        return new EDFScheduler();
      default:
        throw new Error("Choose a valid scheduler option");
    }
  }
}
