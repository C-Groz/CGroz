class AKPickup extends Pickup{
    constructor(xPos, yPos){
        super();
        this.x = xPos;
        this.y = yPos;
        this.message = "F to buy AK-47 $";
        this.message2 = "F to reload AK-47 Ammo $"
        this.cost = 2000;
        this.ammoCost = 1000;
        this.pickedUpBool = false;
        this.img = loadImage('images/ak.png');
        
    }

    userPickedUp(){
        if(score.money >= this.cost && !this.pickedUpBool && currentGun.name != "AK-47"){
            score.money -= this.cost;
            currentGun = new AK(player1.x, player1.y);  
            score.ammoIn = currentGun.startingIn;
            score.ammoOut = currentGun.startingOut;
        }
        if(score.money >= this.ammoCost && !this.pickedUpBool && currentGun.name == "AK-47"){
            score.money -= this.ammoCost;  
            score.ammoOut = currentGun.startingOut;
        }
    }
    drawPickup(){
        image(this.img, this.x + gameMap.x - 20, this.y + gameMap.y, 80, 30)
    }
    offerPickup(){
        if(currentGun.name != "AK-47"){
            fill(255, 255, 255);
            textSize(30);
            text(this.message + this.cost, player1.x - 140, player1.y + 100);
        }else{
            fill(255, 255, 255);
            textSize(30);
            text(this.message2 + this.ammoCost, player1.x - 200, player1.y + 100);
        }
        
    }

}