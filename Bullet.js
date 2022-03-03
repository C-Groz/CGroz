class Bullet{
    constructor(initX, initY, sprayDeviation){
        this.xPos = initX;
        this.yPos = initY;
        this.angle = 0;
        this.speed = currentGun.bulletVelocity;;
        this.Xspeed = this.speed * cos(player1.angle);
        this.Yspeed = this.speed * sin(player1.angle);
        this.radius = 4;
        this.b = null;
        
        this.sprayDeviation = sprayDeviation;

        this.damage = currentGun.damage;

        this.bulletInEnemy = -1;
    }

    update(){
        if(this.xPos != null){
            this.xPos+=this.Xspeed + (this.sprayDeviation * sin(player1.angle));
            this.yPos+=this.Yspeed - (this.sprayDeviation * cos(player1.angle));
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

        if(currentGun.name == "Olympia"){
            this.damage -= currentGun.rangeBulletDecay;
        }
        
    }

    
    endRoute(a){
        //bullets.splice(bullet, 1);
        this.radius = .0001;
        this.xPos = -2000;
        this.yPos = -2000;    
    }
    
}
