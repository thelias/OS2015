/// <reference path="pcb.ts" />
/// <reference path="cpu.ts" />
var processes = [];
function getProcesses(numProcesses) {
    for (var i = 0; i < numProcesses; i++) {
        var arrivalTime = i * 10 + (Math.floor((Math.random() * 20) + 1));
        var burstTime = Math.floor((Math.random() * 100) + 1);
        var chance = Math.floor((Math.random() * 10) + 1);
        var ioTime = 0;
        if (chance > 5) {
            ioTime = Math.floor((Math.random() * 100) + 1);
        }
        var process = new PCB(i, arrivalTime, burstTime, 0, ioTime, false);
        processes.push(process);
    }
}
function createCPUs(numCpus) {
}
function main() {
    getProcesses(10);
    fcfsGetPriority(processes);
    for (var i = 0; i < processes.length; i++) {
        console.log(processes[i]);
    }
}
function fcfsGetPriority(processes) {
    for (var i = 0; i < processes.length; i++) {
        var priority = 0;
        for (var j = 0; j < processes.length; j++) {
            if (processes[i].arrivalTime > processes[j].arrivalTime) {
                priority++;
            }
        }
        processes[i].priority = priority;
    }
}
function spnGetPriority(processes) {
    for (var i = 0; i < processes.length; i++) {
        var priority = 0;
        for (var j = 0; j < processes.length; j++) {
            if (processes[i].burstTime > processes[j].burstTime) {
                priority++;
            }
        }
        processes[i].priority = priority;
    }
}
//# sourceMappingURL=Simulator.js.map