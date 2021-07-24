var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    ctx.closePath();
}
setInterval(draw, 50);