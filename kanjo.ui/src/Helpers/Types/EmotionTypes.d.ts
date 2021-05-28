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
        location: RouteComponentProps["location"],
        onUpdate?: () => void;
    }
}

export { Emotion, EmotionProps };
