self.importScripts('../../lodash.min.js');

/* c = {
    WIDTH: 200,
    HEIGHT: 200,
    DA: 1,
    DB: 0.5,
    FEED: 0.055,
    KILL: 0.062,
    weight: {
        CENTER: -1,
        ADJACENT: 0.2,
        DIAGONAL: 0.05,
    },
};*/

var c;
var curr;
var next;

function walk(grid, action) {
    return _.times(c.WIDTH, function (x) {
        return _.times(c.HEIGHT, function (y) {
            if (grid && action) return action(x, y, grid[x][y]);
            else if (action)    return action(x, y);
            else                return null;
        });
    });
}

function laplace(grid, x, y, ab) {
    var xL = x - 1;
    var xR = x + 1;
    var yU = y - 1;
    var yD = y + 1;
    xL = xL < 0 ? c.WIDTH - 1 : xL;
    yU = yU < 0 ? c.HEIGHT - 1 : yU;
    xR = xR % c.WIDTH;
    yD = yD % c.HEIGHT;
    var sum = 0;
    sum += grid[x][y][ab] * c.weight.CENTER;
    sum += grid[xR][y][ab] * c.weight.ADJACENT;
    sum += grid[xL][y][ab] * c.weight.ADJACENT;
    sum += grid[x][yD][ab] * c.weight.ADJACENT;
    sum += grid[x][yU][ab] * c.weight.ADJACENT;
    sum += grid[xR][yD][ab] * c.weight.DIAGONAL;
    sum += grid[xR][yU][ab] * c.weight.DIAGONAL;
    sum += grid[xL][yD][ab] * c.weight.DIAGONAL;
    sum += grid[xL][yU][ab] * c.weight.DIAGONAL;
    return sum;
}

var interface = {
    init: function (args) {
        c = args.c;

        curr = walk(null, function (x, y, cell) {
            return { a: args.seed.a, b: args.seed.b };
        });

        next = walk(curr, function (x, y, cell) {
            return { a: cell.a, b: cell.b };
        });

        return curr;
    },

    set: function (grid) {
        curr = grid
    },

    tick: function () {
        var pixels = new ImageData(c.WIDTH, c.HEIGHT).data;

        walk(curr, function (x, y, cell) {
            next[x][y].a = _.clamp((
                cell.a +
                laplace(curr, x, y, 'a') * c.DA -
                cell.a * cell.b * cell.b +
                (1 - cell.a) * c.FEED
            ), 0, 1);
            next[x][y].b = _.clamp((
                cell.b +
                laplace(curr, x, y, 'b') * c.DB -
                cell.a * cell.b * cell.b +
                cell.b * (c.KILL + c.FEED)
            ), 0, 1);
        });

        walk(next, function (x, y, cell) {
            var index = 4 * (x + y * c.WIDTH);
            var color = Math.floor((cell.a - cell.b) * 255);
            color = _.clamp(color, 0, 255);
            pixels[index++] = color;
            pixels[index++] = color;
            pixels[index++] = color;
            pixels[index++] = 255;
        });

        var prev = curr;
        curr = next;
        next = prev;

        return pixels;
    },
};

self.addEventListener('message', function (e) {
    var request = e.data;
    if (!request) return;
    if (!request.methodName) return;
    var method = interface[request.methodName];
    if (typeof method !== 'function') return;
    self.postMessage(method.apply(interface, request.argsArr));
});