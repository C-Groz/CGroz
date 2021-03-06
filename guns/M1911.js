class M1911 extends Pistol{

    constructor(xPos, yPos){
        super();
        this.startingIn = 8; //mag size/starting ammo
        this.startingOut = 120;
        this.reloadTime = 800;
        this.damage = 20;
        this.bulletVelocity = 15;
        this.name = "M1911";
        this.img = loadImage('images/m1911(1).png');
        this.imgl = 52;
        this.imgw = 30;
        this.cost = 500;
        this.ammoCost = 500;
        this.damageDecreaseConstant = 5;
    }
}