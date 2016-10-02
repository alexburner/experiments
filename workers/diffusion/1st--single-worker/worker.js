self.importScripts('..//lib/lodash.min.js');
self.importScripts('../shared/Maths.js');
self.importScripts('Diffuse.js');
self.importScripts('messageTypes.js');

var diffuse;

self.addEventListener('message', function (e) {
    switch (e.data.type) {
        case messageTypes.INIT:
            diffuse = new Diffuse(e.data.args);
            break;
        case messageTypes.TICK:
            self.postMessage(diffuse.tick(e.data.args));
            break;
    }
});