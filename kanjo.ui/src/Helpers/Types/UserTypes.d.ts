declare module 'UserTypes' {
    interface User {
        id: number;
        name: string;
        email: string;
        profile_Picture: string;
        user_Created_Date: string;
        firebase_Uid: string;
        active: boolean;
    }
}

export { User };
