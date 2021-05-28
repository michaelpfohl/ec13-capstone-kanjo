import React, { Component } from "react";
import { HomeProps } from "../Helpers/Types/PropTypes";

class Home extends Component<HomeProps> {
  render(): JSX.Element {
    const { user, loginClickEvent } = this.props;
    return (
      <div>
        {!user && (
          <div className="d-flex justify-content-center m-5">
            <div className="text-center welcome-container">
              <h1>welcome to kanjo</h1>
              <h3 className="mb-5">
                a self guided exploration into your daily emotions
              </h3>
              <h3 className="mb-3">click the icon below to sign in</h3>
              <button className="sign-in-circle" onClick={loginClickEvent}>
                sign in
              </button>
            </div>
          </div>
        )}
        {user && (
          <div className="d-flex justify-content-center m-5">
            <div className="text-center welcome-container">
              <h1>welcome to kanjo</h1>
              <h3 className="mb-5">
                a self guided exploration into your daily emotions
              </h3>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
