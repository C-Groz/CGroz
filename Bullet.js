class Bullet{
    constructor(initX, initY, initAngle){
        this.xPos = initX;
        this.yPos = initY;
        this.angle = initAngle;
        this.speed = currentGun.bulletVelocity;;
        this.Xspeed = this.speed * cos(player1.angle);
        this.Yspeed = this.speed * sin(player1.angle);
        this.radius = 4;
        this.b = null;

        this.bulletInEnemy = -1;
    }

    update(){
        if(this.xPos != null){
            this.xPos+=this.Xspeed;
            this.yPos+=this.Yspeed;
        }

        if (keyIsDown(65)) {
            this.xPos += 5;
        }
          
        if (keyIsDown(68)) {
            this.xPos -= 5;
        }
          
        if (keyIsDown(87)) {
            this.yPos += 5;
        }
          
        if (keyIsDown(83)) {
            this.yPos -= 5;
        }
        
    }

    
    endRoute(a){
        //bullets.splice(bullet, 1);
        bullets[a].radius = 0;
        bullets[a].xPos = -2000;
        bullets[a].yPos = -2000;    
    }
    
}
