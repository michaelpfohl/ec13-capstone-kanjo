import React, { Component } from "react";
import { EntryProps } from "../Helpers/Types/EntryTypes";
import EntryForm from "../Components/Forms/EntryForm";

class SingleEntry extends Component<EntryProps> {
  render(): JSX.Element {
    const entryId = this.props.match.params.id;
    const { user } = this.props;
    return (
      <div className="d-flex justify-content-center m-5">
        <EntryForm user={user} entryId={entryId} todaysEntry={false} />
      </div>
    );
  }
}

export default SingleEntry;
