class Item{
  constructor(x, y, r) {
    var options = {
      isStatic: true
    }
    this.claimed = false;
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.Visiblity = 255;
    this.image = loadImage("Images/Coin.png");
    World.add(world, this.body);
  }
        
  display(){
    var angle = this.body.angle;
    if(this.Visiblity>0){
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, 0, this.r*2, this.r*2);
      pop();
    }
  }

  remove(){
    World.remove(world, this.body);
    score++;
    this.claimed = true;
    push();
    this.Visiblity = 0;
    tint(255, this.Visiblity);
    image(this.image, this.x, this.y, 50, 50);
    pop();
  }
};