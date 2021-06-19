import React, { Component, createRef } from "react";
import p5 from "p5";
import { EmotionProps } from '../../Helpers/Types/EmotionTypes';

type Particle = {
  update: () => void;
  applyForce: (vector: p5.Vector) => void;
  follow: (vectors: p5.Vector[]) => void;
  show: () => void;
  updatePrev: () => void;
  edges: () => void;
};

class Sketch extends Component<EmotionProps> {

  state ={
    emotion: this.props.emotion,
  }

  myRef = createRef<HTMLDivElement>();

  componentDidMount(): void {
    new p5(this.sketch);
  }

  sketch = (sketch: p5): void => {
    const { emotion } = this.props;
    const inc = emotion.increment;
    const scl = emotion.scale;
    let zoff = 0;
    const particles: Particle[] = [];
    let flowField: p5.Vector[] = [];
    let cols = 0;
    let rows = 0;
    const frameRate = emotion.frameRate;

    sketch.setup = () => {
      sketch.createCanvas(600, 600).parent("renderTarget");
      sketch.background("#0a0a0a");
      sketch.noFill();
      sketch.strokeWeight(1);
      sketch.frameRate(frameRate);
      cols = sketch.floor(sketch.width / scl);
      rows = sketch.floor(sketch.height / scl);
      flowField = new Array(cols * rows);
      for (let i = 0; i < emotion.numberOfParticles; i++) {
        const newParticle = Particle();
        particles.push(newParticle);
      }
    };

    sketch.draw = () => {
      let yoff = 0;
      for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          const index = x + y * cols;
          const angle = sketch.noise(xoff, yoff, zoff) * sketch.TWO_PI;
          const v = p5.Vector.fromAngle(angle);
          flowField[index] = v;
          v.setMag(emotion.magnetism);
          xoff += inc;
        }
        yoff += inc;
        zoff += emotion.zOffset;
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowField);
        particles[i].edges();
        particles[i].show();
        particles[i].update();
      }
      sketch.stroke("#38c6d9");
      sketch.strokeWeight(3);
      sketch.square(0, 0, 600);
      sketch.strokeWeight(1)
    };

    const Particle = () => {
      const pos = sketch.createVector(
        sketch.random(sketch.width),
        sketch.random(sketch.height)
      );

      const vel = sketch.createVector(0, 0);
      const acc = sketch.createVector(0, 0);
      const maxSpeed = emotion.maxSpeed;
      const prevPos = pos.copy();

      const particle: Particle = {
        update: () => {
          vel.add(acc);
          vel.limit(maxSpeed);
          pos.add(vel);
          acc.mult(0);
        },
        applyForce: (force: p5.Vector) => {
          acc.add(force);
        },
        follow: (vectors: p5.Vector[]) => {
          const x = sketch.floor(pos.x / scl);
          const y = sketch.floor(pos.y / scl);
          const index = x + y * cols;
          const force = vectors[index];
          particle.applyForce(force);
        },
        show: () => {
          sketch.stroke(255, emotion.strokeAlpha);
          sketch.strokeWeight(emotion.strokeWeight);
          sketch.line(pos.x, pos.y, prevPos.x, prevPos.y);
          particle.updatePrev();
        },
        updatePrev: () => {
          prevPos.x = pos.x;
          prevPos.y = pos.y;
        },
        edges: () => {
          if (pos.x > sketch.width) {
            pos.x = 0;
            particle.updatePrev();
          }
          if (pos.x < 0) {
            pos.x = sketch.width;
            particle.updatePrev();
          }
          if (pos.y > sketch.height) {
            pos.y = 0;
            particle.updatePrev();
          }
          if (pos.y < 0) {
            pos.y = sketch.height;
            particle.updatePrev();
          }
        },
      };
      return particle;
    };
  };

  render(): JSX.Element {
    return (
      <div className="mb-2">
        <div id="renderTarget"></div>
      </div>
    );
  }
}

export default Sketch;
