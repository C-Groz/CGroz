class Deagle extends Pistol{

    constructor(xPos, yPos){
        super();

        //gun length/width
        this.gLength = 28;
        this.gWidth = 8;
        this.xShift = 25;
        this.yShift = -4;
        this.bulletFireConstant = 45;

        this.startingIn = 7; //mag size/starting ammo
        this.startingOut = 49;
        this.reloadTime = 800;
        this.damage = 50;
        this.bulletVelocity = 20;
        this.name = "Deagle";
        this.bulletCooldown = 400;
        this.lastShot = 0;
        this.img = loadImage('images/deagle.png');
        this.imgl = 50;
        this.imgw = 30;
        this.cost = 1500;
        this.ammoCost = 500;
        this.damageDecreaseConstant = 7;
    }
    drawGun(xPos,yPos) {
        fill(100,100,100);
        rect(xPos, yPos, this.gLength, this.gWidth);
        strokeWeight(2);
        line(xPos + 6, yPos + 8, 23, 10);
        line(xPos + 6, yPos, 23, -10);
    }
    returnTextSize(){
        return 40;
    }
    returnYDisplacement(){
        return 37.5;
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