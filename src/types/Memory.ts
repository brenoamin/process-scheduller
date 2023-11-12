export interface InterfaceMemory {
  storePage(processId: number, numPages: number): void;
  freeUpSpace(processId: number, numPages: number): void;
  get storageLeft(): number;
  get storage(): (number | null)[];
}
