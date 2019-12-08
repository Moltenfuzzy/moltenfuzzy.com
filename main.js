  /*
  Assignment: Final Project
  Student: Kent Phan
  Pasadena City College, Fall 2019
  Prof. Masood Kamandy
  Project Description: Tree Themed Maze with goals
  Last Modified: Month Day, Year
  */

class Wall 
{
	constructor(x, y, width, height) {
		this.x = x; 
		this.y = y; 
		this.width = width;
		this.height = height; 
	}

	intersect(player) { 	
		let wall_x = this.x; 
		let wall_y = this.y;
	
		let x_pos_width = this.x + this.width;
		let y_pos_height = this.y + this.height; 
		if ((player.x < x_pos_width) && (player.x > wall_x) && (player.y < y_pos_height) && (player.y > wall_y))
		{
			player.x = 404;
			player.y = 788;
			print("IN WALL");
		}
	}

	display() {
		push(); 
		fill(34,139,34); // forest green
		strokeWeight(0);
		rect(this.x, this.y, this.width, this.height); 
		pop();
	}
}

class Player {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	// refreshing current position when drawn
	display(x, y) {
		this.x = x; 
		this.y = y; 
		ellipse(this.x, this.y, 20, 20);
	}
};

class Apple {
	constructor(img, x, y) {
		this.img = img;
		this.x = x;
		this.y = y;
		this.width = 100; 
		this.height = 100; 
		this.visited = false; 
	}

	intersect(player) { 	
		let wall_x = this.x; 
		let wall_y = this.y;
	
		let x_pos_width = this.x + this.width;
		let y_pos_height = this.y + this.height; 
		if ((player.x < x_pos_width) && (player.x > wall_x) && (player.y < y_pos_height) && (player.y > wall_y))
		{
			this.visited = true; 
			apple_count++; 
			print("IN APPLE");
		}
	}

	display() {
		image(this.img, this.x, this.y);
	}
};

class Tree {
	constructor(img, x, y) {
		this.img = img;
		this.x = x;
		this.y = y;
		this.width = 100; 
		this.height = 100; 
	}
	
	intersect(player) { 	
		let wall_x = this.x; 
		let wall_y = this.y;
	
		let x_pos_width = this.x + this.width;
		let y_pos_height = this.y + this.height; 
		if ((player.x < x_pos_width) && (player.x > wall_x) && (player.y < y_pos_height) && (player.y > wall_y))
		{
			player.x = 404;
			player.y = 788;
			print("IN TREE");
		}
	}

	display() {
		image(this.img, this.x, this.y);
	}
};

let walls = []; 
let apples = []; 

let apple_tree; 
let player; 
let forest; 
let apple_count; 

function preload()
{
	apple_img = loadImage("apple.png");
	tree_img = loadImage("fall_tree.png"); 
	forest = loadImage("forest.jpg");
}

function setup() 
{
	createCanvas(800, 800); 

	apple_tree = new Tree(tree_img, 365, -30); 

	apples.push(new Apple(apple_img, 450, 660));
	apples.push(new Apple(apple_img, 0, 450));
	apples.push(new Apple(apple_img, 670, -10));
	apples.push(new Apple(apple_img, 220, 100));

	walls.push(new Wall(width-20, 0, 20, height));
	walls.push(new Wall(0, 0, 360, 20)); 
	walls.push(new Wall(0, 0, 20, height)); 
	walls.push(new Wall(440, 0, 400, 20)); 
	walls.push(new Wall(440, 0, 20, 130));
	walls.push(new Wall(220, 110, 240, 20)); 
	walls.push(new Wall(110, 110, 20, 245)); 
	walls.push(new Wall(110, 335, 243, 20)); 
	walls.push(new Wall(333, 335, 20, 130));
	walls.push(new Wall(0, 447, 130, 20)); 
	walls.push(new Wall(110, 447, 20, 250)); //
	walls.push(new Wall(0, height-20, 360, 20)); 
	walls.push(new Wall(448, height-20, 360, 20)); 
	walls.push(new Wall(222, 449, 20, height)); 
	walls.push(new Wall(222, 445, 120, 20)); //
	walls.push(new Wall(220, 222, 134, 20)); 
	walls.push(new Wall(334, 120, 20, 120)); //
	walls.push(new Wall(446, 221, 20, 357)); 
	walls.push(new Wall(446, 675, 20, 130)); 
	walls.push(new Wall(558, 110, 20, 130)); 
	walls.push(new Wall(558, 445, 20, 230)); 
	walls.push(new Wall(334, 558, 20, 133)); 
	walls.push(new Wall(670, 110, 200, 20)); 
	walls.push(new Wall(450, 221, 240, 20)); 
	walls.push(new Wall(560, 335, 230, 20)); 
	walls.push(new Wall(560, 445, 130, 20)); 
	walls.push(new Wall(670, 558, 200, 20)); 
	walls.push(new Wall(350, 558, 100, 20)); 
	walls.push(new Wall(350, 670, 340, 20)); 

	player = new Player(404, 788); 	
}

function draw() {
	background(forest);

	PlayerMove();

	apple_tree.intersect(player); 
	apple_tree.display(); 

	for(let i = 0; i < walls.length; i++)
	{
		walls[i].intersect(player); 
		walls[i].display();
	}

	for(let i = 0; i < apples.length; i++)
	{
		apples[i].intersect(player);
		apples[i].display(); 
	}

	player.display(player.x, player.y); 
}

function PlayerMove() {
	if (keyIsDown(UP_ARROW)) {
		player.y -= 3;
	}
	if (keyIsDown(DOWN_ARROW)) {
		player.y += 3;
	}
	if (keyIsDown(LEFT_ARROW)) {
		player.x -= 3;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		player.x += 3;
	}
}

