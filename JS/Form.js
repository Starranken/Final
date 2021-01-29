class Form {

    constructor() {
      this.greeting = createElement('h2');
    }
  
    display(){
        this.greeting.html("Score: " + score)
        this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    }
  }
  