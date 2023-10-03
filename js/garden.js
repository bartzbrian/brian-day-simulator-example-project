let flowers = []; //flower array
let flowerCount = 0; // Counter for overgrown plants
let bg; // background image
let imgs = []; //array of plant images
let cursor; //cursor image

function setup() {
  //load the background image
  bg = loadImage("./assets/bg.png");

  //load the cursor image
  cursor = loadImage("./assets/shears.png");

  //load the images into the 2D array
  imgs[0] = loadImage("./assets/flower1.png");
  imgs[1] = loadImage("./assets/flower2.png");
  imgs[2] = loadImage("./assets/flower3.png");

  createCanvas(850, 550);

  for (let i = 0; i < 30; i++) {
    //loops thirty times, each time adding a new instance of the
    //flower class to the flower array

    flowers.push(
      new flower(
        random(10, width - 200),
        random(30, height - 100),
        int(random(0, 3))
      )
    );

    //each loop, it creates a new instance of the flower class,
    //and gives them a random location set in from the edge
  }

  fill(0).strokeWeight(10).textSize(20);
  fontRegular = loadFont("./assets/unibody8.ttf");
  textFont(fontRegular);
  background(bg);
}

function draw() {
  background(bg); //draw background
  noCursor(); //remove the default cursor

  //draw the custom cursor at the mouse position
  image(cursor, mouseX - 32, mouseY - 32, 75, 75);

  flowerCount = 0; // Reset the counter on each frame

  //counts how many flowers are not yet picked
  for (let flower of flowers) {
    flower.display();
    if (flower.isNotPicked) {
      flowerCount++; // Increment the overgrown count if the plant is overgrown
    }
  }

  // Displays the amount of flowers remaining
  drawCounter();

  // Check if all plants are under control
  if (flowerCount === 0) {
    clearCanvas();
    textAlign(CENTER, CENTER);
    textSize(32);
    text("The garden is under control", width / 2, height / 2);
    fill(255);
  }
}

// this function checks if the cursor is hovering over a flower when
// the mouse is clicked. If it is, it sets the flower its over to be picked
// and decreases the count of how many flowers are left

function mouseClicked() {
  //loop through all the flowers to check if mouse is over them
  for (let flower of flowers) {
    //if the mouse is over a plant
    if (flower.isOver(mouseX, mouseY)) {
      // and if the flower is not picked
      if (flower.isNotPicked) {
        flower.isNotPicked = false; //set flower isNotPicked value to false (i.e it has been picked)
        flowerCount--; // Decrease the count of remaining flowers
      }
    }
  }
}

// Draw counter
function drawCounter() {
  textSize(20);
  textAlign(LEFT, TOP);
  fill(200, 200, 200, 175);
  rect(20, 10, 250, 35, 25, 25, 25, 25);
  fill(255);
  text(`flowers left: ${flowerCount}`, 30, 10);
}

// Clear the canvas
function clearCanvas() {
  background(0, 150, 50);
}

// Creates a class called "plant" which has four properties, x & y loccation, if it's overgrown, and its image source which gets randomized
class flower {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.randomVal = r;
    this.isNotPicked = true;
    this.img = imgs[this.randomVal];
  }

  // flower also has a display function,
  // which displays the flower normally if it isn't picked
  // but if it is picked, it makes it transparent so it doesn't appear
  display() {
    if (this.isNotPicked) {
      this.img = imgs[this.randomVal];
      noStroke();
      // tint(0, 255);
      image(this.img, this.x, this.y, 80, 80);
    }
  }

  // lastly, flower has a function which returns true if the mouse is hovering over the plant's image, and false if it is not
  isOver(mx, my) {
    return mx > this.x && mx < this.x + 80 && my > this.y && my < this.y + 80;
  }
}
