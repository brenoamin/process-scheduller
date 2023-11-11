import {Scheduler} from "../types/Scheduler.ts";
import {Process} from "../types/Process.ts";
import {ProcessState} from "../types/ProcessState.ts";

export class EDFScheduler implements Scheduler {
    schedule(processes: Process[], quantum: number, overhead: number): ProcessState[][] {
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
                    if (!nextProcess || (process.deadline || 0) < (nextProcess.deadline || 0)) {
                        nextProcess = process;
                    }
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
            for (let i = 0; i < Math.min(quantum, nextProcess.executionTime); i++) {
                // Verifica se o processo está sendo executado após sua deadline
                if (currentTime > (nextProcess.deadline || 0)) {
                    states[nextProcess.id - 1].push(ProcessState.OVER_TIME);
                } else {
                    states[nextProcess.id - 1].push(ProcessState.RUNNING);
                }
                currentTime++;
                nextProcess.executionTime--;
            }

            // Adiciona a sobrecarga de troca de contexto ao tempo atual
            for (let i = 0; i < overhead; i++) {
                states[nextProcess.id - 1].push(ProcessState.OVERHEAD);
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