/*
Assignment: Final Project
Student: Kent Phan
Pasadena City College, Fall 2019
Prof. Masood Kamandy
Project Description: Tree Themed Maze 
Last Modified: December 8th, 2019

To play the game without running the code locally
https://www.moltenfuzzy.com/  
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

		// checks if player is within the area
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

		// checks if player is within the area
		if ((player.x < x_pos_width) && (player.x > wall_x) && (player.y < y_pos_height) && (player.y > wall_y))
		{
			this.visited = true; 
			print("IN APPLE");
		}
	}

	display() {
		if(!this.visited) // if not visited display the image(apple)
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
		this.visited = false; 
	}
	
	intersect(player) { 	
		let wall_x = this.x; 
		let wall_y = this.y;
	
		let x_pos_width = this.x + this.width;
		let y_pos_height = this.y + this.height; 

		if ((player.x < x_pos_width) && (player.x > wall_x) && (player.y < y_pos_height) && (player.y > wall_y))
		{
			push();
			DisplayWin();
			 // displaying win message and delaying 3 seconds until game reset after winning
			setTimeout(function() {Reset()}, 3000);
			// window.location.replace("https://teamtrees.org/") // redirecting to team trees :)
			pop();
			print("IN TREE");
		}
	}

	display() {
		image(this.img, this.x, this.y);
	}
};

let walls = []; // storing all the walls in an array
let apples = [];  // storying all the apples in an array

let apple_tree; 
let player; 
let forest; 
let apple_count = 0; 

function preload()
{
	apple_img = loadImage("images/apple.png");
	tree_img = loadImage("images/fall_tree.png"); 
	forest = loadImage("images/forest.jpg");
}

function setup() 
{
	createCanvas(800, 800); 

	// creates a new player, apples, and winning tree objects
	Reset(); 

	// Creating walls
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
}

function Reset() {
	// creating player, apples, and apple trees
	apple_tree = new Tree(tree_img, 365, -30);
	apples.push(new Apple(apple_img, 450, 660));
	apples.push(new Apple(apple_img, 0, 450));
	apples.push(new Apple(apple_img, 670, -10));
	apples.push(new Apple(apple_img, 220, 100));
	player = new Player(404, 788); 	
}

function draw() {
	background(forest);

	PlayerMove(); // WSAD or Arrow Keys
	print(apple_count); // for testing

	for(let i = 0; i < walls.length; i++)
	{
		walls[i].intersect(player); // checking if any wall has been touched by the player and executes that code
		walls[i].display(); // displays the walls(rects)
	}

	for(let i = 0; i < apples.length; i++)
	{
		apples[i].intersect(player); // checking if any apple has been touched by the player and executes that code
		apples[i].display(); // displays the apples(images of apples)
	}

	// only one apple tree object which is collected by the user to win the game
	apple_tree.intersect(player); // when touched displays win message and resets the game using Reset(); 
	apple_tree.display(); 

	player.display(player.x, player.y); // draws the player at position x and y 
}

function DisplayWin() {
	textSize(80);
	textFont('Yeon Sung');
	textAlign(CENTER);
	textStyle(BOLD);
	stroke(0);
	strokeWeight(10);
	fill(255);
	text('You Win!', width / 2, height / 2);
}

// allows for player movement WASD or ARROW KEYS
function PlayerMove() {
	const W = 87;
	const A = 65;
	const S = 83;
	const D = 68; 
	if (keyIsDown(UP_ARROW) || keyIsDown(W)) {
		player.y -= 4;
	}
	if (keyIsDown(DOWN_ARROW) || keyIsDown(S)) {
		player.y += 4;
	}
	if (keyIsDown(LEFT_ARROW) || keyIsDown(A)) {
		player.x -= 4;
	}
	if (keyIsDown(RIGHT_ARROW) || keyIsDown(D)) {
		player.x += 4;
	}
}

