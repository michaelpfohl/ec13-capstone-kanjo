import React, { Component } from "react";
import { Entry } from "../../Helpers/Types/EntryTypes";
import entryEmotionData from "../../Helpers/Data/entryEmotionData";
import { Link } from "react-router-dom";

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
        <td>
          <Link to={{ pathname: `/single-entry/${entry.id}` }}>
            <button className="hidden-btn">
              <i className="fas fa-eye circle-icon"></i>
            </button>
          </Link>
        </td>
      </tr>
    );
  }
}

export default EntryRow;
