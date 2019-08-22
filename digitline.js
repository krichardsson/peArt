var space = 5;
var seglen = 20;

var black = "#000000";
var gray = "#C0C0C0";
var red = "#ff0000";

function start() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var digits = [
        digit(10 + (seglen + space) * 0, 10 + (2 * seglen + space) * 0),
        digit(10 + (seglen + space) * 1, 10 + (2 * seglen + space) * 0),
        digit(10 + (seglen + space) * 2, 10 + (2 * seglen + space) * 0),
        digit(10 + (seglen + space) * 3, 10 + (2 * seglen + space) * 0),
        digit(10 + (seglen + space) * 0, 10 + (2 * seglen + space) * 1),
        digit(10 + (seglen + space) * 1, 10 + (2 * seglen + space) * 1),
        digit(10 + (seglen + space) * 2, 10 + (2 * seglen + space) * 1),
        digit(10 + (seglen + space) * 3, 10 + (2 * seglen + space) * 1),
    ];

    var l = [38, 0, 65, 100];
    line(ctx, l, black);

    process(l, digits);

    for (var i = 0; i < 8; i++) {
        drawDigit(ctx, digits[i]);
    }
}


function line(ctx, v, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(v[0], v[1]);
    ctx.lineTo(v[2], v[3]);
    ctx.stroke();
}

function digit(x, y) {
    return [
        [
            [x, y, x, y + seglen],
            [x, y + seglen, x, y + 2 * seglen],
            [x + seglen, y, x + seglen, y + seglen],
            [x + seglen, y + seglen, x + seglen, y + 2 * seglen],

            [x, y, x + seglen, y],
            [x, y + seglen, x + seglen, y + seglen],
            [x, y + 2 * seglen, x + seglen, y + 2 * seglen],
        ],
        [
            false, false, false, false, false, false, false
        ]
    ];
}

function drawDigit(ctx, digit) {
    for (var i = 0; i < 7; i++) {
        var segment = digit[0][i];
        var mask = digit[1][i];

        var color = gray;
        if (mask) {
            color = red;
        }

        line(ctx, segment, color);
    }
}

function process(l, digits) {
    var best = {};
    for (var i = 0; i < digits.length; i++) {
        digit = digits[i];
        // Vertical segments only
        for (var j = 0; j < 4; j++) {
            segment = digit[0][j];
            var score = calcSegmentScore(l, segment);

            var y = segment[1];
            var high = 1000000;
            if (best[y]) {
                high = best[y][0];
            }

            if (score < high) {
                best[y] = [score, i, j];
            }
        }
    }

    for (var y in best) {
        console.log(y);
        var vals = best[y];
        digits[vals[1]][1][vals[2]] = true;
    }
}

function calcSegmentScore(l, segment) {
    var dx0 = xAty(l, segment[1]) - segment[0];
    var dx1 = xAty(l, segment[3]) - segment[2];
    return Math.abs(dx0) + Math.abs(dx1);
}

function xAty(l, y) {
    var dx = l[2] - l[0];
    var dy = l[3] - l[1];
    var yy = y - l[1];
    console.log(l, dx, dy, yy);
    return l[0] + dx * yy / dy;
}