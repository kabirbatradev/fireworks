

class Firework {


  constructor(x, y) {
    this.middleX = x;
    this.middleY = y;
    this.pos = createVector(x, height);

    this.vel = createVector(0, -5);

    this.exploded = false;
    this.particlePos = [];
    this.particleVel = [];

    this.particleShadows = [];
    this.numShadows = 15;

    this.gravity = createVector(0, 0.05);

    this.energy = 3.4;

    this.numParticles = random(8, 15);

    this.r = random(150, 255);
    this.g = random(150, 255);
    this.b = random(150, 255);
    this.o = random(150, 255);

    this.dead = false;

  }

  draw() {

    fill(this.r, this.g, this.b, this.o);

    // not exploded
    if (!this.exploded) {
      ellipse(this.pos.x, this.pos.y, random(0,4), 7);
    } 
    
    // exploded
    else {

      if (this.o <= 0) {
        this.dead = true;
      }

      // draw particles
      for (var i = 0; i < this.particlePos.length; i++) {
        ellipse(this.particlePos[i].x, this.particlePos[i].y, 5, 5);
      }

      // draw particle shadows
      for (var i = 0; i < this.particleShadows.length; i++) {
      // for (var i = this.particleShadows.length - 1; i >= 0; i--) {
        fill(this.r, this.g, this.b, this.o - (this.particleShadows.length - i) * 0.7);
        ellipse(this.particleShadows[i].x, this.particleShadows[i].y, random(0,6), random(0,6));
        
      }

      this.o -= 3;

    }
    
  }

  update() {

    // already exploded
    if (this.exploded) {
      for (var i = 0; i < this.particlePos.length; i++) {
        // ellipse(this.particlePos[i].x, this.particlePos[i].y, 5, 5);

        this.particleShadows.push(createVector(this.particlePos[i].x, this.particlePos[i].y));
        if (this.particleShadows.length > this.numParticles * this.numShadows) {
          this.particleShadows.splice(0, 1);
        }

        this.particlePos[i].add(this.particleVel[i]);
        this.particleVel[i].add(this.gravity);
      }
    }

    // needs to explode now
    else if (this.pos.y < this.middleY) {
      this.exploded = true;

      for (var i = 0; i < this.numParticles; i++) {
        this.particlePos.push(createVector(this.middleX, this.middleY));
        this.particleVel.push(createVector(random(-this.energy, this.energy), random(-this.energy, this.energy)));

      }
      soundEffect.play();


    } 
    
    // not yet exploded
    else {
      this.pos.add(this.vel);
    }

  }




}