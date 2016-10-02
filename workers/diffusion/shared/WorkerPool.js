function WorkerPool(uri, count) {
    this.__callbacksById = {};
    this.__currIndex = -1;
    this.__workers = WorkerPool.__createWorkers(
        uri, count, this.__handleResponse.bind(this)
    );
}

WorkerPool.__createWorkers = function (uri, count, handler) {
    var workers = [];
    while (count--) {
        var worker = new Worker(uri);
        worker.addEventListener('message', handler);
        workers.push(worker);
    }
    return workers;
};

WorkerPool.__getRequestId = function () {
    if (!WorkerPool.r_id) WorkerPool.r_id = 1;
    return WorkerPool.r_id++;
};

WorkerPool.prototype.send = function (request, callback) {
    var id = WorkerPool.__getRequestId();
    this.__callbacksById[id] = callback;
    this.__getNextWorker().postMessage({id: id, request: request});
};

WorkerPool.prototype.__handleResponse = function (e) {
    var id = e.data.id;
    var response = e.data.response;
    if (!this.__callbacksById[id]) return;
    this.__callbacksById[id](response);
    delete this.__callbacksById[id];
};

WorkerPool.prototype.__getNextWorker = function () {
    this.__currIndex = (this.__currIndex + 1) % this.__workers.length;
    return this.__workers[this.__currIndex];
};