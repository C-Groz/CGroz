class GameMap{

    
    constructor(xPos, yPos){
        this.x = xPos;
        this.y = yPos;
        this.playerSpeed = 5;

        //rectangles which player can't walk through
        this.coords = [
        //   xpos  ypos l(x) w(y)
            [-1000, 0, 1000, 1000], //left map edge
            [-1000, -1000, 3500, 1000], //top map edge
            [-1000, 1000, 3500, 1000], //bottom map edge
            [1500, 0, 50, 1000], //right map edge
            [600, 0, 20, 200], //right spawn room wall
            [600, 400, 20, 200], //right spawn room wall
            [0, 600, 620, 20], //bottom spawn room wall 
            [290, 800, 20, 200],
            [1000, 575, 325, 50],
            [1275, 275, 150, 50],
            [1275, 275, 50, 325],
            [mbox.x, mbox.y, 150, 50], //mystery box(doesn't get drawn by drawMap())
        ]

        this.doorCoords = [
            [600, 200, 20, 200], //door 1
            [900, 200, 20, 200], //door 2
        ]

        this.enemySpawns = [
            [300, -5, 100, 10], //spawn 0 (top left)
            [1100, -5, 100, 10], //spawn 1 (top right)
            [-5, 300, 10, 100], //spawn 2 (left top)
            [-5, 800, 10, 100], //spawn 3 (left bottom)
            [500, 995, 100, 10], //spawn 4 (bottom left)
            [1300, 995, 100, 10], //spawn 5 (bottom right)
        ]

        

    }


  
    drawMap(){
        fill(0, 0, 0)
        for(var i = 0; i < this.coords.length - 1; i++){
            rect(this.coords[i][0] + this.x, this.coords[i][1] + this.y, this.coords[i][2], this.coords[i][3] )
        }
        fill(131, 105, 83)
        for(var i = 0; i < this.enemySpawns.length; i++){
            rect(this.enemySpawns[i][0] + this.x, this.enemySpawns[i][1] + this.y, this.enemySpawns[i][2], this.enemySpawns[i][3] )
        }
        for(var i = 0; i < pickups.length; i++){
            pickups[i].drawPickup();
        }
        fill(181, 101, 21);
        for(var i = 0; i < this.doorCoords.length; i++){
            rect(this.doorCoords[i][0] + this.x, this.doorCoords[i][1] + this.y, this.doorCoords[i][2], this.doorCoords[i][3] )
        }
        mbox.drawMysteryBox();

    }
    
    move(){
        if (keyIsDown(65)) {
            if(!this.anyRectangleContains(player1.leftX, player1.y)){
                this.x += this.playerSpeed;
                for(var i = 0; i < enemies.length; i++){
                enemies[i].x += this.playerSpeed;
                }
            }
            
        }
      
        if (keyIsDown(68)) {   
                if(!this.anyRectangleContains(player1.rightX, player1.y)){
                this.x -= this.playerSpeed;
                for(var i = 0; i < enemies.length; i++){
                enemies[i].x -= this.playerSpeed;
                }
            }
            
        }
      
        if (keyIsDown(87)){
                if(!this.anyRectangleContains(player1.x, player1.topY)){
                this.y += this.playerSpeed;
                for(var i = 0; i < enemies.length; i++){
                enemies[i].y += this.playerSpeed;
                }
            }
        }
      
        if (keyIsDown(83)) {
                if(!this.anyRectangleContains(player1.x, player1.bottomY)){
                this.y -= this.playerSpeed;
                for(var i = 0; i < enemies.length; i++){
                enemies[i].y -= this.playerSpeed;
                }
            }
            
        }
    }

    rectangleContains(rectX, rectY, rectL, rectW, x, y){
        if((x > rectX) && (x < rectX + rectL) && (y > rectY) && (y < rectY + rectW)){
            return true;
        }
        return false
    }

    anyRectangleContains(xPos, yPos){
        for(var i = 0; i < this.coords.length; i++){
            if((xPos > (this.coords[i][0] + this.x) ) && (xPos < (this.coords[i][0] + this.x) + this.coords[i][2]) && (yPos > (this.coords[i][1] + this.y)) && (yPos < (this.coords[i][1] + this.y) + this.coords[i][3])){
                return true;
            }
        }

        for(var i = 0; i < this.doorCoords.length; i++){
            if((xPos > (this.doorCoords[i][0] + this.x) ) && (xPos < (this.doorCoords[i][0] + this.x) + this.doorCoords[i][2]) && (yPos > (this.doorCoords[i][1] + this.y)) && (yPos < (this.doorCoords[i][1] + this.y) + this.doorCoords[i][3])){
                return true;
            }
        }
        
        return false;
        
    }

    enemyRectangleContains(xPos, yPos){
        for(var i = 4; i < this.coords.length; i++){
            if((xPos > (this.coords[i][0] + this.x) ) && (xPos < (this.coords[i][0] + this.x) + this.coords[i][2]) && (yPos > (this.coords[i][1] + this.y)) && (yPos < (this.coords[i][1] + this.y) + this.coords[i][3])){
                return true;
            }
        }

        for(var i = 4; i < this.doorCoords.length; i++){
            if((xPos > (this.doorCoords[i][0] + this.x) ) && (xPos < (this.doorCoords[i][0] + this.x) + this.doorCoords[i][2]) && (yPos > (this.doorCoords[i][1] + this.y)) && (yPos < (this.doorCoords[i][1] + this.y) + this.doorCoords[i][3])){
                return true;
            }
        }

        return false;
        
    }

    
    randomSpawnPoint(){
        var temp = floor(random() * (spawnsActive.length));
        var spawn = spawnsActive[temp];
        if(temp <= 0 || temp >= 2){
            return [this.enemySpawns[spawn][0] + random(10, 90) + this.x, this.enemySpawns[spawn][1] + this.y];

        }else{
            return [this.enemySpawns[spawn][0] + this.x, this.enemySpawns[spawn][1] + random(10, 90) + this.y];
        } 
    }
}