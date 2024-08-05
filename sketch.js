// Initial Score (Global Variable)
let score = 0;


// player position
let myXPos = 30;
let myYPos = 525;

// coin position
let coinX = 110;
let coinY;

// car position
let carX = 220;
let carY;

// Watermelon position
let watermelonX = 330;
let watermelonY;

// ball position
let ballX = 440;
let ballY;

// pants position
let pantsX = 550;
let pantsY = 0;

// rainbow position
let rainbowX = 300
let rainbowY = 335;

// SpaceBar (Color Switch)
let spaceNum = 0;

// Detects collision just incase the player doesn't press spacebar to switch color
let red = 204;
let green = 204;
let blue = 255; 

// gravity variables
let myYVel = 0;
let jump = false;
let gravity = 0.5;
let jumpPwr = 10;

// Global variables for objects
let coinImage;
let carImage;
let watermelonImage;
let ballImage;
let pantsImage;
let backNum = 1;

// Global variables for detecting collisions
let myLeft, myRight, myTop, myBottom;
let coinLeft, coinRight, coinBottom, coinTop;
let carLeft, carRight, carBottom, carTop;
let watermelonLeft, watermelonRight, watermelonBottom, watermelonTop;
let ballLeft, ballRight, ballBottom, ballTop;
let pantsLeft, pantsRight, pantsBottom, pantsTop;

// Global variables for sound effects
let coinSound;
let carSound;
let watermelonSound;
let ballSound;
let pantsSound;
let backgroundMusic;

// Global Variable for background image
let rainbowImage;

// background image and boolean
////
let bgImage;
////
let gameRunning = true;
let gameOver = false;




function preload() {
    coinImage = loadImage("images/coin.png");
    carImage = loadImage("images/car.png");
    watermelonImage = loadImage("images/watermelon.png");
    ballImage = loadImage("images/ball.png");
    pantsImage = loadImage("images/pants.png");

    coinSound = loadSound("sounds/coinsound.mp3");
    carSound = loadSound("sounds/damsound.mp3");
    watermelonSound = loadSound("sounds/damsound.mp3");
    ballSound = loadSound("sounds/damsound.mp3");
    pantsSound = loadSound("sounds/damsound.mp3");

    backgroundMusic = loadSound("sounds/backgroundmusic.mp3");

    // Decorations Setup
    rainbowImage = loadImage("images/rainbow.png");
}


function setup() {
    createCanvas(600, 600);
    background(135, 206, 235);
    noStroke();

    // CENTER'S the image and rectangle position. 
    imageMode(CENTER);
    rectMode(CENTER);
    
    coinY = random(-600, -50);
    ballY = random(-600, -50);
    pantsY = random(-600, -50);
    carY = random(-600, -50);
    watermelonY = random(-600, -50);
    // playing the background music for as long as the game goes on
    backgroundMusic.loop();
    userStartAudio();
    if (!backgroundMusic.isPlaying()) {
        backgroundMusic.loop();
    }

}
///

function draw() {
    background(135, 206, 235);

    image(rainbowImage, rainbowX, rainbowY, 800, 800);

    // Score Calculator 
    fill(255);
    textSize(40);
    text("Score: " + score, 20, 50);

    // Position of the squares and colors
    fill(204, 204, 255);
    rect(150, 575, 300, 50);
    fill(255, 255, 204);
    rect(450, 575, 300, 50);
    fill(red, green, blue);
    rect(myXPos, myYPos, 50, 50);

    if (myXPos > 25 && myXPos < 575) {
        
        // Arrow keys to manipulate the player movement
        if (keyIsDown(LEFT_ARROW) && myXPos > 25) {
            myXPos -= 3;
        }
        if (keyIsDown(RIGHT_ARROW) && myXPos < 575) {
            myXPos += 3;
        }
        // Gravity that allows the player to go back down after a jump
        if (keyIsDown(UP_ARROW) && !jump) {
            myYVel = -jumpPwr;
            jump = true;
        }

        // Collision check for if the ground color matches the player color
        if (myXPos < 300 && red == 255 && green == 255 && blue == 204 && myYPos == 525) {
            myXPos = 30; 
            red = 204;
            green = 204;
            blue = 255; ;
        }
        
        if (myXPos > 300 && red == 204 && green == 204 && blue == 255 && myYPos == 525) {
            myXPos = 30; 
            red = 204;
            green = 204;
            blue = 255; 
        }

        // Jumping up feature (UP ARROW)
        myYPos += myYVel;
        myYVel += gravity;
        
        if (myYPos > 525) {
            myYPos = 525;
            myYVel = 0;
            jump = false;
        }

        // Ensures that player doesn't move out of the canvas
        if (myXPos <= 25) {
            myXPos += 3;
        }

        if (myXPos >= 575) {
            myXPos -= 3;
        }
    }

   // Car falling down
   fill(225)
   image(carImage, carX, carY, 80, 80);
   carY += 3;

   if (carY > 625) {
    carY = random(-600, -50);
    carX = random(25,575);
   }

   // Coin falling down
   image(coinImage, coinX, coinY, 80, 80);
   coinY += 3;

   if (coinY > 625) {
    coinY = random(-600, -50);
    coinX = random(25,575);
   }
   
   // Ball falling down
   image(ballImage, ballX, ballY, 80, 80);
   ballY += 3;

   if (ballY > 625) {
    ballY = random(-600, -50);
    ballX = random(25,575);
   }

   // Watermelon falling down
   image(watermelonImage, watermelonX, watermelonY, 80, 80);
   watermelonY += 3;
   
   if (watermelonY > 625) {
    watermelonY = random(-600, -50);
    watermelonX = random(25,575);
   }

   // Pants falling down
   image(pantsImage, pantsX, pantsY, 80, 80);
   pantsY += 3;

   if (pantsY > 625) {
    pantsY = random(-600, -50);
    pantsX = random(25,575);
   }

   // Detecting COLLISIONS

    /*This calculates the left edge of the player's box. The player's position (myXpos) is the center of the player. Since the player has a width of 50 pixels, 
    half of this width (25 pixels) is subtracted from the center position to get the left edge. The same theory applies for the other edges.*/
    myLeft = myXPos - 25;
    myRight = myXPos + 25;
    myTop = myYPos - 25;
    myBottom = myYPos + 25;

    coinLeft = coinX - 40;
    coinRight = coinX + 40;
    coinTop = coinY - 40;
    coinBottom = coinY + 40;

    carLeft = carX - 40;
    carRight = carX + 40;
    carTop = carY - 40;
    carBottom = carY + 40;

    ballLeft = ballX - 40;
    ballRight = ballX + 40;
    ballTop = ballY - 40;
    ballBottom = ballY + 40;

    pantsLeft = pantsX - 40;
    pantsRight = pantsX + 40;
    pantsTop = pantsY - 40;
    pantsBottom = pantsY + 40;

    watermelonLeft = watermelonX - 40;
    watermelonRight = watermelonX + 40;
    watermelonTop = watermelonY - 40;
    watermelonBottom = watermelonY + 40;
    
    
    // Checks NO COLLISION between coin and player
    if (myLeft > coinRight || myRight < coinLeft || myTop > coinBottom || myBottom < coinTop) {
        
    }
    // Checks COLLISION between coin and player
    else {
    background(0);
        score ++;
        coinX = random(0, 600); 
        coinY = random(-600, -50);
        coinSound.play();

   } 
   // Checks NO COLLISION between car and player
   if (myLeft > carRight || myRight < carLeft || myTop > carBottom || myBottom < carTop) {
        
   }
   // Checks COLLISION between car and player
   else {
   background(0);
       score --;
       carY = random(-600, -50);
       carX = random(0, 600); 
       carSound.play();

  } 

  // Checks NO COLLISION between basketball and player
  if (myLeft > ballRight || myRight < ballLeft || myTop > ballBottom || myBottom < ballTop) {
        
  }
  // Checks COLLISION between basketball and player
  else {
  background(0);
      score --;
      ballX = random(0, 600);
      ballY = random(-600, -50); 
      ballSound.play();

 } 

 // Checks NO COLLISION between basketball and player
 if (myLeft > pantsRight || myRight < pantsLeft || myTop > pantsBottom || myBottom < pantsTop) {
        
 }
 // Checks COLLISION between basketball and player
 else {
 background(0);
     score --;
     pantsX = random(0, 600); 
     pantsY = random(-600, -50);
     pantsSound.play();

} 

if (myLeft > watermelonRight || myRight < watermelonLeft || myTop > watermelonBottom || myBottom < watermelonTop) {
        
}
// Checks COLLISION between watermelon and player
 else {
 background(0);
     score --;
     watermelonX = random(0, 600); 
     watermelonY = random(-600, -50);
     watermelonSound.play();
    }
}

function keyPressed() {
    if (keyIsDown(32) && spaceNum == 0) {
        red = 255;
        green = 255;
        blue = 204;
        spaceNum = 1;
    } 
    else if (keyIsDown(32) && spaceNum == 1) {
        red = 204;
        green = 204;
        blue = 255;;
        spaceNum = 0;
    }
}

/*if(score == 2) {
    gameRunning==false;
}
if(gameRunning==false) {
    fill(0);
    rect(300, 300, 600, 600);
        textSize(50);
        fill(255);
        textAlign(CENTER, CENTER);
        text("Game Over", width / 2, height / 2);
        
}
*/

// Checks that the images don't overlap each other
function overlap(x1, y1, x2, y2) {
    return dist(x1, y1, x2, y2) < 80;
}


