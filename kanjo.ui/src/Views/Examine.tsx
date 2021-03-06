import React, { Component } from "react";
import { ExamineProps } from "../Helpers/Types/PropTypes";
import emotionData from "../Helpers/Data/emotionData";
import { Emotion } from "../Helpers/Types/EmotionTypes";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
class Examine extends Component<ExamineProps> {
  state = {
    emotions: [],
    startDate: "",
    endDate: "",
  };

  componentDidMount(): void {
    const { user } = this.props;
    emotionData.getAllEmotionsWithEntries(user?.id).then((response) => {
      this.setState({ emotions: response });
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
    emotionData
      .getEmotionsWithFrequencyByDateRange(user?.id, startDate, endDate)
      .then((response) => {
        console.log(response);
        this.setState({ emotions: response });
      });
  };

  emotionRow = (emotion: Emotion): JSX.Element => {
    return (
      <tr key={emotion.id}>
        <td>{emotion.name}</td>
        <td>{emotion.frequency}</td>
        <td>
          <Link
            to={{
              pathname: "/single-emotion",
              state: {
                emotion: emotion,
              },
            }}
          >
            <button className="hidden-btn">
              <i className="fas fa-eye circle-icon"></i>
            </button>
          </Link>
        </td>
      </tr>
    );
  };

  render(): JSX.Element {
    const { user, loginClickEvent } = this.props;
    const { emotions, startDate, endDate } = this.state;
    const emotionRows = emotions.map(this.emotionRow);
    return (
      <div className="d-flex justify-content-center m-5">
        {!user && (
          <div className="text-center welcome-container bgc-black border-blue color-white">
            <h1 className="logged-out-header">view your emotion dashboard</h1>
            <h3 className="mb-5">
              dive deep into what emotions make up your days
            </h3>
            <h3 className="mb-3">sign in to get started</h3>
            <button className="sign-in-circle" onClick={loginClickEvent}>
              <i className="fas fa-sign-in-alt signin-icon"></i>
            </button>
          </div>
        )}
        {user && (
          <div className="mt-5">
            <form
              onSubmit={this.handleSubmit}
              className="d-flex justify-content-around text-center mb-4"
            >
              <div>
                <label
                  className="d-block filter-header color-blue bold"
                  htmlFor="start"
                >
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
                  className="filter-input"
                />
              </div>
              <button className="hidden-btn filter-icon">
                <i className="fas fa-filter circle-icon"></i>
              </button>{" "}
              <div>
                <label
                  className="d-block filter-header color-blue bold"
                  htmlFor="end"
                >
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
                  className="filter-input"
                />
              </div>
            </form>
            <div>
              <Table bordered className="text-center">
                <thead>
                  <tr>
                    <th>emotion</th>
                    <th>frequency</th>
                    <th>details</th>
                  </tr>
                </thead>
                <tbody>
                  {emotionRows}
                  {!emotionRows.length && (
                    <tr>
                      <td>none</td>
                      <td>within</td>
                      <td>range</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Examine;
