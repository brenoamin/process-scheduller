export type Conditions = {
  method: "FIFO" | "RR" | "SJF" | "EDF";
  pagination: "fifo" | "lru";
  quantum: number;
  override: number;
  delay: number;
};
