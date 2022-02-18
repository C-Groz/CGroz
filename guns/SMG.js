class SMG {


    constructor(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;

        //gun length/width
        this.gLength = 35;
        this.gWidth = 4;
        this.xShift = 25;
        this.yShift = -4;
        this.bulletFireConstant = 60;


        //ammo
        this.startingIn = 30; //mag size/starting ammo
        this.startingOut = 200;
        
        //reloading
        this.reloadTime = 500; //milliseconds
        this.tempTimeEnd = 0;
        this.tempInitIn = 0;

        //gun stats
        this.damage = 30;
        this.bulletVelocity = 30;
        this.timeBetweenBullets = 90;
        this.name = "SMG";

        this.canShoot = true;
        this.lastBulletFired = 0;
        this.cost = 1000;
        this.img = loadImage('images/mp5.png');
    }

    
    drawGun(xPos,yPos) {
        fill(100,100,100);
        rect(xPos, yPos + 2, this.gLength, this.gWidth);
        strokeWeight(2);
        line(xPos + 10, yPos + 6, 30, 8); //right arm
        line(xPos + 5, yPos + 12, 21.5, 12); //right arm
        line(xPos + 20, yPos + 2, 37, -10); //left arm
        line(xPos + 13, yPos - 6, 20, -16); //left arm
    }

    returnName(){
        return this.name;
    }
    returnTextSize(){
        return 45;
    }
    returnYDisplacement(){
        return 40;
    }

    startReload(){
        this.tempTimeEnd = millis() + this.reloadTime;
        this.tempInitIn = this.ammoIn;

        score.reloading = true;
    }
    reload(){
        if(score.ammoIn + score.ammoOut > this.startingIn){
            score.ammoOut -= this.startingIn - score.ammoIn;
            score.ammoIn = this.startingIn;
        }else{
            score.ammoIn += score.ammoOut;
            score.ammoOut = 0;
        }
        score.reloading = false;
    }
    shoot(){
        if(mouseIsPressed && score.ammoIn > 0 && !score.reloading && this.lastBulletFired + this.timeBetweenBullets < millis()){
            bullets.push(new Bullet(player1.returnGunX(), player1.returnGunY(), 0));
            score.ammoIn--;
            this.lastBulletFired = millis();
          }
         
    }
}