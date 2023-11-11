import { Process } from "./Process";
import { ProcessState } from "./ProcessState";

export interface Scheduler {
  schedule(
    processes: Process[],
    quantum?: number,
    override?: number
  ): ProcessState[][];
}

[
  [1, 1, 1, 1],
  [2, 2, 1, 1, 1, 1, 1, 4, 4],
  [2, 2, 2, 2, 2, 1, 1, 4, 4, 4, 4],
];
