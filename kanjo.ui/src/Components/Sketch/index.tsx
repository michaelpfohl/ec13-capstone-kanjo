import React, { Component, createRef } from "react";
import p5 from "p5";

class Sketch extends Component {
  private myRef = createRef<HTMLDivElement>();

  sketch = (sketch: p5): void => {
    sketch.setup = () => {
      sketch.createCanvas(600, 600);
      sketch.background(0);
      sketch.frameRate(1);
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
      sketch.stroke("#adada9");
      sketch.square(10, 10, 580);
    };
  };

  componentDidMount(): void {
    new p5(this.sketch);
  }

  render(): JSX.Element {
    return <div ref={this.myRef}></div>;
  }
}

export default Sketch;
