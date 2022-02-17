class Magnum extends Pistol{

    constructor(xPos, yPos){
        super();

        //gun length/width
        this.gLength = 40;
        this.gWidth = 6;
        this.xShift = 25;
        this.yShift = -3;
        this.bulletFireConstant = 45;

        this.startingIn = 6; //mag size/starting ammo
        this.startingOut = 42;
        this.reloadTime = 1300;
        this.damage = 80;
        this.bulletVelocity = 20;
        this.name = "Magnum";
        this.bulletCooldown = 700;
        this.lastShot = 0;

        this.img = loadImage('images/magnum.png');
        this.imgl = 52;
        this.imgw = 30;
        this.cost = 1000;
        this.ammoCost = 500;
    }
    drawGun(xPos,yPos) {
        fill(169,169,169);
        rect(xPos, yPos, this.gLength, this.gWidth);
        strokeWeight(2);
        line(xPos + 6, yPos + 6, 23, 10);
        line(xPos + 6, yPos, 23, -10);
        line(xPos + 35, yPos + 3, xPos + 37, yPos + 3);
    }
    returnTextSize(){
        return 35;
    }
    returnYDisplacement(){
        return 36;
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