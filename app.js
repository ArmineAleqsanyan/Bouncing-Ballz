"use strict";
var Circle = /** @class */ (function () {
    function Circle(x, y, radius, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dy = dy;
        this.color = color;
    }
    Circle.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    };
    //  movement and bouncing logic
    Circle.prototype.update = function (canvas, deltaTime) {
        var gravity = 0.1; // Earth-like gravity
        var friction = 0.99; // Dampening effect
        this.dy += gravity * deltaTime;
        this.y += this.dy * deltaTime; // Update the position of the circle based on its velocity
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius; // Keep the circle within the canvas height
            this.dy *= -friction; // Reverse direction and dampen the velocity on bounce
        }
    };
    return Circle;
}());
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var circles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.addEventListener('click', function (event) {
    if (circles.length < 15) {
        var x = event.clientX;
        var y = event.clientY;
        var radius = Math.floor((Math.random() * 40) + 10);
        var dy = 0;
        var randomColor = "rgb(".concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ")");
        circles.push(new Circle(x, y, radius, dy, randomColor));
    }
});
// function animate() {
//   requestAnimationFrame(animate); // create a continuous loop for animation.
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   circles.forEach((circle) => {
//     circle.draw(context);
//     circle.update(canvas);
//   });
// }
// animate();
var lastTime = performance.now();
function tick(currentTime) {
    var deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(function (circle) {
        circle.update(canvas, deltaTime);
        circle.draw(context);
    });
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
