class MP5 extends SMG{
    constructor(xPos, yPos){
        super();
        this.name = "MP5";
        this.img = loadImage('images/mp5.png');
        this.imgl = 65;
        this.imgw = 30;
        this.ammoCost = 500;
        this.cost = 1500;
    }
    drawGun(xPos,yPos) {
        fill(0,0,0);
        rect(xPos, yPos + 2, this.gLength, this.gWidth);
        fill(200, 40, 0);
        rect(xPos + 29, yPos + 2.5, 6, 3);
        strokeWeight(2);
        line(xPos + 10, yPos + 6, 30, 8); //right arm
        line(xPos + 5, yPos + 12, 21.5, 12); //right arm
        line(xPos + 20, yPos + 2, 37, -10); //left arm
        line(xPos + 13, yPos - 6, 20, -16); //left arm
    }
}