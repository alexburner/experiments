//
//
/////////////////////////////////////////
function makeBack(args) {
    var x = args.x;
    var y = args.y;
    var w = args.width;
    var h = args.height;

    // background color shape
    // var backdrop = new shapes.Backdrop();
    var marginX = 14;
    var marginY = 7;
    var backdrop = new paper.Path.Rectangle(
        new paper.Point(
            x + marginX,
            y + marginY - 14
        ),
        new paper.Size(
            w - marginX * 2,
            h - marginY * 2
        )
    );

    backdrop.fillColor = '#111';
}