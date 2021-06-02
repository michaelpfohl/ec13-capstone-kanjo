import React, { Component } from "react";
import { EntryProps } from "../Helpers/Types/PropTypes";
import { Entry } from "../Helpers/Types/EntryTypes";
import entryData from "../Helpers/Data/entryData";
import EntryRow from "../Components/Tables/EntryRow";
import { Table } from "reactstrap";

class AllEntries extends Component<EntryProps> {
  state = {
    entries: [],
  };

  componentDidMount(): void {
    const { user } = this.props;
    entryData.getAllEntriesByUser(user?.id).then((response) => {
      this.setState({ entries: response });
    });
  }

  entryRow = (entry: Entry): JSX.Element => {
    return (
      <EntryRow key={entry.id} entry={entry}/>
    );
  };

  render(): JSX.Element {
    const { entries } = this.state;
    const rows = entries.map(this.entryRow);
    return (
      <div className="d-flex justify-content-center">
        <div className="container mt-5">
          <Table bordered className="text-center">
            <thead >
              <th>date</th>
              <th># of emotions</th>
              <th>details</th>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default AllEntries;
