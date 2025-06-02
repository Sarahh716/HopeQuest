//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let startButton, nextButton1, nextButton2, restartButton, readButton, label1, label2, label3, label4;
let mazePlayer, walls, milk, toy, obstacle;
let avoider1, avoider2, avoider3, avoider4, avoider5, avoider6, avoider7;
let avoiderPlayer;
let catcher, fallingObject;
let score = 0;
let bgImg1, bgImg2, bgImg3, bgImg4, winImg, babyImg, teenImg, adultImg, catcherImg, milkImg, toyImg, seatImg, happyBabyImg, noteImg;
let mySound, coin, win;
let babyStatic, teenStatic, adultStatic;
let fallingObjectText = ["\n Drop kids off\n for school", "\n Meeting \n with client", "\n Grocery \n shopping", "\n Teach daughter \n coding", "\n Submit quarterly \n report"];
let screen = 0;


/* PRELOAD LOADS FILES */
function preload() {
  bgImg1 = loadImage("assets/mazebg.jpg");
  bgImg2 = loadImage("assets/avoiderbg.jpg");
  bgImg3 = loadImage("assets/collectbg.jpg");
  bgImg4 = loadImage("assets/bg42.jpg");
  winImg = loadImage("assets/celeb.jpg");
  babyImg = loadImage("assets/baby1.png");
  happyBabyImg = loadImage("assets/babyhappy.png");
  teenImg = loadImage("assets/teen3.png");
  adultImg = loadImage("assets/work1.png");
  milkImg = loadImage("assets/milk.png");
  toyImg = loadImage("assets/toy.png");
  seatImg = loadImage("assets/toilet.png");
  noteImg = loadImage("assets/note.png");
  mySound = loadSound('assets/bite2.mp3');
  coin = loadSound("assets/coin.mp3");
  win = loadSound("assets/win.mp3");
  

  winSound = loadSound('assets/win.mp3');

}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);
  background(239, 231, 219);

  //Resize images
  bgImg1.resize(400,400);
  bgImg2.resize(400,400);
  bgImg3.resize(400,400);
  bgImg4.resize(400,0);
  winImg.resize(400,400);
  babyImg.resize(55,0);
  teenImg.resize(80,0);
  adultImg.resize(110,0);
  milkImg.resize(70,0);
  toyImg.resize(60,0);
  seatImg.resize(70,0);
  happyBabyImg.resize(70,0);
  noteImg.resize(80,0);
  
  homeScreen()
}

function draw() {
  if (screen == 0) {
    if (startButton.mouse.presses()) {
      screen = 1;
      mazeGameScreen();
    }
  }
  if (screen == 1) {
    background(255);
    image(bgImg1, 0, 0);
    
    // Draw start and end 
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text("Start", 330, 20);
    text("End", 22, 395);

    //Move the player
    if (kb.pressing("left")) {
      mazePlayer.vel.x = -3;
    } else if (kb.pressing("right")) {
      mazePlayer.vel.x = 3;
    } else if (kb.pressing("up")) {
      mazePlayer.vel.y = -3;
    } else if (kb.pressing("down")) {
      mazePlayer.vel.y = 3;
    } else {
      mazePlayer.vel.x = 0;
      mazePlayer.vel.y = 0;
    }

    //Move the obstacle
    if (obstacle.y > 150) {
      obstacle.vel.y = -1;
    } else if (obstacle.y < 50) {
      obstacle.vel.y = 1;
    }

    //If player touches obstacle, start again
    if (mazePlayer.collides(obstacle)) {
      mazePlayer.x = 350;
      mazePlayer.y = 50;
    }

    //If player collects water, seed grows
    if (mazePlayer.collides(toy)) {
      mySound.play();
      toy.x = -500;
      
      //seedImg.resize(60, 0);
    }

    //If player collects sun, change sprite image
    if (mazePlayer.collides(milk)) {
      mySound.play();
      milk.x = 500;
      mazePlayer.img = happyBabyImg;
      //mazePlayer.width = 50;
      //mazePlayer.height = 50;
    }

    //Cannot go above the maze
    if (mazePlayer.y < 20) {
      mazePlayer.y = 20;
    }

    // You win
    if (mazePlayer.y > 375) {
      screen = 2
      background(209, 237, 242);
      mazeWinScreen();
    }
  }

  if (screen == 2) {
    if (nextButton1.mouse.presses()) {
      screen = 3;
      avoiderGameScreen();
    }
  }

  if (screen == 3) {
    background(137, 213, 210);
    image(bgImg2, 0, 0);

    //Program the player to move
    if (kb.pressing("left")) {
      avoiderPlayer.vel.x = -3;
    } else if (kb.pressing("right")) {
      avoiderPlayer.vel.x = 3;
    } else {
      avoiderPlayer.vel.x = 0;
      avoiderPlayer.vel.y = 1;
    }

    //Don't let the player move off the screen
    if (avoiderPlayer.y < 20) {
      avoiderPlayer.y = 20;
    } else if (avoiderPlayer.y > 400) {
      win.play();
      avoiderPlayer.vel.x = 0;
      avoiderPlayer.vel.y = 0;
      screen = 4;
      background(137, 213, 210);
      image(winImg, 0, 0);
      avoiderWinScreen();
    }

    if (avoiderPlayer.x < 20) {
      avoiderPlayer.x = 20;
    } else if (avoiderPlayer.x > 380) {
      avoiderPlayer.x = 380;
    }


    //Check if player collides with avoiders
    if (avoiderPlayer.collides(avoider1) || avoiderPlayer.collides(avoider2) || avoiderPlayer.collides(avoider3) || avoiderPlayer.collides(avoider4) || avoiderPlayer.collides(avoider5) || avoiderPlayer.collides(avoider6) ||
      avoiderPlayer.collides(avoider7)) {

      avoiderPlayer.x = 200;
      avoiderPlayer.y = 20;

    }
  }

  if (screen == 4) {
    if (nextButton2.mouse.presses()) {
      screen = 5;
      collectionGameScreen();
    }
  }

  if (screen == 5) {
    background(224, 224, 224);
    image(bgImg3, 0, 0);
    if (fallingObject.y >= 400) {
      fallingObject.y = 0;
      fallingObject.x = random(15, 385);
      fallingObject.vel.y = random(1, 5);
      textSize(15);
      fallingObject.text = random(fallingObjectText);
      score = score - 1
    }
    //Move catcher
    if (kb.pressing('left')) {
      catcher.vel.x = -3;
    } else if (kb.pressing('right')) {
      catcher.vel.x = 3;
    } else {
      catcher.vel.x = 0;
    }
    //Stop catcher at edges of screen
    if (catcher.x < 50) {
      catcher.x = 50;
    } else if (catcher.x > 350) {
      catcher.x = 350;
    }

    //If fallingObject collides with catcher, move back to random position at top.
    if (fallingObject.collides(catcher)) {
      coin.play();
      fallingObject.y = 0;
      fallingObject.x = random(15, 380);
      fallingObject.vel.y = random(1, 5);
      fallingObject.direction = 'down';
      textSize(10);
      fallingObject.text = random(fallingObjectText);
      score = score + 1;
    }
    fill('purple');
    textSize(20);
    text('Score = ' + score, 10, 30);

    if (score < 0) {
      fallingObject.x = -40;
      fallingObject.y = -40;
      fill('red');
      textSize(40);
      text('You Lose!',height/2-100, width/2);
      fill('red');
      textSize(20);
      text(' Click to restart.', width/2, height/2+100);
      restart();
    }

    if (score == 5) {
      screen = 6
      
      youWin();
    }

  }

  if (screen == 6) {
    if (restartButton.mouse.presses()) {
      screen = 0;
      restartButton.pos = {x: -360, y: -100};
      readButton.pos = {x:-330, y: -200};
      homeScreen();
    } else if (readButton.mouse.presses()) {
      screen = 7;
      storyScreen();
    }
  }
  if (screen == 7) {
    if (restartButton.mouse.presses()) {
      screen = 0;
      restartButton.pos = {x: -600, y: -200};
      homeScreen();
    }
  }
  //allSprites.debug = mouse.pressing();
}

//FUNCTIONNSSSSS!
function homeScreen() {
  background(239, 231, 219);
  fill(0);
  textSize(35);
  textAlign(CENTER);
  text("HopeQuest", 200, 50);

  // Draw the directions to the screen
  fill(0);
  textSize(16);
  text("Follow the journey of life as you experience \n its different phases.\n \n For the first stage, go back to where it\n all began. Use your arrow keys to collect\n milk and toys, and dodge the potty\n trainer.", 200, 100);

  //baby 
  babyStatic = new Sprite(babyImg, 100, 300);
  
  //Startbutton
  startButton = new Sprite(200, 300, 100, 70, 'k');
  startButton.color = "pink";
  startButton.textColor = "black";
  startButton.textSize = 20;
  startButton.text = "Click to \nStart";

}

function mazeGameScreen() {
  //screen = 1
  //Draw button off of screen
  startButton.pos = { x: -500, y: -100 };
  babyStatic.pos = {x:-30, y:-30};

  //Create player
  mazePlayer = new Sprite(babyImg, 350, 50);
  mazePlayer.rotationLock = true;

  //Create obstacle
  obstacle = new Sprite(seatImg, 110, 50, "k");
  obstacle.rotationLock = true;
  obstacle.vel.y = 1;

  //Create sun
  milk = new Sprite(milkImg, 130, 300, "k");
  milk.rotationLock = true;

  //Create water
  toy = new Sprite(toyImg, 190, 50, "k");
  toy.rotationLock = true;

  //Draw the maze
  walls = new Group();
  walls.color = color(0);
  walls.collider = "s";

  new walls.Sprite(160, 10, 300, 5,);
  new walls.Sprite(10, height / 2, 5, height - 15);
  new walls.Sprite(150, 60, 5, 100);
  new walls.Sprite(width / 2 + 35, 390, 325, 5);
  new walls.Sprite(50, 300, 75, 5);
  new walls.Sprite(340, 146, 110, 5);
  new walls.Sprite(340, 250, 110, 5);
  new walls.Sprite(285, 198, 5, 109);
  new walls.Sprite(185, 332, 5, 109);
  new walls.Sprite(190, 197, 185, 5);
  new walls.Sprite(395, 200, 5, 380);
}

function mazeWinScreen() {
  //screen = 2
  background('#edf28d');

  //Draw sprites off of screen
  obstacle.pos = { x: -500, y: -500 };
  mazePlayer.pos = { x: -500, y: 380 };
  toy.pos = { x: -500, y: -120 };
  walls.x = -1000;

  //Add text to screen 3
  fill(0);;
  textSize(18);
  textAlign(CENTER);
  text("You've grown! And haven't made it any easier\n for your parents. But, those days have\n passed and now, you are a high school student.\n \n Use the arrow keys to overcome the\n struggles of a teenage girl. ", 200, 75);

  //teen
  teenStatic = new Sprite(teenImg, 100, 310);
  //nextbutton
  nextButton1 = new Sprite(200, 310, 100, 70, 'k');
  nextButton1.color = "pink";
  nextButton1.textColor = "black";
  nextButton1.textSize = 20;
  nextButton1.text = "Next Level";

}

function avoiderGameScreen() {
  //remove sprites
  nextButton1.pos = { x: -200, y: -200 };
  teenStatic.pos = {x:-30, y:-40};

  //createCanvas(400, 400);
  background(bgImg2);
  //image(bgImg2, 0, 0);

  //Create the player 
  teenImg.resize(50,0);
  avoiderPlayer = new Sprite(teenImg, 200, 20);
  avoiderPlayer.color = "black";
  avoiderPlayer.vel.y = 1;
  avoiderPlayer.rotationLock = true;

  //Create the avoiders
  avoider1 = new Sprite(65, 95, 140, 10, "k");
  avoider1.color = "green";

  avoider4 = new Sprite(310, 95, 190, 10, 'k')
  avoider4.color = "green";

  avoider2 = new Sprite(95, 185, 220, 10, "k");
  avoider2.color = "blue";

  avoider5 = new Sprite(355, 185, 150, 10, 'k')
  avoider5.color = "blue";

  avoider3 = new Sprite(120, 275, 320, 10, "k");
  avoider3.color = 'purple';

  avoider6 = new Sprite(65, 365, 130, 10, "k");
  avoider6.color = 'red';

  avoider7 = new Sprite(375, 365, 195, 10, "k");
  avoider7.color = 'red';

  //Labels
  label1 = new Sprite(50, 95, 55, 30, 'k');
  label1.color = "white";
  label1.textColor = "black";
  label1.textSize = 15;
  label1.text = "Bullying";
  
  label2 = new Sprite(50, 185, 60, 30, 'k');
  label2.color = "white";
  label2.textColor = "black";
  label2.textSize = 15;
  label2.text = "Projects";

  label3 = new Sprite(50, 275, 85, 30, 'k');
  label3.color = "white";
  label3.textColor = "black";
  label3.textSize = 15;
  label3.text = "Final Exams";

  label4 = new Sprite(50, 365, 90, 30, 'k');
  label4.color = "white";
  label4.textColor = "black";
  label4.textSize = 15;
  label4.text = "College Prep";
  
}

function avoiderWinScreen() {
  //screen = 4
  //background('skyblue');
  //Draw avoiders off of screen
  avoiderPlayer.pos = {x: -300, y: -150 };
  adultStatic = new Sprite(adultImg, 100, 300);
  avoider1.x = -200;
  avoider2.x = -500;
  avoider3.x = -1000;
  avoider4.x = -1100;
  avoider5.x = -1200;
  avoider6.x = -1300;
  avoider7.x = -1400;

  //labels off
  label1.pos = {x: -50,y: -50};
  label2.pos = {x: -50, y: -55};
  label3.pos = {x: -50, y: -60};
  label4.pos = {x: -50, y: -65};

  background('skyblue');
  //Display you win message
  fill('black');
  textAlign(CENTER);
  textSize(20);
  text('You win!', 200, 40);
  textSize(16);
  text('Slowly, but surely, you tackled everything that came\n your way, and emerged as a proud alumnus with\n much to offer to the world. \n \n You were employed by the prestigious News Corp, and \nfind yourself quite swamped with responsibilities...', 200, 70);

  //NextButton
  nextButton2 = new Sprite(200, 300, 100, 70, 'k');
  nextButton2.color = "white";
  nextButton2.textColor = "black";
  nextButton2.textSize = 20;
  nextButton2.text = "Next Level";
}

function collectionGameScreen() {
  //screen = 5
  //remove next button
  adultStatic.pos = {x: -300, y: -45};
  nextButton2.pos = {x: -300, y: -300 };
  avoiderPlayer.pos = {x: -300, y: -150 };

  background(224, 224, 224);
  image(bgImg3, 0, 0);

  //Create catcher 
  catcher = new Sprite(adultImg, 120, 380, 'k');
  catcher.color = color(95, 158, 160);

  //Create falling object
  fallingObject = new Sprite(noteImg, 100, 0);
  fallingObject.color = color(0, 128, 128);
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;
  fallingObject.text = random(fallingObjectText);
}
function youWin() {
  //screen = 6
  background(137, 213, 210);
  //winSound.play();
  background(137, 213, 210);
  image(winImg, 0, 0);
  catcher.x = -20;
  catcher.y = -20;
  fallingObject.x = -500;
  fallingObject.y = -40;
  fallingObject.vel.x = 0;
  fallingObject.vel.y = 0;
  fill('black');
  textSize(20);
  text('You WIN <3', 200, 50);
  textSize(17);
  text('You balanced your personal and professional\n life well and lived a full life, despite the hardships.\n Each phase of life had its own challenges, but the\n hope of overcoming them accompanied. \nWhatever phase of life you may be in\n right now, know that things get better\n as long as you hold fast to hope. \n After all, life is nothing but a Hope Quest! \n \n Click "Read More" to learn more about hope \nin the game or click "Restart" for a do-over:)', 200, 70);

  restartButton = new Sprite(150, 320, 80, 40, 'k');
  restartButton.color = "white";
  restartButton.textColor = "black";
  restartButton.textSize = 15;
  restartButton.text = "Restart";

  readButton = new Sprite(250, 320, 80, 40, 'k');
  readButton.color = "white";
  readButton.textColor = "black";
  readButton.textSize = 15;
  readButton.text = "Read More";
}

function restart() {
  if (mouseIsPressed) {
    score = 0;
    catcher.x = 200;
    catcher.y = 380;
    fallingObject.y = 0;
    fallingObject.x = random(15, 385);
    fallingObject.vel.y = random(1,5);
    fallingObject.direction = 'down';
  }
}

function storyScreen() {
  //screen = 7
  background(137, 213, 210);
  image(bgImg4, 0, 0);
  readButton.pos =  {x:-400, y:-250};
  restartButton.pos = {x: 200, y: 380};
  fill('white');
  textAlign(LEFT);
  textSize(15);
  text("Hope is all about bravery- the bravery to\n wake up to a new day, come what may, \nand to believe that there is hope for us. ", 15, 20)
  fill('black');
  text("'There are so many ways to be brave in this world. \nSometimes bravery involves laying down your life for \nsomething bigger than yourself, or for someone else. \nSometimes it involves giving up everything you have \never known, or everyone you have ever loved, \nfor the sake of something greater. \nBut sometimes it doesn't. \n \nSometimes it is nothing more than gritting your teeth \nthrough pain, and the work of every day, \nthe slow walk toward a better life. \n \nThat is the sort of bravery I must have now.'", 15, 90);

  textAlign(RIGHT);
  text('-Allegient, Veronica Roth', 350, 340);
  
}