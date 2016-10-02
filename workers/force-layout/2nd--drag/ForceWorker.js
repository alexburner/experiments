self.importScripts('..//lib/lodash.min.js');
self.importScripts('..//lib/d3/collection.min.js');
self.importScripts('..//lib/d3/dispatch.min.js');
self.importScripts('..//lib/d3/selection.min.js');
self.importScripts('..//lib/d3/drag.min.js');
self.importScripts('..//lib/d3/quadtree.min.js');
self.importScripts('..//lib/d3/timer.min.js');
// self.importScripts('..//lib/d3/force.js');
self.importScripts('..//lib/d3/force.min.js');

var width;
var height;
var charge;
var link;
var x;
var y;
var simulation;
var nodes;
var links;
var subject;

var interface = {
    init: function (args) {
        nodes = args.nodes;
        links = args.links;
        width = args.width;
        height = args.height;
        simulation = d3.forceSimulation();
        simulation.nodes(nodes);
        simulation.stop();
        charge = d3.forceManyBody();
        link = d3.forceLink(links);
        link.distance(30);
        link.strength(1);
        x = d3.forceX();
        y = d3.forceY();
        simulation.force('charge', charge);
        simulation.force('link', link);
        simulation.force('x', x);
        simulation.force('y', y);
    },
    tick: function () {
        simulation.tick();
        return {
            nodes: nodes,
            links: links
        };
    },
    dragstart: function (x, y, active) {
        subject = simulation.find(x - width / 2, y - height / 2);
        if (!active) simulation.alphaTarget(0.3);
        simulation.fix(subject);
    },
    dragging: function (x, y) {
        simulation.fix(subject, x - width / 2, y - height / 2);
    },
    dragend: function (active) {
        if (!active) simulation.alphaTarget(0);
        simulation.unfix(subject);
        subject = null;
    },
    resize: function (size) {
        width = size.width;
        height = size.height;
    }
};

self.addEventListener('message', function (e) {
    var request = e.data;
    if (!request) return;
    var method = interface[request.methodName];
    if (!_.isFunction(method)) return;
    self.postMessage(method.apply(interface, request.argsArr));
});
