var playerX, playerY;
var playerSize = 30;
var truckX, truckY;
var truckSize = 20;
var showText = false;

function setup() {
  createCanvas(1000, 600);
  bg = loadImage("./assets/map.png");
  player = loadImage("./assets/player.png");

  fontRegular = loadFont("./assets/unibody8.ttf");
  textFont(fontRegular);

  playerX = 972;
  playerY = 438;

  truckX = 96; // Adjust the position of the blue square
  truckY = 75; // Adjust the position of the blue square
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(bg);
  noStroke();

  // Calculate the distance between the green and blue squares
  let distance = dist(
    playerX,
    playerY,
    truckX + truckSize / 2,
    truckY + truckSize / 2
  );

  // Show the blue square
  fill(0, 0, 0, 0);
  rect(truckX, truckY, truckSize, truckSize);

  // Show the player
  displayPlayer();

  // Check if the green square is close to the blue square
  if (distance < 50) {
    showText = true;
  } else {
    showText = false;
  }

  // Display the "howdy partner" text if needed
  if (showText) {
    fill(0, 150);
    rect(0, 0, 1000, 600);
    fill(255);
    text("You Found Me!!!\nLet's go Home!", 250, 75);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    playerY -= 10;
  } else if (keyCode === DOWN_ARROW) {
    playerY += 10;
  } else if (keyCode === LEFT_ARROW) {
    playerX -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    playerX += 10;
  }
}

function displayPlayer() {
  fill(0, 255, 0);
  image(player, playerX, playerY, playerSize, playerSize);
}
