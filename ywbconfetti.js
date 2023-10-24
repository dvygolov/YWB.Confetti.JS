class Confetti {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.maxParticles = screen.width >= 988 ? 150 : 75;
    this.particles = [];
    this.angle = 0;
    this.tiltAngle = 0;
    this.isActive = false;
    this.animationComplete = true;

    this.particleColors = {
      options: [
        "DodgerBlue",
        "OliveDrab",
        "Gold",
        "pink",
        "SlateBlue",
        "lightblue",
        "Violet",
        "PaleGreen",
        "SteelBlue",
        "SandyBrown",
        "Chocolate",
        "Crimson",
      ],
      index: 0,
      incrementer: 0,
      threshold: 10,
      getColor: function() {
        if (this.incrementer >= this.threshold) {
          this.incrementer = 0;
          this.index++;
          if (this.index >= this.options.length) this.index = 0;
        }
        this.incrementer++;
        return this.options[this.index];
      },
    };

    this.initStyle();
    this.initCanvas();
    this.setupResizeEvent();

    this.populateParticles();
  }

  initStyle() {
    const style = document.createElement("style");
    style.innerHTML = `
      #canvasConfetti {
          display: block;
          position: relative;
          z-index: 1;
          pointer-events: none;
          position: fixed;
          top: 0;
      }
    `;
    document.head.appendChild(style);
  }

  initCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canvasConfetti";
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  setupResizeEvent() {
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    });
  }

  populateParticles() {
    this.animationComplete = false;
    this.particles = [];

    for (let i = 0; i < this.maxParticles; i++) {
      let color = this.particleColors.getColor();
      this.particles.push(new this.Particle(color, this));
    }
  }

  start(duration = 4000) {
    this.isActive = true;
    this.animate();

    setTimeout(() => {
      this.deactivate();
    }, duration);
  }

  animate() {
    if (this.animationComplete) return;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particles.forEach((p) => p.draw());
    this.updateParticles();

    requestAnimationFrame(() => this.animate());
  }

  updateParticles() {
    this.angle += 0.01;
    this.tiltAngle += 0.1;

    let activeCount = 0;
    for (let p of this.particles) {
      if (this.animationComplete) break;
      if (!this.isActive && p.y < -15) {
        p.y = this.height + 100;
      } else {
        p.update();
        if (p.y <= this.height) activeCount++;
        this.checkParticleBounds(p);
      }
    }
    if (activeCount === 0) this.stop();
  }

  checkParticleBounds(p) {
    if (p.isOutOfBounds(this.width, this.height) && this.isActive) {
      let newX = Math.random() * this.width;
      let newY = -10;
      let newTilt = Math.floor(10 * Math.random()) - 10;
      p.setPosition(newX, newY, newTilt);
    }
  }

  stop() {
    this.animationComplete = true;
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  deactivate() {
    this.isActive = false;
  }

  Particle = class {
    constructor(color, parent) {
      this.parent = parent;

      this.x = Math.random() * parent.width;
      this.y = Math.random() * parent.height - parent.height;
      this.radius = getRandom(10, 30);
      this.density = Math.random() * parent.maxParticles + 10;
      this.color = color;
      this.tilt = Math.floor(10 * Math.random()) - 10;
      this.tiltIncrement = 0.07 * Math.random() + 0.05;
      this.tiltAngle = 0;
    }

    draw() {
      let ctx = this.parent.ctx;

      ctx.beginPath();
      ctx.lineWidth = this.radius / 2;
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.x + this.tilt + this.radius / 4, this.y);
      ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.radius / 4);
      ctx.stroke();
    }

    update() {
      this.tiltAngle += this.tiltIncrement;
      this.y +=
        (Math.cos(this.parent.angle + this.density) + 3 + this.radius / 2) / 2;
      this.x += Math.sin(this.parent.angle);
      this.tilt = 15 * Math.sin(this.tiltAngle);
    }

    setPosition(x, y, tilt) {
      this.x = x;
      this.y = y;
      this.tilt = tilt;
    }

    isOutOfBounds(width, height) {
      return this.x > width + 20 || this.x < -20 || this.y > height;
    }
  };
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener("DOMContentLoaded", () => {
  const confetti = new Confetti();
  confetti.start();
});
