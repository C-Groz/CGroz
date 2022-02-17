class Player {
    constructor(xPos, yPos, radius) {
        this.x = xPos;
        this.y = yPos;
        this.radius = radius;
        this.angle=0;

        this.topY = this.y - 27;
        this.leftX = this.x - 27;
        this.rightX = this.x + 27;
        this.bottomY = this.y + 27;

    }

    
    //draws player; called continuously 
    drawPlayer() {
        circle(this.x, this.y, this.radius);
        
    }

    //moves player; called continuously 
    move() {

        if (keyIsDown(65) && player1.x > 0) {
            this.x -= 5;
        }
    
        if (keyIsDown(68) && player1.x < windowWidth) {
            this.x += 5;
        }
    
        if (keyIsDown(87) && player1.y > 0) {
            this.y -= 5;
        }
    
        if (keyIsDown(83) && player1.y < windowHeight) {
            this.y += 5;
        }

        
    }

    //used for firing bullet from tip of gun
    returnGunY(){
        var tempy = sin(this.angle) * currentGun.bulletFireConstant;
        return player1.y + tempy;
    }
    returnGunX(){
        var tempx = cos(this.angle) * currentGun.bulletFireConstant;
        return player1.x + tempx;
    }

    //determine angle between player and mouse pointer
    determineAngle(){
        //quad 1
        if(mouseX >= this.x && mouseY < this.y){
        this.angle = -1 *atan((this.y - mouseY)/(mouseX - this.x));
        }

        //quad 2
        if(mouseX > this.x && mouseY >= this.y){
            this.angle = atan((mouseY - this.y)/(mouseX - this.x));
        }

        //quad 3
        if(mouseX <= this.x && mouseY > this.y){
            this.angle = 3.14159 + atan((this.y - mouseY)/(abs(this.x - mouseX )));
        }

        //quad 4
        if(mouseX < this.x && mouseY <= this.y){
            this.angle = 3.14159 + atan((this.y - mouseY )/(abs(this.x-mouseX)));
        }

    }
    


}