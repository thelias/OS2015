class CPU {
    numProcessors: number;
    processTime: number;
    waitTime: number;
    processors = [];

    constructor(numProccessors: number, processTime: number, waitTime: number) {
        this.numProcessors = numProccessors;
        this.processTime = processTime;
        for (var i = 0; i < this.numProcessors; i++) {
            var processor = { availible: true, process: PCB, contextSwitch: 2, timeRunning: 0, completed: false }
            this.processors.push(processor);
        }
    }

    calculateTotalArrivalTime(processorArrivalTime: number) {
        if (processorArrivalTime < this.processTime) {
            this.calculateWaitTime(processorArrivalTime);
        }
        this.processTime += processorArrivalTime - this.processTime;
    } 

    calculateWaitTime(processArrivalTime: number) {
        this.waitTime += this.processTime - processArrivalTime;
    }

}
