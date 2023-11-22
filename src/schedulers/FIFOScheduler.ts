import { Process } from "../types/Process";
import { ProcessState } from "../types/ProcessState";
import { Scheduler } from "../types/Scheduler";

export class FIFOScheduler implements Scheduler {
  schedule(processes: Process[]): ProcessState[][] {
    // Ordena os processos por tempo de chegada
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    // Inicializa a matriz de estados
    const states: ProcessState[][] = processes.map(() => []);

    // Tempo atual começa no tempo de chegada do primeiro processo ou em 0
    let currentTime = processes.length > 0 ? processes[0].arrivalTime : 0;

    // Loop principal
    // eslint-disable-next-line no-constant-condition
    while (true) {
      let nextProcess: Process | undefined;

      // Encontra o próximo processo com arrivalTime <= currentTime
      for (const process of processes) {
        if (process.arrivalTime <= currentTime && !states[process.id - 1].length) {
          nextProcess = process;
          break;
        }
      }

      // Se não houver mais processos para executar, saia do loop
      if (!nextProcess) {
        break;
      }

      // Preenche o estado NOT_READY para os processos que ainda não chegaram
      while (states[nextProcess.id - 1].length < nextProcess.arrivalTime) {
        states[nextProcess.id - 1].push(ProcessState.NOT_READY);
      }

      // Preenche o estado WAITING para os processos que chegaram, mas estão aguardando
      while (states[nextProcess.id - 1].length < currentTime) {
        states[nextProcess.id - 1].push(ProcessState.WAITING);
      }

      // Preenche o estado RUNNING para o tempo de execução do processo
      for (let i = 0; i < nextProcess.executionTime; i++) {
        states[nextProcess.id - 1].push(ProcessState.RUNNING);
        currentTime++;
      }

      // Preenche o estado FINISHED para o restante do tempo
      while (states[nextProcess.id - 1].length < currentTime) {
        states[nextProcess.id - 1].push(ProcessState.FINISHED);
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
