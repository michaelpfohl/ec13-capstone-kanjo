import React, { Component } from "react";
import emotionData from "../Helpers/Data/emotionData";
import { Emotion, EmotionProps } from "../Helpers/Types/EmotionTypes";

type SingleEmotionState = {
  emotion: Emotion;
};

class SingleEmotion extends Component<EmotionProps> {
  state: SingleEmotionState = {
    emotion: this.props.location.state.emotion,
  };

  componentDidMount = (): void => {
    const { emotion } = this.state;
    emotionData.getEmotionById(emotion.id).then((response) => {
      this.setState({ emotion: response });
    })
  };

  render(): JSX.Element {
    const { emotion } = this.state;
    return (
      <div className="d-flex m-auto justify-content-center bgc-black mt-5 color-white border-blue single-emotion-container">
        <div className="mb-4">
          <div className="d-flex justify-content-center mt-4">
            <h1>• {emotion.name} •</h1>
          </div>
          {emotion.description}
        </div>
      </div>
    );
  }
}

export default SingleEmotion;
