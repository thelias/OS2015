/// <reference path="cpu.ts" />
class PCB {
    PID: number;
    burstTime: number;
    localTime: number;
    timeQuantum: number;
    ioTime: number;
    priority: number;
    availableState: boolean; // if true then available
    arrivalTime: number;
    completedTime: number;
    accumulatedTime: number;
    roundRobin: boolean;

    constructor(PID: number, arrivalTime: number, burstTime: number, priority: number, ioTime: number, state: boolean, timeQuantum: number ) {
        this.PID = PID;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.localTime = burstTime;
        this.priority = priority;
        this.availableState = state;
        this.ioTime = ioTime;
        this.timeQuantum = timeQuantum;
        this.roundRobin = false;
    }

    completed(time: number) {
        this.completedTime = time;
    }

    calculateTime() {
        return this.accumulatedTime = this.completedTime - this.arrivalTime;
    }

    display() {
    }
}

