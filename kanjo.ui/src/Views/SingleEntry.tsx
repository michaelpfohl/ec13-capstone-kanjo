import React, { Component } from "react";
import { Entry, EntryProps } from "../Helpers/Types/EntryTypes";
import entryData from "../Helpers/Data/entryData";
import EntryForm from "../Components/Forms/EntryForm";

type SingleEntryState = {
  entry: Entry | null;
};

class SingleEntry extends Component<EntryProps> {
  state: SingleEntryState = {
    entry: null,
  };

  componentWillMount(): void {
    const entryId = this.props.match.params.id;
    entryData.getEntry(entryId).then((response) => {
      this.setState({ entry: response });
    });
  }

  render(): JSX.Element {
    const { entry } = this.state;
    const { user } = this.props;
    return (
      <div className="d-flex justify-content-center m-5">
        <EntryForm user={user} entry={entry} todaysEntry={false} />
      </div>
    );
  }
}

export default SingleEntry;
