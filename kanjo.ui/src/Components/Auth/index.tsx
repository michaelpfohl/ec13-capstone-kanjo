import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { User } from "../../Helpers/Types/UserTypes";
import userData from "../../Helpers/Data/userData";

type AuthProps = {
  user: User | null;
};

class Auth extends Component<AuthProps> {
  loginClickEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((user) => {
        if (user.additionalUserInfo?.isNewUser) {
          const userInfo = {
            name: user.user?.displayName,
            profile_Picture: user.user?.photoURL,
            firebase_Uid: user.user?.uid,
            email: user.user?.email,
          };
          userData.addNewUser(userInfo);
          window.location.href = "/";
        }
      });
  };

  logoutClickEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    window.sessionStorage.removeItem("token");
    firebase.auth().signOut();
    window.location.href = "/";
  };

  logInOrOut = (): JSX.Element => {
    const { user } = this.props;
    if (user == false) {
      return (
        <div className="d-flex justify-content-center">
          <div className="mx-4">
            <button
              className="hidden-btn"
              onClick={this.loginClickEvent}
            >
              <i className="fas fa-sign-in-alt circle-icon"></i>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center">
          <div className="auth-container d-flex align-items-center">
            <p className={`m-auto greeting-text color-white`}>
              Hello, {user?.name}!
            </p>
            <div className="mx-4">
              <button
                className="hidden-btn"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Log Out"
                onClick={this.logoutClickEvent}
              >
                <i className="fas fa-sign-out-alt signout-icon circle-icon"></i>
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  render(): JSX.Element {
    return (
      <div className="d-flex justify-content-center">{this.logInOrOut()}</div>
    );
  }
}

export default Auth;
