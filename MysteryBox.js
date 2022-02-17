class MysteryBox{
    constructor(xPos, yPos){
        this.x = xPos;
        this.y = yPos;
        this.length = 150;
        this.width = 50;
        this.pickupRadius = 250;
        this.cost = 1000;
        this.spinning = false;
        this.open = false;
        this.fPressed = false;
        this.gunCurrent;

        this.time = 0;
        this.timeEnd = 0;
        this.spinDuration = 5000;
        this.timeIncrement = 1000;
        this.timeSpinning = 0;
        this.gunIndex = 0;
        this.pickedUpBool = false;

        this.tempGunPickup = new GunPickup(0, 0, new AK(0,0));
        this.tempGunPickup.message = "F to pick up";
        this.tempGunPickup.cost = " ";
        this.tempGunPickup.xTextDisplacement = 70;

        this.guns = [
            //new M1911(player1.x, player1.y),
            new Deagle(player1.x, player1.y),
            new Magnum(player1.x, player1.y),
            new AK(player1.x, player1.y),
            new M4(player1.x, player1.y),
            new Barrett(player1.x, player1.y),
            new Famas(player1.x, player1.y),
            new MP5(player1.x, player1.y),
        ]
        

        this.questionmark = loadImage('images/questionMark.png');
        this.questionmarkflipped = loadImage('images/questionmarkflipped.png');
        this.glow = loadImage('images/light_burst_green.jpg');

    }
    drawMysteryBox(){
        fill(159,198,255)
        rect(this.x + gameMap.x, this.y + gameMap.y, this. length, this.width);
        if(!this.open){
            image(this.questionmark, this.x + gameMap.x + 10, this.y + gameMap.y, 50, 50);
            image(this.questionmarkflipped, this.x + gameMap.x + 90, this.y + gameMap.y, 50, 50);
        }
        if(this.open){
            image(this.glow, this.x + gameMap.x + 1, this.y + gameMap.y, 148, 49);
            if(this.timeSpinning >= this.spinDuration){
                this.spinning = false;
                this.offerGunInBox(this.guns[this.gunIndex]);
                
            }
            else if(this.time + this.timeIncrement < millis() && this.spinning){
                this.gunIndex = floor(random(0,this.guns.length - .0001));
                this.time = millis();
                this.timeSpinning += this.timeIncrement;
            }

            this.drawGunInBox(this.guns[this.gunIndex]);
            
        }
        
    }
    playerInProximity(){
        let distance = sqrt(pow((this.x + gameMap.x + 75) - player1.x , 2) + pow((this.y + gameMap.y) - player1.y, 2));
        if(distance <= this.pickupRadius / 2){
            return true;
        }
        return false;
    }
    offerInteraction(){
        fill(255, 255, 255);
        textSize(30);
        text("F To Buy Mystery Gun $" + this.cost, player1.x - 200, player1.y + 100);
    }
    startSpin(){
        this.spinning = true;
        this.open = true;
        this.time = millis();
        this.timeEnd = this.timeStart + this.timeDuration;    
        this.timeSpinning = 0;    
        score.money -= this.cost;
    }
    drawGunInBox(gun){
        image(gun.img, this.x + this.length/2 - gun.imgl/2 + gameMap.x, this.y + this.width/2 - gun.imgw/2 + gameMap.y, gun.imgl, gun.imgw)
    }
    offerGunInBox(gun){
        this.tempGunPickup.x = this.x + this.length/2 - gun.imgl/2;
        this.tempGunPickup.y = this.y + this.width/2 - gun.imgw/2;
        this.tempGunPickup.setGun(gun);
        if(this.playerInProximity()){
            this.tempGunPickup.offerPickup();
        }
        
    }
    userPickedUp(){
        var tempGun = currentGun;
        currentGun = this.guns[this.gunIndex]; 
        this.guns[this.gunIndex] = tempGun;

        score.ammoIn = currentGun.startingIn;
        score.ammoOut = currentGun.startingOut;

        this.closeBox();
    
    }
    closeBox(){
        this.open = false;
        this.time = 0;
        this.timeEnd = 0;
        this.spinDuration = 5000;
        this.timeIncrement = 1000;
        this.timeSpinning = 0;
        this.gunIndex = 0;
        this.pickedUpBool = false;
    }
}