class Enemy{
    constructor(xPos, yPos){
        this.x = xPos;
        this.y = yPos;
        
        
        this.speed = 1 + score.round/20;
        this.Xspeed = 0;
        this.Yspeed = 0;
        this.angle = 0;

        //player damage
        this.damage = .5 + score.round/10;

        this.yClearPos = true;
        this.yClearNeg = true;
        this.xClearPos = true;
        this.xClearNeg = true;

        this.health = enemyHealth;
        this.startingHealth = this.health;
        this.healthPercent = 100;
        this.colorchange = 0;
        this.alive = true;

        this.bulletInEnemy = -1;
        this.radius = 50;
    }

    drawEnemy(){
        fill(60 + this.healthPercent/2.5 ,10,10);
        circle(this.x, this.y, this.radius);
        //text(this.healthPercent, this.x, this.y + 50)
    }

    die(a){
        enemies[a].damage = 0;
        enemies[a].radius = 0;
        enemies[a].alive = false;
        enemies[a].x = -3000;
        score.kill();
    }
    
    contains(xPosition, yPosition){
        if(xPosition == null){
            return false;
        }
        let distance = sqrt(pow(this.x - xPosition, 2) + pow(this.y - yPosition, 2));
        if(distance <= this.radius / 2){
            return true;
        }
        return false;
    }
    moveTowardPlayer(){
        if(this != null && !testEnviroment){
            if(this.x < player1.x && this.xClearPos){
                this.x+=this.Xspeed;  
            }
            if(this.x > player1.x && this.xClearNeg){
                this.x+=this.Xspeed;  
            }
            if(this.y < player1.y && this.yClearPos){
                this.y+=this.Yspeed;  
            }
            if(this.y > player1.y && this.yClearNeg){
                this.y+=this.Yspeed;  
            }
            
        }
        
    }

    playerContact(){
        let distance = sqrt(pow(this.x - player1.x, 2) + pow(this.y - player1.y, 2));
        if(distance <= 50){
            return true;
        }
        return false;
    }
    


    determineTraj(){
    //quad 1
    if(player1.x >= this.x && player1.y < this.y){
       this.angle = -1 *atan((this.y - player1.y)/(player1.x - this.x));
    }

    //quad 2
    if(player1.x > this.x && player1.y >= this.y){
        this.angle = atan((player1.y - this.y)/(player1.x - this.x));
    }

    //quad 3
    if(player1.x <= this.x && player1.y > this.y){
        this.angle = 3.14159 + atan((this.y - player1.y)/(abs(this.x - player1.x )));
    }

    //quad 4
    if(player1.x < this.x && player1.y <= this.y){
        this.angle = 3.14159 + atan((this.y - player1.y )/(abs(this.x-player1.x)));
    }

    if(gameMap.enemyRectangleContains(this.x + 27, this.y)){
        this.xClearPos = false;
    }else{
        this.xClearPos = true;
    }
    if(gameMap.enemyRectangleContains(this.x - 27, this.y)){
        this.xClearNeg = false;
    }else{
        this.xClearNeg = true;
    }
    if(gameMap.enemyRectangleContains(this.x, this.y + 27)){
        this.yClearPos = false;
    }else{
        this.yClearPos = true;
    }
    if(gameMap.enemyRectangleContains(this.x, this.y - 27)){
        this.yClearNeg = false;
    }else{
        this.yClearNeg = true;
    }
    this.Xspeed = this.speed * cos(this.angle);
    this.Yspeed = this.speed * sin(this.angle);

    }
}

