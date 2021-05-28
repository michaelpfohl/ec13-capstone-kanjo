import React, { Component } from "react";
import { EntryProps } from '../Helpers/Types/PropTypes';

class Entry extends Component<EntryProps> {
  render(): JSX.Element {
    const { user, loginClickEvent } = this.props;
    return (
      <div className="d-flex justify-content-center m-5">
        { !user && (
          <div className="text-center welcome-container">
            <h1>create an entry</h1>
            <h3 className="mb-5">
              begin a daily entry and catalogue your emotions 
            </h3>
            <h3 className="mb-3">sign in to get started</h3>
            <button className="sign-in-circle" onClick={loginClickEvent}>
              sign in
            </button>
          </div>
        )}
        { user && (
          <h1>entry</h1>
        )}
      </div>
    );
  }
}

export default Entry;
