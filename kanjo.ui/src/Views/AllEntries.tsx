import React, { Component } from "react";
import { EntryProps } from "../Helpers/Types/PropTypes";

class AllEntries extends Component<EntryProps> {
  render(): JSX.Element {
    const { user, loginClickEvent } = this.props;
    return (
        <div className="d-flex justify-content-center">
            <h1>All Entries</h1>
        </div>
    )
  }
}

export default AllEntries;