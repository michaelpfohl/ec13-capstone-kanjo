import React, { Component } from "react";
import { EntryProps } from "../Helpers/Types/PropTypes";
import EntryForm from "../Components/Forms/EntryForm";

class Entry extends Component<EntryProps> {
  render(): JSX.Element {
    const { user, loginClickEvent } = this.props;
    return (
      <div className="d-flex justify-content-center m-5">
        <div className="text-center welcome-container bgc-green color-white">
          {!user && (
            <div>
              <h1 className="logged-out-header">create an entry</h1>
              <h3 className="mb-5">
                begin a daily entry and catalogue your emotions
              </h3>
              <h3 className="mb-3">sign in to get started</h3>
              <button className="sign-in-circle" onClick={loginClickEvent}>
                <i className="fas fa-sign-in-alt signin-icon"></i>
              </button>
            </div>
          )}
          {user && <EntryForm user={user} todaysEntry={true} />}
        </div>
      </div>
    );
  }
}

export default Entry;
