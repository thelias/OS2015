var CPU = (function () {
    function CPU(numProccessors) {
        this.processors = [];
        this.numProcessors = numProccessors;
        for (var i = 0; i < this.numProcessors; i++) {
            var processor = { availible: true, process: PCB, contextSwitch: 2, timeRunning: 0, completed: false };
            this.processors.push(processor);
        }
    }
    return CPU;
})();
//# sourceMappingURL=CPU.js.map