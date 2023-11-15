import { Method } from "./Method";

export type Conditions = {
  method: Method;
  pagination: "FIFO" | "LRU";
  quantum: number;
  overhead: number;
  delay: number;
};
