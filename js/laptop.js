let bigRectDimensions = { x: 445, y: 220, width: 360, height: 240 };
let slideshowImages = [];
let readyForClass = false;
let imgs = [];

function setup() {
  createCanvas(900, 600);
  rectMode(CENTER);
  imageMode(CENTER);

  fill(0).strokeWeight(10).textSize(30);
  fontRegular = loadFont("./assets/unibody8.ttf");
  textFont(fontRegular);

  bg = loadImage("./assets/laptop.jpg");

  imgs[0] = loadImage("./assets/class1.png");
  imgs[1] = loadImage("./assets/class2.png");
  imgs[2] = loadImage("./assets/class3.png");
  imgs[3] = loadImage("./assets/class4.png");
  imgs[4] = loadImage("./assets/class5.png");
  imgs[5] = loadImage("./assets/class6.png");

  // Create 6 slideshow Images around the perimeter
  for (let i = 0; i < 6; i++) {
    slideshowImages.push(new slideshowImage(i));
  }
}

function draw() {
  noStroke();
  imageMode(CORNER);
  background(bg);

  imageMode(CENTER);
  // Draw the big rectangle
  rect(
    bigRectDimensions.x,
    bigRectDimensions.y,
    bigRectDimensions.width,
    bigRectDimensions.height
  );

  // Check if all slideshow Images are inside the big rectangle
  let allInside = true;
  // go through all the slideshow Images with a for loop
  for (let i = 0; i < slideshowImages.length; i++) {
    // if the current slideshow Image is NOT inside the big rectangle
    if (!slideshowImages[i].inside(bigRectDimensions)) {
      // set the allInside variable to false because at least one slideshow Image is not in the rectangle
      allInside = false;
    }
  }

  // Display "You are ready for class" text if all slideshow Images are inside of big one
  if (allInside) {
    background(25, 150, 60, 200);
    textAlign(CENTER, CENTER);
    fill(255);
    text("You are ready for class!!!", width / 2, 450);
  }

  // Draw and update slideshow Images
  for (let i = 0; i < slideshowImages.length; i++) {
    slideshowImages[i].display();
    slideshowImages[i].update();
  }
}

function mousePressed() {
  // Check if the mouse is pressed inside any slideshow Image
  for (let i = 0; i < slideshowImages.length; i++) {
    let r = slideshowImages[i];
    if (r.contains(mouseX, mouseY)) {
      r.dragging = true;
      r.offsetX = mouseX - r.x;
      r.offsetY = mouseY - r.y;
    }
  }
}

function mouseReleased() {
  // Release the dragged slideshow Image
  for (let i = 0; i < slideshowImages.length; i++) {
    slideshowImages[i].dragging = false;
  }
}

//defines a class called slideshowImage, which manages the 6 images
class slideshowImage {
  constructor(x) {
    this.x = random(width - 50);
    this.y = random(height - 50);
    this.width = 150;
    this.height = 150;
    this.dragging = false;
    this.img = imgs[x];
  }

  display() {
    fill(100, 100, 100, 100);
    image(this.img, this.x, this.y, this.width, this.height);
  }

  contains(px, py) {
    return (
      px > this.x - this.width / 2 &&
      px < this.x + this.width / 2 &&
      py > this.y - this.height / 2 &&
      py < this.y + this.height / 2
    );
  }

  //this function updates the position if the rectangle is being dragged
  update() {
    if (this.dragging) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  //this function returns true if the slideshow Image is inside the big one
  inside(bigRect) {
    //the if statement checks if all 4 sides of the slideshow Image
    //are contained within the 4 sides of the big rectangle

    if (
      this.x - this.width / 2 > bigRect.x - bigRect.width / 2 &&
      this.x + this.width / 2 < bigRect.x + bigRect.width / 2 &&
      this.y - this.height / 2 > bigRect.y - bigRect.height / 2 &&
      this.y + this.height / 2 < bigRect.y + bigRect.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
