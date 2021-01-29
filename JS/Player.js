class Player{
  constructor(x, y, w, h) {
    var options = {
      isStatic: false
    }
    this.isGrounded  = false;
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
        
    World.add(world, this.body);
  }
        
  display(){
    var angle = this.body.angle;
    var pos = this.body.position;
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    rectMode(CENTER);
    stroke("gray")
    fill("gray");
    rect(0, 0, this.w, this.h);
    pop();

    camera.position = {x:displayWidth/2, y:pos.y};
  }
};      