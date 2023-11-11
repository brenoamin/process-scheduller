// export class RoundRobinScheduler implements Scheduler {
//   schedule(
//     processes: Process[],
//     quantum: number = 1,
//     override: number = 0
//   ): ProcessState[][] {
//     // Ordena os processos por tempo de chegada
//     processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
//     // Inicializa a matriz de estados
//     const states: ProcessState[][] = processes.map(() => []);
//     // Tempo atual
//     let currentTime = 0;
//     // Fila de processos prontos
//     const readyQueue: Process[] = [];
//     // Índice do processo atual na fila de processos prontos
//     let currentProcessIndex = 0;
//     // Adiciona processos que chegaram ao tempo atual à fila de processos prontos
//     for (const process of processes) {
//       if (process.arrivalTime === currentTime) {
//         readyQueue.push(process);
//       }
//     }
//     while (processes.some((process) => process.executionTime > 0)) {
//       if (readyQueue.length > 0) {
//         // Obtém o processo atual
//         const currentProcess = readyQueue[currentProcessIndex];
//         // Executa o processo atual por um quantum
//         for (let i = 0; i < quantum && currentProcess.executionTime > 0; i++) {
//           states[currentProcess.id - 1].push(ProcessState.RUNNING);
//           currentProcess.executionTime--;
//           currentTime++;
//         }
//         // Se o processo atual terminou, remove-o da fila de processos prontos
//         if (currentProcess.executionTime === 0) {
//           readyQueue.splice(currentProcessIndex, 1);
//           // Se o processo atual foi removido, ajusta o índice do processo atual
//           if (currentProcessIndex >= readyQueue.length) {
//             currentProcessIndex = 0;
//           }
//         } else {
//           // Caso contrário, move para o próximo processo
//           currentProcessIndex = (currentProcessIndex + 1) % readyQueue.length;
//           // Adiciona o tempo de sobrecarga
//           for (let i = 0; i < override; i++) {
//             states[currentProcess.id - 1].push(ProcessState.OVERRIDE);
//             currentTime++;
//           }
//         }
//       } else {
//         // Se não há processos prontos, avança o tempo até o próximo processo chegar
//         const nextArrivalTime = Math.min(
//           ...processes.map((p) => p.arrivalTime)
//         );
//         currentTime = nextArrivalTime;
//       }
//       // Adiciona processos que chegaram ao tempo atual à fila de processos prontos
//       for (const process of processes) {
//         if (
//           process.arrivalTime === currentTime &&
//           !readyQueue.includes(process)
//         ) {
//           readyQueue.push(process);
//         }
//       }
//       // Preenche o estado WAITING para os outros processos na fila de processos prontos
//       for (const process of readyQueue) {
//         while (states[process.id - 1].length < currentTime) {
//           states[process.id - 1].push(ProcessState.WAITING);
//         }
//       }
//       // Preenche o estado NOT_READY para os processos que ainda não chegaram
//       for (const process of processes) {
//         if (process.arrivalTime > currentTime) {
//           while (states[process.id - 1].length < currentTime) {
//             states[process.id - 1].push(ProcessState.NOT_READY);
//           }
//         }
//       }
//     }
//     // Preenche o estado FINISHED para todos os processos após o último processo ter terminado
//     for (const state of states) {
//       while (state.length < currentTime) {
//         state.push(ProcessState.FINISHED);
//       }
//     }
//     return states;
//   }
// }
