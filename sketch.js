let pong;
let paddle1; 
let brick_array = []; 


class brick {
  constructor(X, Y, width, height) {
    this.X = X;
    this.Y = Y; 
    this.width = width;
    this.height = height; 
    this.hit = false; 
    this.R = random(255); 
    this.G = random(255); 
    this.B = random(255);
  }

  draw() {
    push();
    fill(this.R, this.G, this.B);
    rect(this.X, this.Y, this.width, this.height);
    pop();
  }

}

function setup() {
  createCanvas(600, 600);
  pong = new ball(width/2, height/2, width, height, 7);
  paddle1 = new paddle(mouseX, height - 50,  100, 20, width, height, 15);  

  for(let i = 0; i < width; i += width/10) {
    for(let j = 0; j < height/4; j += 30) {
      brick_array.push(new brick(i, j, 60, 30));
    }
  } 
}

function draw() {
  background(0);

  for(let i = 0; i < brick_array.length; i++)
    brick_array[i].draw();

  pong.draw(); 
  paddle1.draw(mouseX); 

  hitPaddle(paddle1.X, paddle1.Y, paddle1.width, paddle1.height, pong.X, pong.Y, pong.size/2);
}

function hitPaddle(paddleX, paddleY, paddleWidth, paddleHeight, ballX, ballY, ballRadius) {

  // if inside the area the left paddle, it will reflect. 
  if((ballX > paddleX - (paddleWidth/2)) && (ballX < paddleX + (paddleWidth/2))) {
    // debugger;
    if((ballY > paddleY - paddleHeight) && (ballY < paddleY + paddleHeight)) {
      // if hit left side of the paddle, reflect towards the left
      // if hit right side of the paddle, reflect towards the left
      pong.xdir *= -1;
      pong.ydir *= -1;
    }
  }
}
