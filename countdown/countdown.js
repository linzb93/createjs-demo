function formatTime(num) {
    return num >= 10 ?
    num.toString() :
    '0' + num.toString();
}
var now = new Date();
var num = [formatTime(now.getHours()), ':', formatTime(now.getMinutes()), ':', formatTime(now.getSeconds())].join('');
var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000", '#ff0043'];

var canvas = document.getElementById('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var stage = new createjs.Stage('canvas');
var index = 0;
var queue = [];
while (index < 8) {
    var dig = num[index] === ':' ? 10 : num[index];
    for (var i = 0; i < 10; i ++) {
        for (var j = 0; j < (dig === 10 ? 4 : 7); j++) {
            if (digit[dig][i][j] === 1) {
                var circle = new createjs.Shape();
                circle.graphics.beginFill(colors[dig]).drawCircle(0, 0, 8);
                circle.x = 80 + 150 * index + 18 * j;
                circle.y = 20 + 18 * i;
                stage.addChild(circle);
                var map = {};
                map.shape = circle;
                map.dir = Math.random()>0.5? 1 : -1;
                queue.push(map);
            }
        }
    }
    index++;
}

stage.update();
var t = 0;
createjs.Ticker.setFPS(10);
createjs.Ticker.addEventListener('tick', tick);
function tick() {
    queue.forEach(function(item, index) {
        if (item.shape.y < 600) {
            item.shape.x += 10 * item.dir;
            item.shape.y += 2 + t;
        } else {
            item.shape.y = 600;
        }
    });
    t++;
    stage.update();
}