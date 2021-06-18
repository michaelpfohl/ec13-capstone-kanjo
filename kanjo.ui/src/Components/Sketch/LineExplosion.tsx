import React, { Component, createRef } from "react";
import p5 from "p5";

class LineExplosion extends Component {
  private myRef = createRef<HTMLDivElement>();

  sketch = (sketch: p5): void => {
    sketch.setup = () => {
      sketch.createCanvas(600, 600).parent('renderTarget');
      sketch.background('#0a0a0a');
      sketch.frameRate(4);
      sketch.noFill();
      sketch.strokeWeight(2);
    };

    sketch.draw = () => {
      for (let i = 15; i > 0; i--) {
        sketch.line(300, 300, sketch.random(20, 580), sketch.random(20, 580));
        sketch.stroke(
          sketch.random(["#474747", "#ffffff", "#c9c9c9", "#adadad", "#e3e3e3"])
        );
      }
      sketch.stroke("#38c6d9");
      sketch.square(10, 10, 580);
      sketch.stroke(
        sketch.random(["#474747", "#ffffff", "#c9c9c9", "#adadad", "#e3e3e3"])
      );
    };
  };

  componentDidMount(): void {
    new p5(this.sketch);
  }

  render(): JSX.Element {
    return (
      <div>
        <div id="renderTarget"></div>
      </div>
    );
  }
}

export default LineExplosion;
