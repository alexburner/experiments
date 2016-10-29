function WorkerLink(uri) {
    this.callbacks = [];
    this.worker = new Worker(uri);
    this.worker.addEventListener('message', function (e) {
        this.callbacks.shift()(e.data);
    }.bind(this));
}

WorkerLink.prototype.send = function (request, callback) {
    this.callbacks.push(callback || function () {});
    this.worker.postMessage(request);
};