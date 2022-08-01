
var fireworks;
var last;

let soundEffect;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  fireworks = [];

  // fireworks.push(new Firework(width/2, height/4));

  last = 0;

  soundEffect = loadSound('assets/firework.mp3');
}

function draw() {
  background(7, 11, 52, 30);

  // fill("red");
  // ellipse(mouseX, mouseY, 20, 20);
  
  
  for (var i = 0; i < fireworks.length; i++) {
    fireworks[i].draw();
    fireworks[i].update();
  }

  done = false;
  while (!done) {
    if (fireworks.length > 0) {
      if (fireworks[0].dead) {
        fireworks.splice(0, 1);
      }
      else {
        done = true;
      }
    } 
    else {
      done = true;
    }
  }

  if (millis() > last + 2000) {
    last = millis();
    x = random(width/6, 5*width/6);
    y = random(height/6, 5*height/6);
    
    let heartChance = floor(random(10));
    heartChance = 1
    if (heartChance == 0) {
      fireworks.push(new FireworkHeart(x, y));
    }
    else {
      fireworks.push(new Firework(x, y));
      fireworks.push(new Firework(x, y));
      fireworks.push(new Firework(x, y));
    }
    
  }
}


function mousePressed() {

  fireworks.push(new Firework(mouseX, mouseY));
  fireworks.push(new Firework(mouseX, mouseY));
  fireworks.push(new Firework(mouseX, mouseY));
  // fireworks.
}