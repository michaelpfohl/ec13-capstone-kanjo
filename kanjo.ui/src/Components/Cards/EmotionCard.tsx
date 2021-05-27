import React, { Component } from 'react';
import { Emotion } from '../../Helpers/Types/EmotionTypes';

type EmotionCardProps = {
    emotion: Emotion;
}

class EmotionCard extends Component<EmotionCardProps> {
    render(): JSX.Element {
        const { emotion } = this.props;
        return (
            <div className="emotion-card">
                {emotion.name}
            </div>
        )
    }
}

export default EmotionCard;
