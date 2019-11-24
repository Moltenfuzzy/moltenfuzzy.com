/*
Assignment: 6.6 Team Workshop: The Elements of Pong
Student: Kent Phan
Group: 2
Pasadena City College, Fall 2019
Prof. Masood Kamandy
Project Description: ball object for pong
Last Modified: 11/15/2019
*/

/**
 This creates a ball object with its own X and Y 
*/

class ball {
  constructor(X = 0, Y = 0, canvas_width, canvas_height, speed = 3) {
    this.size = 20;
    this.width = canvas_width;
    this.height = canvas_height;
    this.speed = speed;
    this.X = X + this.size; // to prevent being less than the size at start
    this.Y = Y + this.size;

    // only picking random values from the right side of the unit circle
    let angle = random(QUARTER_PI * 2);

    // ensures it moves at a random angle & AT THE SAME SPEED each run
    this.xdir = cos(angle); //refer to unit circle cos(pi/2)
    this.ydir = sin(angle); //refer to unit circle sin(pi/2)
  }

  bounced(x_or_y) {
    if (x_or_y === 'x') {
      // checking if X is greater than the width of the canvas not including half of its size
      // and checking if its less than the origin(0,0) + half its size
      if (this.X > (this.width - this.size / 2) || this.X < (this.size / 2)) {
        return true;
      }
    } else {
      if (this.Y > (this.height - this.size / 2) || this.Y < (this.size / 2)) {
        return true;
      }
    }
  } 

  draw() {
    //incrementing x position & y position
    this.X += this.xdir * this.speed;
    this.Y += this.ydir * this.speed;

    // checking if it has bounced in the x axis
    if (this.bounced('x')) {
      // reflecting the direction by making it negative, then it will be X += -number
      //debugger; checking if it was hitting the edges
      this.xdir *= -1;
    }

    if (this.bounced('y')) {
      // reflecting the direction by making it negative, then it will be Y += -number
      //debugger;
      this.ydir *= -1;
    }

    ellipse(this.X, this.Y, this.size);
  }
}
