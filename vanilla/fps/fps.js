// IIFE
(() => {

    // create element
    const el = document.createElement('div');
    el.id = 'fps';
    el.style.whiteSpace = 'pre-wrap';
    el.style.fontFamily = 'monospace';
    el.style.fontSize = '11px';
    el.style.position = 'fixed';
    el.style.right = '6px';
    el.style.bottom = '6px';
    el.style.width = 'auto';
    el.style.height = 'auto';
    document.body.appendChild(el);

    // track fps
    let prevTime;
    let prevAvg;
    const update = (time) => {
        window.requestAnimationFrame(update);
        if (time === undefined) return;
        if (prevTime === undefined) {
            prevTime = time;
            return;
        }
        const diff = time - prevTime;
        const spf = diff / 1000;
        const fps = 1 / spf;
        if (prevAvg === undefined) {
            prevAvg = fps;
            return;
        }
        const avg = (prevAvg + fps) / 2;
        el.textContent = (
            'fps ' + fps.toFixed(7) + '\n' +
            'avg ' + avg.toFixed(7)
        );
        prevTime = time;
        prevAvg = avg;
    };

    // begin
    update();

})();