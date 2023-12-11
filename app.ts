class Circle {
    x: number; // position
    y: number; // vertical position
    radius: number; // balls size
    dy: number; // vertical velocity
    color: string; // property to store the ball's color

    
    constructor(x: number, y: number, radius: number, dy: number, color:string) {
      this.x = x; 
      this.y = y;
      this.radius = radius;
      this.dy = dy;
      this.color = color; 

    }
    
  
    draw(context: CanvasRenderingContext2D) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);    
      context.fillStyle=this.color
      context.fill();
      context.closePath();
    }
  //  movement and bouncing logic
    update(canvas: HTMLCanvasElement,  deltaTime: number) {
      const gravity = 0.1; // Earth-like gravity
      const friction = 0.99; // Dampening effect
    
      this.dy += gravity * deltaTime;
    this.y += this.dy * deltaTime; // Update the position of the circle based on its velocity
    
      if (this.y + this.radius > canvas.height) {
        this.y = canvas.height - this.radius; // Keep the circle within the canvas height
        this.dy *= -friction; // Reverse direction and dampen the velocity on bounce
      }
    }
    
  }
  
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const circles: Circle[] = [];
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  canvas.addEventListener('click', (event) => {
    if (circles.length < 15) {

    const x = event.clientX;
    const y = event.clientY;
    const radius = Math.floor((Math.random() * 40) + 10);
    const dy = 0; 
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
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
  let lastTime = performance.now();

function tick(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  context.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle) => {
    circle.update(canvas, deltaTime);
    circle.draw(context);
  });

  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
