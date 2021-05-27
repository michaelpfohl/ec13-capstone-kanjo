import React, { Component } from "react";
import { Emotion } from "../Helpers/Types/EmotionTypes";
import emotionData from "../Helpers/Data/emotionData";
import EmotionCard from "../Components/Cards/EmotionCard";
import { User } from "../Helpers/Types/UserTypes";
import EmotionModal from "../Components/Modals/EmotionModal";

type EmotionsProps = {
  user: User | null;
};

class Emotions extends Component<EmotionsProps> {
  state = {
    emotions: [],
  };

  componentDidMount(): void {
    const { user } = this.props;
    emotionData.getEmotions(user?.id).then((response) => {
      this.setState({ emotions: response });
    });
  }

  onUpdate = (): void => {
    const { user } = this.props;
    emotionData.getEmotions(user?.id).then((response) => {
      this.setState({ emotions: response });
      console.log("yes it ran", response);
    });
  }

  render(): JSX.Element {
    const { emotions } = this.state;
    const { user } = this.props;
    const emotionCard = (emotion: Emotion): JSX.Element => {
      return <EmotionCard key={emotion.id} emotion={emotion} />;
    };
    const cards = emotions.map(emotionCard);
    return (
      <div className="d-flex justify-content-center m-5">
        <div>
          <div className="d-flex justify-content-center">
            <h1>emotion</h1>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <EmotionModal user={user} onUpdate={this.onUpdate}/>
          </div>
          <div className="d-flex container justify-content-around flex-wrap">
            {cards}
          </div>
        </div>
      </div>
    );
  }
}

export default Emotions;
