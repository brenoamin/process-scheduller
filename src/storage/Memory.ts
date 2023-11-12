import { InterfaceMemory } from "../types/Memory";

export default class Memory implements InterfaceMemory {
  private readonly _storage: (number | null)[];
  private readonly storageCount: number;

  constructor(storageCount: number, pageCount: number) {
    if (storageCount < pageCount) {
      throw new Error(
        "Invalid parameters: storageCount must be greater than or equal to pageCount"
      );
    }

    this.storageCount = storageCount / pageCount;
    this._storage = new Array(this.storageCount).fill(null);
  }

  get storageLeft(): number {
    return this._storage.filter((storage) => storage === null).length;
  }

  get storage(): (number | null)[] {
    return this._storage;
  }

  public processById(processId: number): number[] {
    let processPages: number[] = [];
    for (let i = 0; i < this.storageCount; i++) {
      if (this._storage[i] == processId) {
        processPages.push(i);
      }
    }
    return processPages;
  }

  public storePage(processId: number, numPages: number): void {
    let storedCount: number = 0;

    if (this.storageLeft < numPages) {
      console.log("Not enough storage left");
    } else {
      for (let i = 0; i < this.storageCount; i++) {
        if (this._storage[i] === null) {
          this._storage[i] = processId;
          storedCount++;
          if (storedCount == numPages) {
            break;
          }
        }
      }
    }
  }

  public freeUpSpace(processId: number, numPages: number): void {
    let spaceFreeCount: number = 0;
    for (let i = 0; i < this.storageCount; i++) {
      if (this._storage[i] == processId) {
        this._storage[i] = null;
        spaceFreeCount++;
        if (spaceFreeCount == numPages) {
          break;
        }
      }
    }
  }
}
