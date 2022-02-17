class AmmoPickup extends Pickup{
    constructor(xPos, yPos){
        super();
        this.x = xPos;
        this.y = yPos;
        this.message = "F to refill ammo $";
        this.cost = 500;
        this.img = loadImage('images/bullets.png');
    }

    userPickedUp(){
        if(score.money >= this.cost && !this.pickedUpBool){
            score.money -= this.cost;
            score.ammoOut = currentGun.startingOut;
        }
        
    }
    drawPickup(){
        fill(255, 255, 255);
        rect(this.x + gameMap.x, this.y + gameMap.y, 30, 30);
        image(this.img, this.x + gameMap.x, this.y + gameMap.y, 30, 30)
    }
}