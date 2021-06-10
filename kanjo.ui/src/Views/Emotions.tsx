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
    if (user) {
      emotionData.getEmotions(user?.id).then((response) => {
        this.setState({ emotions: response });
      });
    } else {
      emotionData.getPublicEmotions().then((response) => {
        this.setState({ emotions: response });
      });
    }
  }

  onUpdate = (): void => {
    const { user } = this.props;
    emotionData.getEmotions(user?.id).then((response) => {
      this.setState({ emotions: response });
    });
  };

  render(): JSX.Element {
    const { emotions } = this.state;
    const { user } = this.props;
    const emotionCard = (emotion: Emotion, background: number): JSX.Element => {
      return <EmotionCard key={emotion.id} emotion={emotion} background={background}/>;
    };

    const assignBackground = (emotions: Emotion[]) => {
      const cards: Emotion[] = [];
      let counter = 0;
      emotions.forEach((emotion) => {
        counter++;
        if (counter >= 9) counter = 1;
        cards.push(emotionCard(emotion, counter));
      })
      return cards;
    }

    return (
      <div className="d-flex justify-content-center m-5">
        <div>
          {user && (
            <div className="d-flex justify-content-center mt-4">
              <EmotionModal user={user} onUpdate={this.onUpdate} />
            </div>
          )}
          <div className="d-flex container justify-content-around flex-wrap">
            {assignBackground(emotions)}
          </div>
        </div>
      </div>
    );
  }
}

export default Emotions;
