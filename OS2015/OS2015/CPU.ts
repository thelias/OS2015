class CPU {
    numProcessors: number;
    processors = [];

    constructor(numProccessors: number) {
        this.numProcessors = numProccessors;
        for (var i = 0; i < this.numProcessors; i++) {
            var processor = { availible: true, process: PCB, contextSwitch: 2, timeRunning: 0, completed: false }
            this.processors.push(processor);
        }
    }

}
