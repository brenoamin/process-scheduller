import {Scheduler} from "../types/Scheduler.ts";
import {Process} from "../types/Process.ts";
import {ProcessState} from "../types/ProcessState.ts";

export class RoundRobinScheduler implements Scheduler {
    schedule(processes: Process[], quantum: number = 1, overhead: number = 1): ProcessState[][] {
        // Ordena os processos por tempo de chegada
        processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

        const queue: Process[] = [...processes];

        // Inicializa a matriz de estados
        const states: ProcessState[][] = processes.map(() => []);

        // Tempo atual começa no tempo de chegada do primeiro processo ou em 0
        let currentTime = processes.length > 0 ? processes[0].arrivalTime : 0;


        // Loop principal
        // eslint-disable-next-line no-constant-condition
        while (true) {

            // Se não houver mais processos para executar, saia do loop
            if (queue.length === 0) {
                break;
            }
            // Pega o próximo processo da fila
            const nextProcess = queue.shift() as Process;

            // Preenche o estado NOT_READY para os processos que ainda não chegaram

            while (states[nextProcess.id - 1].length < nextProcess.arrivalTime) {
                states[nextProcess.id - 1].push(ProcessState.NOT_READY);
            }

            // Preenche o estado WAITING para os processos que chegaram, mas estão aguardando
            if (nextProcess.arrivalTime <= currentTime) {
                while (states[nextProcess.id - 1].length < currentTime) {
                    states[nextProcess.id - 1].push(ProcessState.WAITING);
                }
            }

            // Verifica se é necessário preempção devido ao quantum
            const timeToExecute = Math.min(nextProcess.remainingTime, quantum);

            // Preenche o estado RUNNING para o tempo de execução do processo
            for (let i = 0; i < timeToExecute; i++) {
                states[nextProcess.id - 1].push(ProcessState.RUNNING);
                nextProcess.remainingTime--;
                currentTime++;
            }

            if (nextProcess.remainingTime > 0) {
                // Preenche o estado OVERHEAD para o tempo de sobrecarga
                for (let i = 0; i < overhead; i++) {
                    states[nextProcess.id - 1].push(ProcessState.OVERHEAD);
                    currentTime++;
                }

                // Encontra o índice do primeiro processo na fila cujo tempo de chegada é maior que o tempo atual + 1
                const index = queue.findIndex(process => process.arrivalTime > currentTime + 1);

                if (index === -1) {
                    // Se não houver tal processo, adiciona o processo ao final da fila
                    queue.push(nextProcess);
                } else {
                    // Caso contrário, insere o processo na posição encontrada
                    queue.splice(index, 0, nextProcess);
                }
            } else {
                // Preenche o estado FINISHED para o restante do tempo
                while (states[nextProcess.id - 1].length < currentTime) {
                    states[nextProcess.id - 1].push(ProcessState.FINISHED);
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