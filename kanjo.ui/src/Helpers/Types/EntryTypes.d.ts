import { User } from './UserTypes';

declare module 'EntryTypes' {
    interface Entry {
        id: number,
        user_Id: number,
        date: Date,
        active: boolean,
    }

    type EntryProps = {
        entry?: Entry,
        user: User,
        loginClickEvent?: (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ) => void;
    }
}

export { Entry, EntryProps };
