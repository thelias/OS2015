/// <reference path="cpu.ts" />
var PCB = (function () {
    function PCB(PID, arrivalTime, burstTime, priority, state, timeQuantum) {
        this.PID = PID;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.localTime = burstTime;
        this.priority = priority;
        this.availableState = state;
        this.timeQuantum = timeQuantum;
        this.contextSwitch = 2;
        this.roundRobin = false;
    }
    PCB.prototype.completed = function (time) {
        this.completedTime = time;
    };
    PCB.prototype.calculateTime = function () {
        return this.accumulatedTime = this.completedTime - this.arrivalTime;
    };
    PCB.prototype.display = function () {
    };
    return PCB;
})();
//# sourceMappingURL=PCB.js.map