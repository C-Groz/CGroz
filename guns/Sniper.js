class Sniper {
    constructor(xPos, yPos){
        this.x = xPos;
        this.y = yPos;

        //gun length/width
        this.gLength = 80;
        this.gWidth = 5;
        this.xShift = 25;
        this.yShift = -4;
        this.bulletFireConstant = 110;


        //ammo
        this.startingIn = 5; //mag size/starting ammo
        this.startingOut = 30;
        
        //reloading
        this.reloadTime = 1400; //milliseconds
        this.tempTimeEnd = 0;
        this.tempInitIn = 0;

        //gun stats
        this.damage = 150;
        this.bulletVelocity = 40;
        this.name = "Sniper";
        this.bulletCooldown = 1000;
        this.canShoot = true;
        this.lastShot = 0;
    }
    drawGun(xPos,yPos) {
        fill(10,80,10);
        rect(xPos, yPos + 1, this.gLength, this.gWidth);
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
        return 22;
    }
    returnYDisplacement(){
        return 33;
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
        if(mouseIsPressed && this.canShoot && score.ammoIn > 0 && !score.reloading && this.lastShot + this.bulletCooldown < millis()){
            bullets.push(new Bullet(player1.returnGunX(), player1.returnGunY(), 0));
            score.ammoIn--;
            this.canShoot = false;
            this.lastShot = millis();
          }
          if(!mouseIsPressed){
            this.canShoot = true;
          }
    } 
}