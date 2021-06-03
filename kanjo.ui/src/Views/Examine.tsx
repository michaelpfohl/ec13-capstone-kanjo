import React, { Component } from "react";
import { ExamineProps } from "../Helpers/Types/PropTypes";
import emotionData from "../Helpers/Data/emotionData";
import { Emotion } from "../Helpers/Types/EmotionTypes";
import { Table } from "reactstrap";
class Examine extends Component<ExamineProps> {
  state = {
    emotions: [],
  };

  componentDidMount(): void {
    const { user } = this.props;
    emotionData.getEmotions(user?.id).then((response) => {
      this.setState({ emotions: response });
    });
  }

  emotionRow = (emotion: Emotion): JSX.Element => {
    return (
      <tr>
        <td>{emotion.name}</td>
        <td>{emotion.frequency}</td>
        <td><button>details</button></td>
      </tr>
    );
  };

  render(): JSX.Element {
    const { user, loginClickEvent } = this.props;
    const { emotions } = this.state;
    const emotionRows = emotions.map(this.emotionRow);
    return (
      <div className="d-flex justify-content-center m-5">
        {!user && (
          <div className="text-center welcome-container">
            <h1>view your emotion dashboard</h1>
            <h3 className="mb-5">
              dive deep into what emotions make up your days
            </h3>
            <h3 className="mb-3">sign in to get started</h3>
            <button className="sign-in-circle" onClick={loginClickEvent}>
              sign in
            </button>
          </div>
        )}
        {user && (
          <div>
            <h1>examine</h1>
            <div>
              <Table bordered className="text-center">
                <thead>
                  <th>emotion</th>
                  <th>frequency</th>
                  <th>details</th>
                </thead>
                <tbody>{emotionRows}</tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Examine;
