import * as sprites from "./sprites.js"

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var speed = 7;
var panel = 0; // 0 = Main menu, 1 = in game, 2 = game over screen
var runTime = 0;
var pickedUp = 0;
var delay = 60; // spawn delay
var aPressed = false;
var dPressed = false;
var wPressed = false;
var sPressed = false;

var buttons0 = []
var trash = []
buttons0.push(new sprites.Button(document.getElementById("button"), "Play", canvas.width / 2 - 50, canvas.height / 2 - 100, 100, 50, function() {
    panel = 1
}))
var player = new sprites.Player(document.getElementById("player"), canvas.width/2, canvas.height/2, 50, 50)

//Check if player is colliding if moving with velocity vX and vY

function draw() {
    if (!document.querySelector('#game').classList.contains('active')) {
        panel = 0
        speed = 7
        runTime = 0
        pickedUp = 0
        delay = 60
        trash = [];
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    if (panel == 0) {
        ctx.drawImage(document.getElementById("background"), 0, 0, canvas.width, canvas.height)
        ctx.font = '20px sans-serif'
        buttons0.forEach(button => {
            button.draw(ctx);
        })
    }
    else if (panel == 1) {
        runTime++;
        for(var i = 0; i < trash.length; i++) {
            trash[i].draw(ctx)
            if (player.canPickUp(trash[i])) {
                trash.splice(i, 1);
                pickedUp++;
            }
        }
        player.draw(ctx)

        if (runTime % delay == 0) {
            for (var i = 0; i < Math.round(Math.random() * 4 + 1); i++) {
                let x = Math.random() * (canvas.width - 50) + 25;
                let y = Math.random() * (canvas.height - 50) + 25;
                let radius = Math.random() * 10 + 15;
                trash.push(new sprites.Trash(document.getElementById("trash"), x, y, radius, radius))
            }
        }
        if (runTime % 600 == 0) {
            speed ++;
            delay = Math.floor(delay * 0.9 + 1);
        }

        //Player controls
        if (wPressed || sPressed) {
            if (wPressed) {
                if (!player.isColliding(canvas, 0, -speed))
                    player.setVY(-speed);
                else
                    player.setVY(0);
            }
            if (sPressed) {
                if (!player.isColliding(canvas, 0, speed))
                    player.setVY(speed);
                else
                    player.setVY(0);
            }
        } else
            player.setVY(player.getVY() * 0.5);
        if (aPressed || dPressed) {
            if (aPressed) {
                if (!player.isColliding(canvas, -speed, 0))
                    player.setVX(-speed);
                else
                    player.setVX(0);
            }
            if (dPressed) {
                if (!player.isColliding(canvas, speed, 0))
                    player.setVX(speed);
                else
                    player.setVX(0)
            }
        } else
            player.setVX(player.getVX() * 0.5);

        ctx.fillStyle = 'white'
        ctx.textAlign = "left"
        ctx.fillText("Garbage Count: " + trash.length, 50, 50)
        ctx.fillText("Picked Up: " + pickedUp, 50, 75)
        let minutes = Math.floor(runTime / 3600);
        let seconds = Math.floor(runTime / 60) - minutes*60;
        ctx.fillText("Time elapsed: " + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds), 50, 100)
    }
    
    ctx.closePath();
}
setInterval(draw, 1/60 * 1000);

canvas.addEventListener('click', function(event) {
    if (document.querySelector('#game').classList.contains('active')) {
        if (panel == 0) {
            buttons0.forEach(button => {
                button.click(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
            })
        }
    }
}, false)
document.addEventListener('keydown', function(event) {
    if (document.querySelector('#game').classList.contains('active')) {
        if (panel == 1) {
            if (event.key == "w")
                wPressed = true;
            if (event.key == "a")
                aPressed = true;
            if (event.key == "s")
                sPressed = true;
            if (event.key == "d")
                dPressed = true;
        }
    }
})
document.addEventListener('keyup', function(event) {
    if (document.querySelector('#game').classList.contains('active')) {
        if (panel == 1) {
            if (event.key == "w")
                wPressed = false;
            if (event.key == "a")
                aPressed = false;
            if (event.key == "s")
                sPressed = false;
            if (event.key == "d")
                dPressed = false;
        }
    }
})