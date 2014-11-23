centerMin = 100;
centerMax = 600;
radiusMin = 1;
radiusMax = 100;

//e = [2, 7, 1, 8, 2, 8, 1, 8, 2, 8, 4, 5, 9, 0, 4, 5, 2, 3, 5, 3, 6, 0, 2, 8, 7, 4, 7, 1, 3, 5, 2, 6, 6, 2, 4, 9, 7, 7, 5, 7, 2, 4, 7, 0, 9, 3, 6, 9, 9, 9, 5, 9, 5, 7, 4, 9, 6, 6, 9, 6, 7, 6, 2, 7, 7, 2, 4, 0, 7, 6, 6, 3, 0, 3, 5, 3];
//p = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9, 5, 0, 2, 8, 8, 4, 1, 9, 7, 1, 6, 9, 3, 9, 9, 3, 7, 5, 1, 0, 5, 8, 2, 0, 9, 7, 4, 9, 4, 4, 5, 9, 2, 3, 0, 7, 8, 1, 6, 4, 0, 6, 2, 8, 6];

function start() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    for (i = 0; i < 500; i++) {
        e = getE(i);
        p = getPi(i);

        x = limit(e[0] * 100 + e[1] * 10 + e[2], 1000, centerMin, centerMax);
        y = limit(p[0] * 100 + p[1] * 10 + p[2], 1000, centerMin, centerMax);
        radius = limit(e[2] * 100 + p[1] * 10 + e[0], 1000, radiusMin, radiusMax);

        r = limit(e[1] * 100 + p[2] * 10 + e[0], 1000, 0, 255);
        g = limit(p[1] * 100 + e[2] * 10 + p[0], 1000, 0, 255);
        b = limit(e[1] * 100 + e[2] * 10 + p[0], 1000, 0, 255);

        //alert("r:" + r + ", g:" + g + ", b:" + b + ", x:" + x + ", y:" + y + ", radius:" + radius);
        circle(ctx, r, g, b, x, y, radius);
    }
}

function point(ctx, col, x, y, width, height) {
    ctx.fillStyle = col;
    ctx.fillRect(x, y, width, height);
}

function rgb(r, g, b, a) {
    rs = Math.min(255, Math.max(0, Math.floor(r)));
    gs = Math.min(255, Math.max(0, Math.floor(g)));
    bs = Math.min(255, Math.max(0, Math.floor(b)));
    as = Math.min(1, Math.max(0, Math.floor(a)));
    return "rgba(" + rs + "," + gs + "," + bs + "," + as + ")";
}

function circle(ctx, r, g, b, x, y, radius) {
    var grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grd.addColorStop(0, rgb(r, g, b, 1));
    grd.addColorStop(1, rgb(r, g, b, 0));

    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function getE(i) {
    return [rndSingleDigit(), rndSingleDigit(), rndSingleDigit(), rndSingleDigit(), rndSingleDigit(), rndSingleDigit(), rndSingleDigit(), rndSingleDigit(), rndSingleDigit()];
}

function getPi(i) {
    return getE(i);
}

function rndSingleDigit() {
    return Math.floor(Math.random() * 10);
}

function limit(value, valueMax, outMin, outMax) {
    return (value * (outMax - outMin) / valueMax) + outMin;
}

function composeFromArray(array, index) {
    
}