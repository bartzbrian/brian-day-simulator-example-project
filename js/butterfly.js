//example of interactive sound

var butterflyX, butterflyY;
var sparkleSound, butterflyImage;

function preload() {
  //load your sound into a variable in the exact same way that you load an image, except using "loadSound" instead of "loadImage"

  sparkleSound = loadSound("media/sparkle.wav");
  butterflyImage = loadImage("media/butterfly.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  colorMode(HSB);
  butterflyX = -100;
  butterflyY = -100;
}

function draw() {
  background(200, 40, 100);
  image(butterflyImage, butterflyX, butterflyY, 100, 100);
}

function mousePressed() {
  //you can then use the play() method in your code wherever you want a sound to get triggered. For example here it is when the mouse is pressed, but you can imagine how you might have sounds that get triggered wherever you want in your code (when you win/lose, get a point, etc.)

  sparkleSound.play();
  butterflyX = mouseX;
  butterflyY = mouseY;
}
