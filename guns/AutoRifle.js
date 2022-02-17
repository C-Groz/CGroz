class AutoRifle {


    constructor(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;

        //gun length/width
        this.gLength = 40;
        this.gWidth = 6;
        this.xShift = 25;
        this.yShift = -4;
        this.bulletFireConstant = 52;


        //ammo
        this.startingIn = 30; //mag size/starting ammo
        this.startingOut = 250;
        
        //reloading
        this.reloadTime = 1000; //milliseconds
        this.tempTimeEnd = 0;
        this.tempInitIn = 0;

        //gun stats
        this.damage = 40;
        this.bulletVelocity = 20;
        this.timeBetweenBullets = 130;
        this.name = "AR";

        this.canShoot = true;
        this.lastBulletFired = 0;
    }

    
    drawGun(xPos,yPos) {
        fill(100,100,100);
        rect(xPos, yPos, this.gLength, this.gWidth);
        strokeWeight(2);
        line(xPos + 10, yPos + 6, 30, 8); //right arm
        line(xPos + 5, yPos + 12, 21.5, 12); //right arm
        line(xPos + 20, yPos, 37, -10); //left arm
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