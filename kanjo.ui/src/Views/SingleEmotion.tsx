import React, { Component } from 'react';
import userData from '../Helpers/Data/userData';
import { Emotion, EmotionProps } from '../Helpers/Types/EmotionTypes';

type SingleEmotionState = {
    emotion: Emotion;
}

class SingleEmotion extends Component<EmotionProps> {
    state: SingleEmotionState = {
        emotion: this.props.location.state.emotion,
    }

    componentDidMount = (): void => {
        console.log(this.props);
    }

    render(): JSX.Element {
        // const { emotion } = this.state;
        return (
            <div>
                {/* {emotion.description}; */}
            </div>
        )
    }
}

export default SingleEmotion;
