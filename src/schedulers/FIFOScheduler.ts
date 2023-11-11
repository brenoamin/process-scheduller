import { Process } from "../types/Process";
import { ProcessState } from "../types/ProcessState";
import { Scheduler } from "../types/Scheduler";

export class FIFOScheduler implements Scheduler {
    schedule(processes: Process[]): ProcessState[][] {
      const states: ProcessState[][] = [];
  
      let currentTime = 0;
  
      // Ordena os processos pelo tempo de chegada
      processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
      while (processes.length > 0) {
        const currentProcess = processes.shift();
  
        if (!currentProcess) {
          break;
        }
  
        // Aguarda até o tempo de chegada do processo
        if (currentTime < currentProcess.arrivalTime) {
          currentTime = currentProcess.arrivalTime;
        }
  
        // Atualiza o estado do processo para RUNNING
        states.push([{ ...currentProcess, deadline: currentProcess.deadline }, ...Array(currentTime).fill(ProcessState.NOT_READY)]);
  
        // Atualiza o estado do processo para FINISHED
        const processFinishTime = currentTime + currentProcess.executionTime;
        states.push([...Array(processFinishTime).fill(ProcessState.FINISHED)]);
  
        currentTime = processFinishTime;
      }
  
      return states;
    }
  }
  