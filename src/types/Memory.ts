export interface InterfaceMemory {
  nextTime(): void,
  getRam(): number[],
  getDisk(): number[],
}