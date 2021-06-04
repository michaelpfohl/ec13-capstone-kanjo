import React, { Component } from "react";
import { EntryProps } from "../Helpers/Types/PropTypes";
import { Entry } from "../Helpers/Types/EntryTypes";
import entryData from "../Helpers/Data/entryData";
import EntryRow from "../Components/Tables/EntryRow";
import { Table } from "reactstrap";

class AllEntries extends Component<EntryProps> {
  state = {
    entries: [],
    startDate: "",
    endDate: "",
  };

  componentDidMount(): void {
    const { user } = this.props;
    entryData.getAllEntriesByUser(user?.id).then((response) => {
      this.setState({ entries: response });
    });
    const startDate = new Date(user?.user_Created_Date);
    const endDate = new Date();
    if (user?.user_Created_Date) {
      this.setState({
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    const { user } = this.props;
    const { startDate, endDate } = this.state;
    e.preventDefault();
    entryData
      .getAllEntriesByUserWithinDateRange(user.id, startDate, endDate)
      .then((response) => {
        this.setState({ entries: response });
      });
  };

  entryRow = (entry: Entry): JSX.Element => {
    return <EntryRow key={entry.id} entry={entry} />;
  };

  render(): JSX.Element {
    const { entries, startDate, endDate } = this.state;
    const rows = entries.map(this.entryRow);
    return (
      <div className="d-flex justify-content-center">
        <div className="container mt-5">
          <form
            onSubmit={this.handleSubmit}
            className="d-flex justify-content-around text-center"
          >
            <div>
              <label className="d-block" htmlFor="start">
                start date:
              </label>
              <input
                onChange={this.handleChange}
                type="date"
                id="start"
                name="startDate"
                value={startDate}
                min="2018-01-01"
                max="2999-12-31"
              />
            </div>
            <button>filter</button>
            <div>
              <label className="d-block" htmlFor="end">
                end date:
              </label>
              <input
                onChange={this.handleChange}
                type="date"
                id="end"
                name="endDate"
                value={endDate}
                min="2018-01-01"
                max="2999-12-31"
              />
            </div>
          </form>
          <Table bordered className="text-center">
            <thead>
              <tr>
                <th>date</th>
                <th># of emotions</th>
                <th>details</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default AllEntries;
