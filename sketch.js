function setup() {
  createCanvas(windowWidth, windowHeight);
  player1 = new Player(windowWidth/2, windowHeight/2, 100);
  mbox = new MysteryBox(300, 950);
  //gameMap = new GameMap((windowWidth - 1500)/2, (windowHeight - 1000)/2);
  gameMap = new GameMap(windowWidth/2 - 300, windowHeight - 750);
  //currentGun = new AK(player1.x, player1.y);
  currentGun = new M1911(player1.x, player1.y);
  score = new Score();
 

  
  doorCoords = [];
  pickups = [];
  bullets = [];
  counter = 0;
  enemies = [];
  spawnTimer = 1200;
  enemyAmount = 1;
  nextChange = millis() + spawnTimer;
  enemyHealth = 25;

  spawnsActive = [0, 2];

  initializePickups();
  gameMap.drawMap();
  score.drawScoreLayout();
  gameActive = false; //false
  startRound();

  startButton = createButton('Start Game');
  startMenuActive = true; //true
  deathMenuActive = false;

  invincible = false;

  //penetration test enviroment
  testEnviroment = false;
  if(testEnviroment){
    startRound();
    for(var i = 0; i < 5; i++){
      append(enemies, new Enemy(800 + 10*i, 400));
    }
  }
}


function draw() {
  background(150);

  //start menu
  if(!gameActive && startMenuActive){
    drawStartMenu();
  }

  //death menu
  if(!gameActive && deathMenuActive){
    activateDeathMenu();
  }

  if(gameActive){

    //update bullets
    push();
    for (var a = 0; a < bullets.length; a++){
      fill(0, 0, 0);
      circle(bullets[a].xPos, bullets[a].yPos, bullets[a].radius);
      bullets[a].update();

      for(var i = 0; i < enemies.length; i++){
        if(enemies[i].contains(bullets[a].xPos, bullets[a].yPos)){
          if(enemies[i].bulletInEnemy != a){
            enemies[i].health -= bullets[a].damage;
            enemies[i].healthPercent = enemies[i].health/enemies[i].startingHealth * 100;
            bullets[a].damage -= currentGun.damageDecreaseConstant;
            if(bullets[a].damage <= 0){
              bullets[a].endRoute();
            }
          }
          bullets[a].bulletInEnemy = i;
          enemies[i].bulletInEnemy = a;
        }else if(enemies.bulletInEnemy == a && bullets[a].bulletInEnemy == i){
          enemies[i].bulletInEnemy = -1;
          bullets[a].bulletInEnemy = -1;
        }
      }
      
      if(gameMap.anyRectangleContains(bullets[a].xPos, bullets[a].yPos)){
        for(var i = 0; i < enemies.length; i++){
          if(enemies[i].bulletInEnemy == a && bullets[a].bulletInEnemy == i){
            enemies[i].bulletInEnemy = -1;
            bullets[a].bulletInEnemy = -1;
          }
        }
        
        bullets[a].endRoute(a);
      }
    }
    pop();

    //update enemies
    for(var i = 0; i < enemies.length; i++){
      enemies[i].drawEnemy();
      enemies[i].determineTraj();
      enemies[i].moveTowardPlayer();
      if(enemies[i].playerContact()){
        score.playerHealth -= enemies[i].damage;
      }
      if(enemies[i].health <= 0 && enemies[i].alive){
        enemies[i].die(i);
      }
    }
    
    checkSpawn();
    
    //update player
    push();
      translate(player1.x, player1.y);
      player1.determineAngle();
      rotate(player1.angle);
      fill(0, 150, 0);
      circle(0,0,50);
      fill(30, 30, 30);
      currentGun.drawGun(currentGun.xShift, currentGun.yShift);
    pop();

    //update map
    gameMap.move();
    gameMap.drawMap();
    score.drawScoreLayout();

    //pickups
    pickups.forEach(element => {
      if(element.playerInProximity()){
        element.offerPickup();
        if(keyIsDown(70) && !element.pickedUpBool){
          element.userPickedUp();
          element.pickedUpBool = true;
        }
        if(!keyIsDown(70)){
          element.pickedUpBool = false;
        }
      }
    });

    //doors
    doors.forEach(element => {
      if(element.playerInProximity()){
        element.offerInteraction();
        if(keyIsDown(70) && !element.pickedUpBool){
          element.userInteracted();
          element.pickedUpBool = true;
        }
        if(!keyIsDown(70)){
          element.pickedUpBool = false;
        }
      }
    });

    //mystery box
    if(mbox.playerInProximity()){
      if(!mbox.open){
        mbox.offerInteraction();
        mbox.pickedUpBool = false;
      }

      if(keyIsDown(70) && !mbox.pickedUpBool && !mbox.spinning && mbox.open){
        mbox.userPickedUp();
        mbox.pickedUpBool = true;
        mbox.fPressed = true;
      }
      if(keyIsDown(70) && !mbox.open && score.money >= mbox.cost && !mbox.fPressed){
        mbox.startSpin();
        mbox.fPressed = true;
      }
      if(!keyIsDown(70)){
        mbox.fPressed = false;
      }
      
      
    }

    //player death 
    if(score.playerHealth <= 0  && !invincible){
      gameActive = false;
      activateDeathMenu();
      deathMenuActive = true;
    }

    //update round
    if(enemyAmount == 0 && score.enemiesRemaining == 0 && gameActive){
      score.round++;
      startRound();
      spawnTimer = spawnTimer - 20;
    }

    //when bullet fired
    currentGun.shoot();

    //reload
    if((keyIsDown(82) && !score.reloading) || (score.ammoIn == 0 && !score.reloading && score.ammoOut != 0)){
      currentGun.startReload();
    }
    if(score.reloading && currentGun.tempTimeEnd < millis()){
      currentGun.reload();
    }
    if(score.ammoIn == 0 && score.ammoOut == 0){
      fill(255, 210, 0);
      textSize(40);
      text("No Ammo", windowWidth/2 - 76, player1.y + 300);
    }
    }
    
    
    
}

function startRound(){
  enemyHealth += 5;
  
  bullets = [];
  enemies = [];
  enemyAmount = score.round*5 + 5;
  score.enemiesRemaining = enemyAmount;

  for(var b = 0; b < (enemyAmount / 5); b++){
    var temp = gameMap.randomSpawnPoint();
    append(enemies, new Enemy(temp[0], temp[1]));
  }
  enemyAmount -= (enemyAmount / 5);
  
}

function checkSpawn(){
  if(millis() > nextChange && enemyAmount != 0){
    var temp = gameMap.randomSpawnPoint();
    append(enemies, new Enemy(temp[0], temp[1]));
    nextChange = millis() + spawnTimer;
    enemyAmount--;
  }
}
 
function initializePickups(){
  pickups = [
    ammoPickup = new AmmoPickup(-30, 400),
    TopGunPickup = new GunPickup(150, -40, new Olympia(player1.x, player1.y)),
  ]
  doors = [
    door1 = new Door(1, 1000, 50, 25, [1]),
    door2 = new Door(2, 1000, 50, 25, [3,4]),
  ]
}

function drawStartMenu(){
  fill(150,44,0)
  textSize(80);
  text('Chank\'s Zombies', windowWidth/2 - 310, 150);
  
  let menuX = windowWidth/2 - 200;
  let menuY = windowHeight/2 - 200;
  let menuL = 400;
  let menuH = 600;
  //menu backround
  fill(44, 44, 44);
  rect(menuX, menuY, menuL, menuH, 50);

  //buttons
  startButton.position(menuX + 45, menuY + 50);
  startButton.mousePressed(startGame);
  startButton.size(menuL - 100, 100)

}

function activateDeathMenu(){
  fill(150,44,0)
  textSize(100);
  text('You Died', windowWidth/2 - 205, 150);

  fill(40, 40, 40);
  rect(windowWidth/2 - 200, 250, 400, 500);

  fill(200, 200, 200)
  textSize(40);
  text('Kills: ', windowWidth/2 - 150, 325);
  text(score.kills, windowWidth/2 + 50, 325);


}


function startGame(){
  gameActive = true;
  startButton.hide();
  startRound();
  startMenuActive = false;
}