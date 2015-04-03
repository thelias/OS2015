/// <reference path="pcb.ts" />
/// <reference path="cpu.ts" />
var processes = [];
var time = 0;
var completed = [];
var cpu;
window.onload = () => {
    cpu = new CPU(4);

}

function getProcesses(numProcesses: number) {
    for (var i = 0; i < numProcesses; i++) {
        var arrivalTime = i * 10 + (Math.floor((Math.random() * 20) + 1));
        var burstTime = Math.floor((Math.random() * 100) + 1);
        var chance = Math.floor((Math.random() * 10) + 1);
        var ioTime = 0;
        if (chance > 5) {
            ioTime = Math.floor((Math.random() * 100) + 1);
        }
        var process = new PCB(i, arrivalTime, burstTime, 0, ioTime, true);
        processes.push(process);
    }
}



function main() {
    getProcesses(10);
    fcfsGetPriority(processes);
    var complete = processes.length;
    while (completed.length < complete) {
        for (var k = 0; k < cpu.processors.length; k++) {
            if (cpu.processors[k].availible == true) {
                for (var i = 0; i < processes.length; i++) {
                    if (processes[i].arrivalTime <= time && processes[i].state == true) {
                        cpu.processors[k].process = processes[i];
                        cpu.processors[k].availible = false;
                        processes[i].state = false;
                    }
                }
            }
            else {
                if (cpu.processors[k].completed == false) {
                    if (cpu.processors[k].process.burstTime == 0) {
                        cpu.processors[k].process.completedTime = time;
                        completed.push(cpu.processors[k].process);
                        cpu.processors[k].completed = true;
                    }
                    else {
                        cpu.processors[k].process.burstTime--;
                        cpu.processors[k].timeRunning++;
                    }
                }
                if (cpu.processors[k].contextSwitch != 0 && cpu.processors[k].completed == true) {
                    cpu.processors[k].contextSwitch--;
                }
                else if (cpu.processors[k].completed  == true) {
                    cpu.processors[k].availible = true;
                    cpu.processors[k].contextSwitch = 2;
                }

            }

        }
        time++;

    }

    for (var i = 0; i < completed.length; i++) {
        console.log(completed[i])
    }

}
function fcfsGetPriority(processes: Array<PCB>) {

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
function spnGetPriority(processes: Array<PCB>) {

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
