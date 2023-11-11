import { Process } from "../types/Process";
import { ProcessState } from "../types/ProcessState";
import { Scheduler } from "../types/Scheduler";

export class FIFOScheduler implements Scheduler {
  schedule(processes: Process[]): ProcessState[][] {
    // Ordena os processos por tempo de chegada
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    // Inicializa a matriz de estados
    const states: ProcessState[][] = processes.map(() => []);

    // Tempo atual
    let currentTime = 0;

    for (const process of processes) {
      // Preenche o estado NOT_READY para os processos que ainda não chegaram
      while (states[process.id - 1].length < process.arrivalTime) {
        states[process.id - 1].push(ProcessState.NOT_READY);
      }

      // Preenche o estado WAITING para os processos que chegaram, mas estão aguardando
      while (states[process.id - 1].length < currentTime) {
        states[process.id - 1].push(ProcessState.WAITING);
      }

      // Preenche o estado RUNNING para o tempo de execução do processo
      for (let i = 0; i < process.executionTime; i++) {
        states[process.id - 1].push(ProcessState.RUNNING);
        currentTime++;
      }

      // Preenche o estado FINISHED para o restante do tempo
      while (states[process.id - 1].length < currentTime) {
        states[process.id - 1].push(ProcessState.FINISHED);
      }
    }

    // Preenche o estado FINISHED para todos os processos após o último processo ter terminado
    for (const state of states) {
      while (state.length < currentTime) {
        state.push(ProcessState.FINISHED);
      }
    }

    return states;
  }
}
