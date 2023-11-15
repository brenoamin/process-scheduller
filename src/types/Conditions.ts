export type Conditions = {
  method: "FIFO" | "RR" | "SJF" | "EDF";
  pagination: "FIFO" | "LRU";
  quantum: number;
  override: number;
  delay: number;
};
