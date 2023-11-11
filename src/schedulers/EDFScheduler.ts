import {Process} from "../types/Process";
import {ProcessState} from "../types/ProcessState";
import {Scheduler} from "../types/Scheduler";

export class EDFScheduler implements Scheduler {
    schedule(processes: Process[], quantum: number = 1, overhead: number = 1): ProcessState[][] {
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
                    if (!nextProcess ||( process.deadline || 0) < (nextProcess.deadline || 0)) {
                        nextProcess = process;
                    }
                }
            }


            // Se não houver mais processos para executar, saia do loop
            if (!nextProcess) {
                break;
            }

            // Preenche o estado NOT_READY para os processos que ainda não chegaram
            while (nextProcess.remainingTime > 0) {
                while (states[nextProcess.id - 1].length < nextProcess.arrivalTime) {
                    states[nextProcess.id - 1].push(ProcessState.NOT_READY);
                }

                // Preenche o estado WAITING para os processos que chegaram, mas estão aguardando
                while (states[nextProcess.id - 1].length < currentTime) {
                    states[nextProcess.id - 1].push(ProcessState.WAITING);
                }

                // Verifica se é necessário preempção devido ao quantum
                const timeToExecute = Math.min(nextProcess.remainingTime, quantum);

                // Preenche o estado RUNNING para o tempo de execução do processo
                for (let i = 0; i < timeToExecute; i++) {
                    states[nextProcess.id - 1].push(nextProcess.deadline <= currentTime ? ProcessState.OVER_TIME : ProcessState.RUNNING);
                    nextProcess.remainingTime -= 1;
                    currentTime++;
                }


                if (nextProcess.remainingTime > 0) {
                    // Preenche o estado OVERHEAD para o tempo de sobrecarga
                    for (let i = 0; i < overhead; i++) {
                        states[nextProcess.id - 1].push(ProcessState.OVERHEAD);
                        currentTime++;
                    }
                    // Preenche o estado WAITING para o restante do tempo se houver mais execução
                    while (states[nextProcess.id - 1].length < currentTime) {
                        states[nextProcess.id - 1].push(ProcessState.WAITING);
                    }
                } else {
                    // Preenche o estado FINISHED para o restante do tempo
                    while (states[nextProcess.id - 1].length < currentTime) {
                        states[nextProcess.id - 1].push(ProcessState.FINISHED);
                    }
                }
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