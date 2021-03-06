class Score{
    constructor(){
        this.round = 1;
        this.kills = 0;
        this.money = 500;
        this.enemiesRemaining = 1;
        this.playerHealth = 100;
        this.ammoOut = currentGun.startingOut;
        this.ammoIn = currentGun.startingIn;
        this.reloading = false;

     
    }

    drawScoreLayout(){

        //bottom right menu (round, kills, money, enemies)
        fill(185, 185, 185)
        var rectX = windowWidth - 210;
        var rectY = windowHeight - 210;
        var rectXlen = 200;
        var rectYlen = 200;

        rect(rectX, rectY, rectXlen, rectYlen, 50)
        fill(185, 0, 0)
        textSize(25);
        text("Round " + this.round, rectX + 35, rectY + 40);
        text("Kills: " + this.kills, rectX + 35, rectY + 80);
        text("Money: $" + this.money, rectX + 35, rectY + 120);
        text("Enemies: " + this.enemiesRemaining, rectX + 35, rectY + 160);

        //botttom left menu(health bar)
        rectX = 10;
        rectY = windowHeight - 60;
        rectXlen = 300;
        rectYlen = 50;

        fill(185, 185, 185)
        rect(rectX, rectY, rectXlen, rectYlen, 50)
        fill(200 - this.playerHealth*2, 0, 0);
        rect(rectX + 25, rectY + 5, this.playerHealth * 2.5, 40);

        //top right menu(gun, total ammo, ammo in mag)
        rectX =  windowWidth - 210;
        rectY =  10;
        rectXlen = 200;
        rectYlen = 50;
        fill(185, 185, 185);
        rect(rectX, rectY, rectXlen, rectYlen, 50);
        fill(185, 0, 0)
        textSize(currentGun.returnTextSize());
        text(currentGun.returnName(), rectX + 10, rectY + currentGun.returnYDisplacement());
        textSize(20);
        text(this.ammoIn, rectX + 150, rectY + 20);
        text(this.ammoOut, rectX + 150, rectY + 40);

        //reload
        if(this.reloading){
            textSize(40);
            text("Reloading", windowWidth/2 - 74, player1.y + 300);
        }
        

        
    }

    kill(){
        this.kills++;
        this.increaseMoney(25);
        this.enemiesRemaining--;
    }

   
    increaseMoney(amount){
        this.money += amount;
    }
    
    
}
