import { InterfaceMemory } from "../types/Memory";
import { PaginationAlgorithm } from "../types/PaginationAlgorithm.ts";
import { Process } from "../types/Process.ts";
import { ProcessState } from "../types/ProcessState.ts";

export default class Memory implements InterfaceMemory {
  private readonly processes: Process[];
  private readonly scheduler: ProcessState[][];

  private disk: number[];
  private ram: number[] = new Array(50).fill(null);
  private readonly paginationAlgorithm: PaginationAlgorithm; //FIFO ou LRU

  private time: number = 0;

  constructor(
    processes: Process[],
    scheduler: ProcessState[][],
    paginationAlgorithm: PaginationAlgorithm
  ) {
    this.processes = processes;
    this.scheduler = scheduler;
    this.paginationAlgorithm = paginationAlgorithm;

    this.loadDisk(this.processes);
    this.buildMemory();
  }
  getDisk(): number[] {
    return this.disk;
  }

  getRam(): number[] {
    return this.ram;
  }
  nextTime(): void {
    this.time++;

    this.buildMemory();
  }

  private buildMemory(): void {
    const storageRemaining = this.storageRemaining();
    const runningProcess = this.getRunningProcess();
    if (runningProcess == null) {
      return;
    }
    if (this.findProcessInRAM(runningProcess)) {
      return;
    }
    if (storageRemaining < this.processes[runningProcess - 1].numPages) {
      this.freeSpaceInRAM(this.processes[runningProcess - 1].numPages);
     
    }
    //TODO adiciona o processo no espaço livre da RAM
  }

  private loadDisk(processes: Process[]) {
    processes.forEach((process) => {
      for (let i = 0; i < process.numPages; i++) {
        this.disk.push(process.id);
      }
    });
  }

  private storageRemaining() {
    return this.ram.filter((item) => item === null).length;
  }

  private getRunningProcess(): number | null {
    const activeProcessIndex = this.scheduler.findIndex(
      (process) =>
        process[this.time] == (ProcessState.RUNNING || ProcessState.OVER_TIME)
    );
    if (activeProcessIndex == -1) {
      return null;
    }
    return activeProcessIndex + 1;
  }

  private findProcessInRAM(id: number): number | null {
    const foundIndex = this.ram.findIndex((item) => item === id);
    if (foundIndex == -1) {
      return null;
    }
    return foundIndex + 1;
  }
  private freeSpaceInRAM(numPages: number): void {
    //Liberar espaço na RAM conforme algoritmo de paginação da classe para que seja possível adicionar o numPages de páginas do processo que está sendo executado
     //TODO: implement pagination algorithm LRU ou FIFO
  }
}
