import React, { Component } from "react";
import { ExamineProps } from "../Helpers/Types/PropTypes";

class Examine extends Component<ExamineProps> {
  render(): JSX.Element {
    const { user, loginClickEvent } = this.props;
    return (
      <div className="d-flex justify-content-center m-5">
        {!user && (
          <div className="text-center welcome-container">
            <h1>view your emotion dashboard</h1>
            <h3 className="mb-5">
              dive deep into what emotions make up your days
            </h3>
            <h3 className="mb-3">sign in to get started</h3>
            <button className="sign-in-circle" onClick={loginClickEvent}>
              sign in
            </button>
          </div>
        )}
        {user && <h1>examine</h1>}
      </div>
    );
  }
}

export default Examine;
