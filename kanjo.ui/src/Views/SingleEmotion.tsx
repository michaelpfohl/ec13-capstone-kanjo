import React, { Component } from "react";
import { Emotion, EmotionProps } from "../Helpers/Types/EmotionTypes";

type SingleEmotionState = {
  emotion: Emotion;
};

class SingleEmotion extends Component<EmotionProps> {
  state: SingleEmotionState = {
    emotion: this.props.location.state.emotion,
  };

  componentDidMount = (): void => {
    console.log(this.props);
  };

  render(): JSX.Element {
    const { emotion } = this.state;
    return (
      <div className="d-flex justify-content-center mt-5">
        <div>
          <div className="d-flex justify-content-center">
            <h1>{emotion.name}</h1>
          </div>
          {emotion.description}
        </div>
      </div>
    );
  }
}

export default SingleEmotion;
