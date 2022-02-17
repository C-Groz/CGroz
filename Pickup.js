class Pickup{
    constructor(xPos, yPos){
        this.x = xPos;
        this.y = yPos;
        this.pickupRadius = 150;
        this.message = "Sample";
        this.cost = 500;
        this.img = loadImage('images/bullets.png');
        this.pickedUpBool = false;
    }

    drawPickup(){
        fill(255, 255, 255);
        rect(this.x + gameMap.x - 20, this.y + gameMap.y, 30, 30);
        image(this.img, this.x + gameMap.x - 20, this.y + gameMap.y, 30, 30)
    }

    playerInProximity(){
        let distance = sqrt(pow((this.x + gameMap.x) - player1.x , 2) + pow((this.y + gameMap.y) - player1.y, 2));
        if(distance <= this.pickupRadius / 2){
            return true;
        }
        return false;
    }

    offerPickup(){
        fill(255, 255, 255);
        textSize(30);
        text(this.message + this.cost, player1.x - 140, player1.y + 100);
    }

    UserPickedUp(){
    }

}