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
}

export { EntryEmotion };
