import React, { Component } from "react";
import { Emotion } from "../../Helpers/Types/EmotionTypes";
import { Link } from "react-router-dom";

type EmotionCardProps = {
  emotion: Emotion;
  background: number;
};

class EmotionCard extends Component<EmotionCardProps> {
  render(): JSX.Element {
    const { emotion, background } = this.props;
    return (
      <Link
        to={{
          pathname: "/single-emotion",
          state: {
            emotion: emotion,
          },
        }}
      >
        <div className={`emotion-card background-${background} half-border-blue`}>
          <div className="emotion-name-container">
            <div className="emotion-name-text">{emotion.name}</div>
          </div>
        </div>
      </Link>
    );
  }
}

export default EmotionCard;
