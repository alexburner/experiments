/**
 * SVG export
 * via http://www.mikechambers.com/blog/2014/07/01/saving-svg-content-from-paper.js/
 */

// listen for shift+o
tool = new paper.Tool();
tool.onKeyUp = function(e) {
    if (e.character == "O") {
        openAsSVG();
    }
}

function openAsSVG() {
    var svgString = paper.project.exportSVG({
        matchShapes: true,
        asString: true
    });
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(svgString);
    var link = document.createElement('a');
    link.target = "_blank";
    link.href = url;
    link.click();
}