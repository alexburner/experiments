self.importScripts('..//lib/lodash.min.js');
self.importScripts('Maths.js');
self.importScripts('Flock.js');

var modules = {};
modules.Flock = Flock;

self.addEventListener('message', function (e) {
    var request = e.data.request;

    var module = modules[request.moduleName];
    if (!module) return;

    var method = module[request.methodName];
    if (!_.isFunction(method)) return;

    self.postMessage({
        id: e.data.id,
        response: method.apply(module, request.argArr),
    });
});