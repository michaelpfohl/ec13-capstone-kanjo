declare module 'EmotionTypes' {
    interface Emotion {
        id: number;
        name: string;
        user_Id: number;
        description: string;
        active: boolean;
        frequency?: number;
        strokeWeight?: number;
        strokeAlpha?: number;
        maxSpeed?: number;
        frameRate?: number;
        scale?: number;
        numberOfParticles?: number;
        magnetism?: number;
        increment?: number;
        zOffset?: number;
    }

    type EmotionProps = {
        user: User;
        location: RouteComponentProps["location"],
        onUpdate?: () => void;
    }
}

export { Emotion, EmotionProps };
