export interface InterfaceMemory {
  storePage(processId: number, numPages: number): void;
  freeUpSpace(processId: number, numPages: number): void;
  processById(processId: number): number[];
  get storageLeft(): number;
  get storage(): (number | null)[];
}
