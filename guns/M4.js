class M4 extends AutoRifle {
    constructor(xPos, yPos) {
        super();
        this.gLength = 40;
        this.gWidth = 4;
        this.damage = 45;
        this.bulletVelocity = 22;
        this.timeBetweenBullets = 115;
        this.bulletFireConstant = 75;
        this.name = "M4";
        this.img = loadImage('images/m41.png');
        this.cost = 2000;
        this.ammoCost = 500;
        this.imgl = 80;
        this.imgw = 30;
        this.damageDecreaseConstant = 10;
    }

    drawGun(xPos,yPos) {
        fill(0,0,0);
        rect(xPos, yPos + 2, this.gLength, this.gWidth);
        rect(xPos + 20, yPos + 1, 10, 6);
        rect(xPos + 40, yPos + 3, 10, 2);
        fill(0,0,0);
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
}