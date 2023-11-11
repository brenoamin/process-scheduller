import { Process } from "./Process";
import { ProcessState } from "./ProcessState";

export interface Scheduler {
  schedule(
    processes: Process[],
    quantum?: number,
    overhead?: number
  ): ProcessState[][];
}
