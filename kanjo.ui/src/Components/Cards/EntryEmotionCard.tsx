import React, { Component } from 'react';
import { EntryEmotionProps } from '../../Helpers/Types/EntryEmotionTypes';
import { Emotion } from '../../Helpers/Types/EmotionTypes';
import emotionData from '../../Helpers/Data/emotionData';
import EntryEmotionModal from '../Modals/EntryEmotionModal';

type EntryEmotionCardState = {
    emotion: Emotion;
}

class EntryEmotionCard extends Component<EntryEmotionProps> {
    state: EntryEmotionCardState = {
        emotion: {}
    }

    componentDidMount(): void {
        emotionData.getEmotionById(this.props.entryEmotion.emotion_Id).then((response) => {
            this.setState({ emotion: response})
        })
    }

    render(): JSX.Element {
        const { entryEmotion, background } = this.props;
        const { emotion } = this.state;
        return (
           <EntryEmotionModal entryEmotion={entryEmotion} emotion={emotion} background={background}/>
        )
    }
}

export default EntryEmotionCard;
