import { InterfaceMemory } from "../types/Memory";
import { PaginationAlgorithm } from "../types/PaginationAlgorithm.ts";
import { Process } from "../types/Process.ts";
import { ProcessState } from "../types/ProcessState.ts";

export default class Memory implements InterfaceMemory {
  private readonly processes: Process[];
  private readonly scheduler: ProcessState[][];

  private disk: (number | null)[] = new Array(150).fill(null);
  private ram: (number | null)[] = new Array(50).fill(null);
  private readonly paginationAlgorithm: PaginationAlgorithm; //FIFO ou LRU

  private time: number = 0;

  private queue: number[] = [];

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
  getDisk(): (number | null)[] {
    return this.disk;
  }

  getRam(): (number | null)[] {
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

    const process = this.processes[runningProcess - 1]

    if (this.findProcessInRAM(process)) {
      return;
    }

    const pagesProcessInDisk = this.getNumPagesProcessInDisk(process.id)
    if (storageRemaining < pagesProcessInDisk) {
      this.freeSpaceInRAM(pagesProcessInDisk);
    }
    this.addProcessToRAM(process)
  }

  private loadDisk(processes: Process[]) {
    processes.forEach((process) => {
      for (let i = 0; i < process.numPages; i++) {
        this.addInDisk(process.id);
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

  private findProcessInRAM(process: Process): boolean {
    // Count the number of pages of the process in RAM
    const numPagesInRAM = this.ram.filter(item => item === process.id).length;

    // Check if all pages of the process are in RAM
    return numPagesInRAM === process.numPages;
  }
  private freeSpaceInRAM(numPages: number): void {
    // Remove pages until there is enough space
    while (this.storageRemaining() < numPages) {
      // Get the ID of the process to remove
      let idToRemove: number | undefined;
      if (this.paginationAlgorithm === PaginationAlgorithm.FIFO) {
        // FIFO: remove the process that was added first
        idToRemove = this.queue.shift();
      } else if (this.paginationAlgorithm === PaginationAlgorithm.LRU) {
        // LRU: remove the process that was used least recently
        idToRemove = this.queue.pop();
      }

      // Remove the process from RAM and add it to disk
      if (idToRemove !== undefined) {
        let index = this.ram.findIndex(item => item === idToRemove);
        if (index !== -1) {
          this.ram[index] = null;
          this.addInDisk(idToRemove);
          index = this.ram.findIndex(item => item === idToRemove);
        }
      }
    }
  }

  private addProcessToRAM(process: Process): void {
    // Move the process pages from disk to RAM
    for (let i = 0; i < process.numPages; i++) {
      // Find the first page of the process on disk
      const indexOnDisk = this.disk.findIndex(item => item === process.id);

      // If the page is on disk, move it to RAM
      if (indexOnDisk !== -1) {
        // Find the first free space in RAM
        const indexInRAM = this.ram.findIndex(item => item === null);

        // If there is free space in RAM, move the page from disk to RAM
        if (indexInRAM !== -1) {
          this.ram[indexInRAM] = this.disk[indexOnDisk];
          this.disk[indexOnDisk] = null;
        } else {
          // If there is no free space in RAM, stop trying to move pages
          break;
        }
      }  else break;
    }

    //TODO: rever lógica da fila
    // Update the queue
    if (this.paginationAlgorithm === PaginationAlgorithm.FIFO) {
      // For FIFO, add the process to the end of the queue
      this.queue.push(process.id);
    } else if (this.paginationAlgorithm === PaginationAlgorithm.LRU) {
      // For LRU, move the process to the end of the queue
      const indexInQueue = this.queue.findIndex(item => item === process.id);
      if (indexInQueue !== -1) {
        this.queue.splice(indexInQueue, 1);
      }
      this.queue.push(process.id);
    }
  }

  private getNumPagesProcessInDisk(processId: number): number {
    return this.disk.filter(item => item === processId).length;
  }

  private addInDisk(id: number): void {
    const indexInDisk = this.disk.findIndex(item => item === null);

    // If there is free space in RAM, move the page from disk to RAM
    if (indexInDisk !== -1) {
      this.disk[indexInDisk] = id;
    }
  }

}
