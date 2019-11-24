class paddle {
  constructor(X, Y, width, height, canvasWidth, canvasHeight, speed = 15) {
    this.X = X;
    this.Y = Y;
    this.width = width;
    this.height = height;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.speed = speed;
  }
  draw(Xpos) {
    push();
    rectMode(CENTER);
    this.X = constrain(Xpos, this.width / 2, this.canvasWidth - (this.width / 2));
    rect(this.X, this.Y, this.width, this.height);
    pop();
  }
}
