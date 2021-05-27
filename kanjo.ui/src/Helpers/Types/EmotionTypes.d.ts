declare module 'EmotionTypes' {
    interface Emotion {
        id: number;
        name: string;
        user_Id: number;
        description: string;
        active: boolean;
    }

    type EmotionProps = {
        user: User;
        onUpdate?: () => void;
    }
}

export { Emotion, EmotionProps };
