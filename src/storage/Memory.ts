import { InterfaceMemory } from "../types/Memory";
import {Process} from "../types/Process.ts";
import {ProcessState} from "../types/ProcessState.ts";

export default class Memory implements InterfaceMemory {
  private readonly processes: Process[]
  private readonly scheduler: ProcessState[][]

  private disk: number[]
  private ram: number[]

  private time: number = 0

  constructor(processes: Process[], scheduler: ProcessState[][]) {
    this.processes = processes
    this.scheduler = scheduler

    this.loadDisk(this.processes)
    this. buildMemory()
  }
  getDisk(): number[] {
    return this.disk;
  }

  getRam(): number[] {
    return this.ram;
  }
  nextTime(): void {
   this.time++;

    this. buildMemory()
  }

  private buildMemory(): void {

  }

  private loadDisk(processes: Process[]) {
    processes.forEach(process => {
      for(let i = 0; i < process.numPages; i++) {
        this.disk.push(process.id)
      }
    })
  }
}