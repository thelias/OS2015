/// <reference path="cpu.ts" />
var PCB = (function () {
    function PCB(PID, arrivalTime, burstTime, priority, ioTime, state) {
        this.PID = PID;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.priority = priority;
        this.state = state;
        this.ioTime = ioTime;
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
window.onload = function () {
    var el = document.getElementById('content');
    var testPCB = new PCB(1, 0, 100, 10, 20, true);
};
//# sourceMappingURL=PCB.js.map