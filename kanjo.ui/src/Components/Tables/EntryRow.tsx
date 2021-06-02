import React, { Component } from "react";
import { Entry } from "../../Helpers/Types/EntryTypes";
import entryEmotionData from "../../Helpers/Data/entryEmotionData";

type EntryRowProps = {
  entry: Entry;
};

class EntryRow extends Component<EntryRowProps> {
  state = {
    entryEmotions: [],
  };

  componentDidMount(): void {
    const { entry } = this.props;
    entryEmotionData.getEntryEmotionsByEntryId(entry.id).then((response) => {
      this.setState({ entryEmotions: response });
    });
  }
  render(): JSX.Element {
    const { entry } = this.props;
    const { entryEmotions } = this.state;
    const date = new Date(entry.date);
    return (
        <tr>
        <td>{date.toDateString()}</td>
        <td>{entryEmotions.length}</td>
        <td><button>view details</button></td>
      </tr>
    );
  }
}

export default EntryRow;
