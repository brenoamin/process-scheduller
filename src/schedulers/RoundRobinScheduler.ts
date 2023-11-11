import { Process } from "../types/Process";
import { ProcessState } from "../types/ProcessState";
import { Scheduler } from "../types/Scheduler";

export class RoundRobinScheduler implements Scheduler {
  schedule(
    processes: Process[],
    quantum: number = 1,
    override: number = 0,
    overheadTime: number = 0
  ): ProcessState[][] {
    const processStates: ProcessState[][] = [];
    const processQueue: Process[] = [...processes];
    let currentTime = 0;

    while (processQueue.length > 0) {
      const currentState: ProcessState[] = [];

      for (const process of processQueue) {
        if (process.arrivalTime <= currentTime) {
          currentState.push(ProcessState.RUNNING);

          const executionTime = Math.min(process.executionTime, quantum);
          currentTime += executionTime + overheadTime;

          process.executionTime -= executionTime;

          if (process.executionTime === 0) {
            currentState[currentState.length - 1] = ProcessState.FINISHED;
          } else {
            currentState[currentState.length - 1] = ProcessState.WAITING;
          }
        } else {
          currentState.push(ProcessState.NOT_READY);
        }
      }

      // Adiciona um estado de OVERRIDE quando houver troca de contexto
      if (currentState.includes(ProcessState.RUNNING) && currentState.includes(ProcessState.NOT_READY)) {
        currentState.fill(ProcessState.OVERRIDE);
        currentTime += override; // Adiciona o tempo de sobrecarga
      }

      processStates.push([...currentState]);

      // Remove processos concluídos
      processQueue.forEach((process, index) => {
        if (process.executionTime === 0) {
          processQueue.splice(index, 1);
        }
      });
    }

    return processStates;
  }
}
