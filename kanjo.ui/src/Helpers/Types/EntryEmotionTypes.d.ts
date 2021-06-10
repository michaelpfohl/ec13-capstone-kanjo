declare module 'EntryEmotionTypes' {
    interface EntryEmotion {
        id: number;
        entry_Id: number;
        emotion_Id: number;
        where_Answer: string;
        when_Answer: string;
        who_Answer: string;
        how_Answer: string;
        why_Answer: string;
    }

    type EntryEmotionProps = {
        entryEmotion: EntryEmotion;
        emotion: Emotion;
        background: number;
    }
}

export { EntryEmotion, EntryEmotionProps };
