class Pistol {


    constructor(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;

        //gun length/width
        this.gLength = 20;
        this.gWidth = 5;
        this.xShift = 25;
        this.yShift = -2.5;
        this.bulletFireConstant = 45;

        //ammo
        this.startingIn = 12; //mag size/starting ammo
        this.startingOut = 120;
        
        //reloading
        this.reloadTime = 1000; //milliseconds
        this.tempTimeEnd = 0;
        this.tempInitIn = 0;

        //gun stats
        this.damage = 20;
        this.bulletVelocity = 15;
        this.name = "Pistol";

        this.canShoot = true;
    }

    
    drawGun(xPos,yPos) {
        fill(100,100,100);
        rect(xPos, yPos, this.gLength, this.gWidth);
        strokeWeight(2);
        line(xPos + 7, yPos + 5, 23, 10);
        line(xPos + 7, yPos, 23, -10);
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
        if(mouseIsPressed && this.canShoot && score.ammoIn > 0 && !score.reloading){
            bullets.push(new Bullet(player1.returnGunX(), player1.returnGunY(), 0));
            score.ammoIn--;
            this.canShoot = false;
          }
          if(!mouseIsPressed){
            this.canShoot = true;
          }
    }


}