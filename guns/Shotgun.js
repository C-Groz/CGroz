class Shotgun {
    constructor(xPos, yPos){
        this.x = xPos;
        this.y = yPos;

        //gun length/width
        this.gLength = 35;
        this.gWidth = 5;
        this.xShift = 25;
        this.yShift = -4;
        this.bulletFireConstant = 70;


        //ammo
        this.startingIn = 2; //mag size/starting ammo
        this.startingOut = 40;
        
        //reloading
        this.reloadTime = 800; //milliseconds
        this.tempTimeEnd = 0;
        this.tempInitIn = 0;

        //gun stats
        
        this.damage = 40; // per bullet(5)
        this.bulletVelocity = 20;
        this.name = "Shotgun";

        this.canShoot = true;
        this.lastBulletFired = 0;
        this.cost = 500;
        this.ammoCost = 250;
        this.img = loadImage('images/shotgun.png');
        this.imgl = 85;
        this.imgw = 45;
        this.damageDecreaseConstant = 15;
        this.lastShot = 0;
        this.bulletCooldown = 100;
        this.rangeBulletDecay = .125;
    }

    drawGun(xPos,yPos) {
        fill(96, 54, 24);
        rect(xPos, yPos + 1, this.gLength, this.gWidth, 10);
        fill(0, 0, 0);
        rect(xPos + 35, yPos + 2.5, 10, 2);
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
            bullets.push(new Bullet(player1.returnGunX(), player1.returnGunY(), 2));
            bullets.push(new Bullet(player1.returnGunX(), player1.returnGunY(), -2));
            bullets.push(new Bullet(player1.returnGunX(), player1.returnGunY(), 4));
            bullets.push(new Bullet(player1.returnGunX(), player1.returnGunY(), -4));
            score.ammoIn--;
            this.canShoot = false;
            this.lastShot = millis();
          }
          if(!mouseIsPressed){
            this.canShoot = true;
          }
    } 

}