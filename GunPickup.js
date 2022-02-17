class GunPickup extends Pickup{
    constructor(xPos, yPos, gun){
        super();
        this.x = xPos;
        this.y = yPos;
        this.message = "F to buy " + gun.name + " $";
        this.message2 = "F to reload " + gun.name + " Ammo $"
        this.cost = gun.cost;
        this.ammoCost = gun.ammoCost;
        this.pickedUpBool = false;
        this.img = gun.img;
        this.gun = gun;

        this.xTextDisplacement = 140;
        this.yTextDisplacement = 100;

    }

    userPickedUp(){
        if(score.money >= this.cost && !this.pickedUpBool && currentGun.name != this.gun.name){
            score.money -= this.cost;
            currentGun = this.gun; 
            score.ammoIn = currentGun.startingIn;
            score.ammoOut = currentGun.startingOut;
        }
        if(score.money >= this.ammoCost && !this.pickedUpBool && currentGun.name == this.gun.name){
            score.money -= this.ammoCost;  
            score.ammoOut = currentGun.startingOut;
        }
    }
    drawPickup(){
        image(this.img, this.x + gameMap.x - 20, this.y + gameMap.y, this.gun.imgl, this.gun.imgw)
    }
    offerPickup(){
        if(currentGun.name != this.gun.name){
            fill(255, 255, 255);
            textSize(30);
            text(this.message + this.cost, player1.x - this.xTextDisplacement, player1.y + this.yTextDisplacement);
        }else{
            fill(255, 255, 255);
            textSize(30);
            text(this.message2 + this.ammoCost, player1.x - 200, player1.y + 100);
        }
        
    }
    setGun(gun){
        this.gun = gun;
    }

}