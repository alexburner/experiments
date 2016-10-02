function WorkerLink(uri) {
    this.__callbacks = [];
    this.__worker = new Worker(uri);
    this.__worker.addEventListener(
        'message', this.__handleResponse.bind(this)
    );
}

WorkerLink.prototype.send = function (request, callback) {
    this.__callbacks.push(callback || function () {});
    this.__worker.postMessage(request);
};

WorkerLink.prototype.__handleResponse = function (e) {
    this.__callbacks.shift()(e.data);
};