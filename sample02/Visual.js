import { Text } from './Text.js';
import { Particle } from './Particle.js';

export class Visual {
  constructor() {
    this.text = new Text();

    this.texture = PIXI.Texture.from('particle.png');

    this.particles = [];

    this.mouse = {
      x: 0,
      y: 0,
      radius: 50
    };

    document.addEventListener('pointermove', this.onMove.bind(this), false);
  }


  show(stageWidth, stageHeight, stage) {
    if (this.container) {
      stage.removeChild(this.container);
    }

    this.pos = this.text.setText('Pudding', 4, stageWidth, stageHeight);

    this.container = new PIXI.ParticleContainer(
      this.pos.length,
      {
        vertices: false,
        position: true,
        rotation: false,
        scale: false,
        uvs: false,
        tint: false,
      }
    );
    stage.addChild(this.container);

    this.particles = [];
    for (let i = 0; i < this.pos.length; i++) {
      const item = new Particle(this.pos[i], this.texture);
      this.container.addChild(item.sprite);
      this.particles.push(item);
    }
  }

  animate() {
    for (let i = 0; i < this.particles.length; i++) {
      const item = this.particles[i];
      const dx = this.mouse.x - item.x;
      const dy = this.mouse.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = item.radius + this.mouse.radius;

      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const tx = item.x + Math.cos(angle) * minDist;
        const ty = item.y + Math.sign(angle) * minDist;
        const ax = tx - this.mouse.x;
        const ay = ty - this.mouse.y;
        item.vx -= ax;
        item.vy -= ay;
      }

      item.draw();
    }
  }

  onMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}

