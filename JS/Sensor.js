class Sensor{
    constructor(x, y, w, h) {
      var options = {
        isStatic: false
      }
      this.collisionItem;
      this.body = Bodies.rectangle(x, y, w, h, options);
      this.w = w;
      this.h = h;

      World.add(world, this.body)
    }
          
    display(){
      var angle = this.body.angle;
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(angle);
      fill("blue");
      rect(0, 0, this.w, this.h);
      pop();
    }
  };      