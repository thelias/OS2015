/// <reference path="pcb.ts" />
/// <reference path="cpu.ts" />
var processes = [];
var ordered = [];
var time = 0;
var completed = [];
var cpu;
var totalCompleted = 0;
var totalArrival = 0;
var contextSwitch = 0;
var timeQuantum = 20;
declare var $;
window.onload = () => {
    cpu = new CPU(1, 0, 0);

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
        var process = new PCB(i, arrivalTime, burstTime, 0, ioTime, true, 0);
        processes.push(process);
    }
}



function main(func) {
    getProcesses(10);
    switch (func) {
        case "rrsmall":
            rrGetPriority(processes, timeQuantum);
            break;
        case "rrbig":
            rrGetPriority(processes, timeQuantum);
            break;
        case "fcfs":
            fcfsGetPriority(processes);
        case "spn":
            spnGetPriority(processes);
    }
    var complete = processes.length;
    while (completed.length < complete) {
        for (var k = 0; k < cpu.processors.length; k++) {
            if (cpu.processors[k].availible == true) {
                for (var i = 0; i < processes.length; i++) {
                    if (processes[i].availableState == true && cpu.processors[k].availible == true) {
                        cpu.processors[k].process = processes[i];
                        cpu.processors[k].availible = false;
                        processes[i].availableState = false;
                    }
                }
            }
            else {
                if (cpu.processors[k].completed == false) {
                    if (cpu.processors[k].process.burstTime == 0) {
                        cpu.processors[k].process.completedTime = time;
                        completed.push(cpu.processors[k].process);
                        cpu.processors[k].completed = true;
                        totalCompleted += cpu.processors[k].process.completedTime;
                        totalArrival += cpu.processors[k].process.arrivalTime;
                    }
                    else {
                        if (cpu.processors[k].process.roundRobin == true) {
                            cpu.processors[k].process.timeQuantum--;
                            cpu.processors[k].process.burstTime--;
                            cpu.processors[k].timeRunning++;
                            if (cpu.processors[k].process.timeQuantum == 0) {
                                cpu.processors[k].availible = true;
                            }
                        }
                        else if (cpu.processors[k].process.roundRobin == false) {
                            cpu.processors[k].process.burstTime--;
                            cpu.processors[k].timeRunning++;
                        }
                    }
                    if (cpu.processors[k].contextSwitch != 0 && cpu.processors[k].process.roundRobin == true && cpu.processors[k].process.timeQuantum == 0) {
                        cpu.processors[k].contextSwitch--;
                    }
                    else if (cpu.processors[k].contextSwitch == 0 && cpu.processors[k].process.roundRobin == true && cpu.processors[k].process.timeQuantum == 0) {
                        cpu.processors[k].available = true;
                        cpu.processors[k].contextSwitch = 2;
                        contextSwitch += cpu.processors[k].contextSwitch;
                        cpu.processors[k].process.timeQuantum = timeQuantum;

                    }
                }
                    if (cpu.processors[k].contextSwitch != 0 && cpu.processors[k].completed == true) {
                        cpu.processors[k].contextSwitch--;
                    }
                    else if (cpu.processors[k].completed == true) {
                        cpu.processors[k].availible = true;
                        cpu.processors[k].completed = false;
                        time += cpu.processors[k].process.localTime;
                        cpu.processors[k].contextSwitch = 2;
                        contextSwitch += cpu.processors[k].contextSwitch;
                    }
            }
        }
        $('#results').text(Math.floor((totalCompleted - totalArrival) / completed.length));
        for (var i = 0; i < completed.length; i++) {
            // console.log(completed[i])
        }

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

function rrGetPriority(processes: Array<PCB>, quantum: number) {

    for (var i = 0; i < processes.length; i++) {
        var priority = 0;
        for (var j = 0; j < processes.length; j++)
        {
            processes[i].timeQuantum = quantum;
            if (processes[i].arrivalTime > processes[j].arrivalTime) {
                priority++;
            }
        }
        processes[i].priority = priority;
        processes[i].roundRobin = true;

    }
}
