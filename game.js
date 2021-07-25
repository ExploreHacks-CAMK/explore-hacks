class Button {
    #image;
    #x;
    #y;
    #width;
    #height;
    #callback;
    constructor(image, x, y, width, height, callback) {
        this.#image = image;
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#callback = callback
    }
    draw(canvas) {
        canvas.drawImage(this.#image, this.#x, this.#y, this.#width, this.#height)
    }
    click(mouseX, mouseY) {
        if (this.#x <= mouseX && mouseX <= this.#x + this.#width && this.#y <= mouseY && mouseY <= this.#y + this.#height) {
            callback()
        }
    }

}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var buttons = []
buttons.push(new Button(document.getElementById("button"), canvas.width / 2 - 50, canvas.height / 2 - 25, 100, 50, function() {

}))

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.drawImage(document.getElementById("background"), 0, 0, canvas.width, canvas.height)
    // buttons.forEach(button => {
    //     button.draw(ctx);
    // })
    ctx.closePath();
}
setInterval(draw, 50);

canvas.addEventListener('click', function(event) {
    
}, false)

