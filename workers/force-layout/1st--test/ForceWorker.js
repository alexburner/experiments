self.importScripts('..//lib/lodash.min.js');
self.importScripts('..//lib/d3/collection.min.js');
self.importScripts('..//lib/d3/dispatch.min.js');
self.importScripts('..//lib/d3/quadtree.min.js');
self.importScripts('..//lib/d3/timer.min.js');
self.importScripts('..//lib/d3/force.min.js');

var center = d3.forceCenter();
var charge = d3.forceManyBody();
charge.strength(function (node, i) {
    return -1/2;
});

var simulation = d3.forceSimulation();
simulation.stop();
simulation.force('charge', charge);
simulation.force('center', center);

var modules = {};
modules.force = {
    init: function (nodes) {
        simulation.nodes(nodes);
    },
    tick: function () {
        simulation.tick();
        return simulation.nodes();
    }
};

self.addEventListener('message', function (e) {
    var request = e.data;
    if (!request) return;
    var module = modules[request.moduleName];
    if (!module) return;
    var method = module[request.methodName];
    if (!_.isFunction(method)) return;
    self.postMessage(method.apply(module, request.argsArr));
});