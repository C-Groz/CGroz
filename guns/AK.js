class AK extends AutoRifle {
    constructor(xPos, yPos) {
        super();
        this.gLength = 50;
        this.damage = 55;
        this.bulletVelocity = 22;
        this.timeBetweenBullets = 130;
        this.bulletFireConstant = 75;
        this.name = "AK-47";
        this.img = loadImage('images/ak1.png');
        this.cost = 2000;
        this.ammoCost = 500;
        this.imgl = 80;
        this.imgw = 30;
    }

    drawGun(xPos,yPos) {
        fill(139,69,19);
        rect(xPos, yPos, this.gLength, this.gWidth);
        fill(0,0,0);
        rect(xPos + 7, yPos + 1, 10, 4);
        rect(xPos + 48, yPos + 1, 8, 4);
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