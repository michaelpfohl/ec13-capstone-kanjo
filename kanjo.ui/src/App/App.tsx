import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import firebase from "firebase/app";
import fbConnection from "../Helpers/fbConnection";
import Routes from "../Helpers/routes";
import Navigation from "../Components/Navbar";
import { User } from "../Helpers/Types/UserTypes";
import userData from '../Helpers/Data/userData';

fbConnection();

type AppState = {
  user?: User | boolean;
}

class App extends Component<AppState> {
  state: AppState = {
    user: null,
  };

  removeListener = (noop: void): void => noop;

  componentDidMount(): void {
    this.removeListener = firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        user.getIdToken().then((token: string) => sessionStorage.setItem("token", token));
        userData.getUserByFirebaseUid(user.uid).then((response) => {
          this.setState({ user: response });
        });
      } else {
        this.setState({ user: false });
      }
    });
  }

  render(): JSX.Element {
    const { user } = this.state;
    return (
      <Router>
        <Navigation user={user}/>
        <Routes user={user}/>
      </Router>
    );
  }
}

export default App;
