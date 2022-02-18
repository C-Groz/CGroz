class Door {
    constructor(n, cost, xInteractionDist, yInteractionDist, spawns){
        this.doorNum = n;
        this.cost = cost;
        this.open = false;
        this.pickupRadius = 500;
        this.x = gameMap.doorCoords[this.doorNum - 1][0];
        this.y = gameMap.doorCoords[this.doorNum - 1][1];
        this.l = gameMap.doorCoords[this.doorNum - 1][2];
        this.w = gameMap.doorCoords[this.doorNum - 1][3];

        this.xDist = xInteractionDist;
        this.yDist = yInteractionDist;
        this.pickedUpBool = false;

        this.activateSpawns = spawns;
    }

    rectangleContains(rectX, rectY, rectL, rectW, x, y){
        if((x > rectX) && (x < rectX + rectL) && (y > rectY) && (y < rectY + rectW)){
            return true;
        }
        return false
    }

    playerInProximity(){
        if(this.rectangleContains(this.x - this.xDist + gameMap.x, this.y - this.yDist + gameMap.y, this.l + this.xDist * 2, this.w + this.yDist * 2, player1.x, player1.y)){
            return true;
        }
        return false;
    }

    userInteracted(){
        if(score.money >= this.cost){
            this.openDoor();
        }
    }

    offerInteraction(){
        if(!this.open){
            fill(255, 255, 255);
            textSize(30);
            text("F to Open Door $" + this.cost, player1.x - 150, player1.y + 100);
        }
    }
    openDoor(){
        this.open = true;
        score.money -= this.cost;
        gameMap.doorCoords[this.doorNum - 1] = [-1000, -1000, 0, 0];

        this.activateSpawns.forEach(element => {
            spawnsActive.push(element);
        });
    }
}