import React, { Component } from "react";
import emotionData from "../Helpers/Data/emotionData";
import { Emotion, EmotionProps } from "../Helpers/Types/EmotionTypes";
import PerlinNoise from "../Components/Sketch/PerlinNoise";

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
    });
  };

  render(): JSX.Element {
    const { emotion } = this.state;
    return (
      <div className="d-flex m-auto justify-content-center bgc-black mt-5 mb-5 color-white border-blue single-emotion-container">
        <div className="mb-4">
          <div className="d-flex justify-content-center mt-4 mb-2">
            <h1>• {emotion.name} •</h1>
          </div>
          <div className="mb-4 text-center">{emotion.description}</div>
          {emotion.numberOfParticles && (
            <div className="d-flex justify-content-center">
              <PerlinNoise emotion={emotion} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SingleEmotion;
