function setup() {
  createCanvas(windowWidth, windowHeight);
  player1 = new Player(windowWidth/2, windowHeight/2, 100);
  mbox = new MysteryBox(800, 0);
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
  startRound();
}


function draw() {
  background(150);
    
  //update bullets
  push();
  for (var a = 0; a < bullets.length; a++){
    fill(0, 0, 0);
    circle(bullets[a].xPos, bullets[a].yPos, bullets[a].radius);
    bullets[a].update();

    for(var i = 0; i < enemies.length; i++){
      if(enemies[i].contains(bullets[a].xPos, bullets[a].yPos)){
        if(enemies[i].bulletInEnemy != a){
          enemies[i].health -= currentGun.damage;
          enemies[i].healthPercent = enemies[i].health/enemies[i].startingHealth * 100;
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


  //update round
  if(enemyAmount == 0 && score.enemiesRemaining == 0){
    score.round++;
    startRound();
    spawnTimer = spawnTimer - 20;
  }

  //when bullet fired
  currentGun.shoot();

  //reload
  if((keyIsDown(82) && !score.reloading) || score.ammoIn == 0 && !score.reloading && ammoOut != 0){
    currentGun.startReload();
  }
  if(score.reloading && currentGun.tempTimeEnd < millis()){
    currentGun.reload();
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
      TopGunPickup = new GunPickup(150, -30, new M1911(player1.x, player1.y)),
    ]
    doors = [
      door1 = new Door(1, 1000, 50, 25, [1]),
      
    ]
  }

  


