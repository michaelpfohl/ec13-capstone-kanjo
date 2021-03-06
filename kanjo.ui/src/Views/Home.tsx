import React, { Component } from "react";
import { HomeProps } from "../Helpers/Types/PropTypes";
import LineExplosion from '../Components/Sketch/LineExplosion';

class Home extends Component<HomeProps> {
  render(): JSX.Element {
    const { user, loginClickEvent } = this.props;

    return (
      <div>
        <div className="d-flex justify-content-center mb-5">
          <div className="text-center welcome-container bgc-black border-blue color-white">
            {!user && (
              <div>
                <h1 className="logged-out-header">welcome to kanjo</h1>
                <h3 className="mb-5">
                  a self guided exploration into your daily emotions
                </h3>
                <h3 className="mb-3">click the icon below to sign in</h3>
                <button className="sign-in-circle" onClick={loginClickEvent}>
                  <i className="fas fa-sign-in-alt signin-icon"></i>
                </button>
              </div>
            )}
            {user && (
              <div>
                <h1>welcome to kanjo</h1>
                <h3 className="mb-3">
                  a self guided exploration into your daily emotions
                </h3>
                <LineExplosion/>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
