import { User } from './UserTypes';

declare module "PropTypes" {
  type HomeProps = {
    user: User | null;
    loginClickEvent: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => void;
  };

  type EntryProps = {
    user: User | null;
    loginClickEvent: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => void;
  };

  type RoutesProps = {
    user: User | null;
    loginClickEvent: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
  };
}

export { HomeProps, EntryProps, RoutesProps };
