export interface InterfaceMemory {
  nextTime(): void,
  getRam(): (number | null)[],
  getDisk(): (number | null)[],
}