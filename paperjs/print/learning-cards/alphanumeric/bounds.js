function bounds(center, width, height) {
    var bounds = new paper.Path.Rectangle({
        point: [
            center.x - width / 2,
            center.y - height / 2
        ],
        size: [width, height],
        strokeColor: 'black',
        dashArray: [1, 4],
    });
}