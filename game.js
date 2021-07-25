class Button {
    #image;
    #text;
    #x;
    #y;
    #width;
    #height;
    #callback;
    constructor(image, text, x, y, width, height, callback) {
        this.#image = image;
        this.#text = text;
        this.#x = x;
        this.#y = y;
        this.#height = height
        this.#width = width;
        this.#callback = callback
    }
    draw(canvas) {
        canvas.textAlign = "center"
        canvas.fillText(this.#text, this.#x + this.#width / 2, this.#y + this.#height / 2, this.#width)
        canvas.drawImage(this.#image, this.#x, this.#y, this.#width, this.#height)
    }
    click(mouseX, mouseY) {
        if (this.#x <= mouseX && mouseX <= this.#x + this.#width && this.#y <= mouseY && mouseY <= this.#y + this.#height) {
            this.#callback()
        }
    }
}
class Player {
    #x
    #y
    #vX
    #vY
    #width
    #height
    #image
    constructor(image, x, y, width, height) {
        this.#x = x;
        this.#y = y;
        this.#vX = 0;
        this.#vY = 0;
        this.#width = width;
        this.#height = height;
        this.#image = image;
    }
    getX() {
        return this.#x;
    }
    setX(x) {
        this.#x = x;
    }
    getY() {
        return this.#y;
    }
    setY(y) {
        this.#y = y;
    }
    getVX() {
        return this.#vX;
    }
    getVY() {
        return this.#vY;
    }
    setVX(vX) {
        this.#vX = vX;
    }
    setVY(vY) {
        this.#vY = vY;
    }
    draw(canvas) {
        this.#x += this.#vX;
        this.#y += this.#vY;
        canvas.drawImage(this.#image, this.#x, this.#y, this.#width, this.#height);
    }
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var panel = 0; // 0 = Main menu, 1 = in game, 2 = game over screen
var aPressed = false;
var dPressed = false;
var wPressed = false;
var sPressed = false;

var buttons0 = []
buttons0.push(new Button(document.getElementById("button"), "Play", canvas.width / 2 - 50, canvas.height / 2 - 100, 100, 50, function() {
    panel = 1
}))
var player = new Player(document.getElementById("player"), canvas.width/2, canvas.height/2, 50, 50)

function draw() {
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
        player.draw(ctx)
        if (wPressed || sPressed) {
            if (wPressed)
                player.setVY(-5);
            if (sPressed)
            player.setVY(5);
        } else
            player.setVY(player.getVY() * 0.5);
        if (aPressed || dPressed) {
            if (aPressed)
                player.setVX(-5);
            if (dPressed)
                player.setVX(5);
        } else
            player.setVX(player.getVX() * 0.5);

    }
    ctx.closePath();
}
setInterval(draw, 10);

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