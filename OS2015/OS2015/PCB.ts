/// <reference path="cpu.ts" />
class PCB {
    PID: number;
    burstTime: number;
    ioTime: number;
    priority: number;
    state: boolean;
    arrivalTime: number;
    completedTime: number;
    accumulatedTime: number;

    constructor(PID: number, arrivalTime: number, burstTime: number, priority: number, ioTime: number, state: boolean ) {
        this.PID = PID;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.priority = priority;
        this.state = state;
        this.ioTime = ioTime;
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

