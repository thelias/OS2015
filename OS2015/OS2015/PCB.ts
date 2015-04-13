
/// <reference path="cpu.ts" />
class PCB {
    PID: number;
    burstTime: number;
    localTime: number;
    timeQuantum: number;
    priority: number;
    availableState: boolean; // if true then available
    arrivalTime: number;
    startTime: number;
    completedTime: number;
    accumulatedTime: number;
    contextSwitch: number;
    roundRobin: boolean;

    constructor(PID: number, arrivalTime: number, burstTime: number, priority: number, state: boolean, timeQuantum: number ) {
        this.PID = PID;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.localTime = burstTime;
        this.priority = priority;
        this.availableState = state;
        this.timeQuantum = timeQuantum;
        this.contextSwitch = 2;
        this.roundRobin = false;
        this.startTime = 0;
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

