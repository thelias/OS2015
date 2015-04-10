var CPU = (function () {
    function CPU(numProccessors, processTime, waitTime) {
        this.processors = [];
        this.numProcessors = numProccessors;
        this.processTime = processTime;
        for (var i = 0; i < this.numProcessors; i++) {
            var processor = { availible: true, process: PCB, contextSwitch: 2, timeRunning: 0, completed: false };
            this.processors.push(processor);
        }
    }
    CPU.prototype.calculateTotalArrivalTime = function (processorArrivalTime) {
        if (processorArrivalTime < this.processTime) {
            this.calculateWaitTime(processorArrivalTime);
        }
        this.processTime += processorArrivalTime - this.processTime;
    };
    CPU.prototype.calculateWaitTime = function (processArrivalTime) {
        this.waitTime += this.processTime - processArrivalTime;
    };
    return CPU;
})();
//# sourceMappingURL=CPU.js.map