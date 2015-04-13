/// <reference path="pcb.ts" />
/// <reference path="cpu.ts" />
var processes = [];
var ordered = [];
var time = 0;
var simTime = 0;
var completed = [];
var cpu;
var totalCompleted = 0;
var totalArrival = 0;
var totalStartTime = 0;
var contextSwitch = 0;
var timeQuantum = 20;
declare var $;
window.onload = () => {
    cpu = new CPU(3, 0, 0);

}

function getProcesses(numProcesses: number) {
    for (var i = 0; i < numProcesses; i++) {
        var arrivalTime = i * 10 + (Math.floor((Math.random() * 20) + 1));
        var burstTime = Math.floor((Math.random() * 100) + 1);
        var chance = Math.floor((Math.random() * 10) + 1);
        var process = new PCB(i, arrivalTime, burstTime, 0, true, 0);
        processes.push(process);
    }
}



function main(func) {
    processes = [];
    ordered = [];
    time = 0;
    completed = [];
    totalCompleted = 0;
    totalArrival = 0;
    totalStartTime = 0;
    contextSwitch = 0;
    timeQuantum = 20;
    simTime = 0;

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
            break;
        case "spn":
            spnGetPriority(processes);
            break;
    }
    var complete = processes.length;
    while (completed.length < complete) {
        simTime++;
        for (var k = 0; k < cpu.processors.length; k++) {
            if (cpu.processors[k].availible == true) {
                for (var i = 0; i < processes.length; i++) {
                    if (processes[i].arrivalTime <= simTime) {
                        if (processes[i].availableState == true && cpu.processors[k].availible == true) {
                            cpu.processors[k].process = processes[i];
                            cpu.processors[k].availible = false;
                            processes[i].availableState = false;
                            processes[i].startTime = simTime;
                        }
                    }
                }
            }
            else if (cpu.processors[k].availible == false) {
                if (cpu.processors[k].completed == false) {
                    if (cpu.processors[k].process.burstTime == 0) {
                        cpu.processors[k].process.completedTime = cpu.processors[k].process.localTime + cpu.processors[k].process.startTime;
                        completed.push(cpu.processors[k].process);
                        cpu.processors[k].completed = true;
                        totalCompleted += cpu.processors[k].process.completedTime;
                        totalArrival += cpu.processors[k].process.arrivalTime;
                        totalStartTime += cpu.processors[k].process.startTime;

                    }
                    else {
                        if (cpu.processors[k].process.roundRobin == true && cpu.processors[k].contextSwitch == 2) {
                            cpu.processors[k].process.timeQuantum--;
                            cpu.processors[k].process.burstTime--;
                            cpu.processors[k].timeRunning++;
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
            //console.log(simTime);
        }


    }
    for (var i = 0; i < completed.length; i++) {
        console.log(completed[i])
    }
    switch (func) {
        case "rrsmall":
            var temp = $('#smallTurn').text()
            temp = $('#smallTurn').text() + Math.floor((totalCompleted - totalArrival) / completed.length);
            $('#smallTurn').text(temp);
<<<<<<< HEAD
            temp = $('#smallRes').text() + Math.floor((totalStartTime - totalArrival) / completed.length);
            $('#smallRes').text(temp);
=======
            var throughput = $('smallThrgh').text();
            throughput = $('#smallThrgh').text() + calculateThroughput();
            $('#smallThrgh').text(throughput);
>>>>>>> db19a5fa9b4c77b643c9e85d49495b034c8f8161
            break;
        case "rrbig":
            var temp = $('#bigTurn').text() + Math.floor((totalCompleted - totalArrival) / completed.length);
            $('#bigTurn').text(temp);
<<<<<<< HEAD
            temp = $('#largeRes').text() + Math.floor((totalStartTime - totalArrival) / completed.length);
            $('#largeRes').text(temp);
=======
            var throughput = $('largeThrgh').text();
            throughput = $('#largeThrgh').text() + calculateThroughput();
            $('#largeThrgh').text(throughput);
>>>>>>> db19a5fa9b4c77b643c9e85d49495b034c8f8161
            break;
        case "fcfs":
            var temp = $('#fcfsTurn').text() + Math.floor((totalCompleted - totalArrival) / completed.length);
            $('#fcfsTurn').text(temp);
<<<<<<< HEAD
            temp = $('#fcfsRes').text() + Math.floor((totalStartTime - totalArrival) / completed.length);
            $('#fcfsRes').text(temp);
=======
            var throughput = $('fcfsThrgh').text();
            throughput = $('#fcfsThrgh').text() + calculateThroughput();
            $('#fcfsThrgh').text(throughput);
>>>>>>> db19a5fa9b4c77b643c9e85d49495b034c8f8161
            break;
        case "spn":
            var temp = $('#spnTurn').text() + Math.floor((totalCompleted - totalArrival) / completed.length);
            $('#spnTurn').text(temp);
<<<<<<< HEAD
            temp = $('#spnRes').text() + Math.floor((totalStartTime - totalArrival) / completed.length);
            $('#spnRes').text(temp);
=======
            var throughput = $('spnThrgh').text();
            throughput = $('#spnThrgh').text() + calculateThroughput();
            $('#spnThrgh').text(throughput);
>>>>>>> db19a5fa9b4c77b643c9e85d49495b034c8f8161
            break;
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
        for (var j = 0; j < processes.length; j++) {
            processes[i].timeQuantum = quantum;
            if (processes[i].arrivalTime > processes[j].arrivalTime) {
                priority++;
            }
        }
        processes[i].priority = priority;
        processes[i].roundRobin = true;

    }
}

function calculateThroughput() {
    var throughput = completed.length / time;
    return throughput.toFixed(3);
}
