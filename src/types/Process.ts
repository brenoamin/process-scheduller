export class Process {

  id: number;
  arrivalTime: number;
  executionTime: number;
  remainingTime: number;
  deadline: number;
  numPages: number;

  constructor(id: number = 0, arrivalTime: number = 0, executionTime: number = 0, deadline: number = 0, numPages: number = 0) {
    this.id = id;
    this.arrivalTime = arrivalTime;
    this.executionTime = executionTime;
    this.remainingTime = executionTime;
    this.deadline = deadline;
    this.numPages = numPages;
  }
}