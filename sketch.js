const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Pair = Matter.Pair;
const Render = Matter.Render;   
const Runner = Matter.Runner;
const Bounds = Matter.Bounds;

var engine, world, render;

var player;
//var sensor;
var wall1, wall2;
var monster;

var form;

var score = 0;

var isGrounded = false;

var items = [];
var ground, platforms = [];
var objects = [];

var playerPos;
var sensorPos;

var rand;
var rand2;

var transY, transY1 = [], transY2, transY3, transY4, transY5;

function setup(){
    createCanvas(displayWidth, displayHeight);
    engine = Engine.create();
    world = engine.world;
    var runner = Runner.create();

    player = new Player(width/2, height/2, 50, 50);
    //Runner.run(runner, engine);

    /*render = Render.create({ 
        element: player.body, 
        engine: engine, 
        runner: runner, 
        options: { width: 100, height: 100, hasBounds: true } 
    }); */

    //Render.run(render);
    transY = player.body.position.y;

    Matter.Body.translate(player.body, {x: 0, y: transY});


    for(i = 0; i < height/2+height/4; i+=200){
        rand = Math.round(random(150, width-150));
        rand2 = Math.round(random(1, 10));
        platforms.push(new Platform(rand, i, 200, 10));
        if(rand2 === 5){
            items.push(new Item(rand, i-30, 25));
        }
    }

    for(i = 0; i<platforms.length; i++){
        transY1[i] = platforms[i].body.position.y;
        for(j = 0; j<transY1.length; j++){
            Matter.Body.translate(platforms[i].body, {x: 0, y: transY1[j]});
        }
    }

    

    ground = new Platform(width/2, height+30, width, 100);

    platforms.push(ground);

    wall1 = new Platform(-5, height, 10, height*4);
    wall2 = new Platform(width+5, height, 10, height*4);
    monster = new Monster(width/2, height/2, 50, 50);
    form = new Form();

    playerPos = player.body.position;
    sensor = new Sensor(playerPos.x, playerPos.y + 30, 20, 20)

    console.log("hello");
    setTimeout(3000);
    console.log("world");

    //objects.push(player.body.bounds);
    objects.push(player.body.position);
    objects.push(player.body.bounds.min);
    objects.push(player.body.bounds.max);
    //objects.push(player.body.x);
    //objects.push(player.body.y);
}

function draw(){
    background("white");  
    Engine.update(engine);

    sensorPos = sensor.body.position;

    player.display();
    ground.display();
    

    for(g = 0; g < platforms.length; g++){
        platforms[g].display(CENTER);
    }

    for(h = 0; h < items.length; h++){
        items[h].display();
    }

    wall1.display(CENTER);
    wall2.display(CENTER);
    monster.display();
    form.display();
    sensor.display();

    Matter.Body.setVelocity(monster.body, {x:2, y:0});

    bounceOff(monster, wall2);
    for(var i = 0; i < items.length; i++){
        if(isTouching(player, items[i])&&items[i].claimed===false){
            items[i].remove();
            console.log("hello");
        }
    }

    for(var i = 0; i < platforms.length; i++){
        if(checkCollision(player, platforms[i])){
            isGrounded = true;
            setTimeout(setGrounded, 500);
            console.log(isGrounded);
        }
    }
}

function keyPressed(){
    if(keyCode===32&&isGrounded === true/*||keyCode===87&&isGrounded === true*/){
        Matter.Body.applyForce(player.body, player.body.position, {x:0, y:-0.15});
    }
    if(keyCode===65){
        Matter.Body.applyForce(player.body, player.body.position,{x:-0.07, y:0});
    }
    if(keyCode===68){
        Matter.Body.applyForce(player.body, player.body.position,{x:0.07, y:0});
    }
    if(keyCode=== 83){
        Matter.Body.applyForce(player.body, player.body.position,{x:0, y:0.15});
    }   

}

function setGrounded(bool){
    isGrounded = false;
}
