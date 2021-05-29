import React, { Component } from "react";
import { EntryProps } from "../../Helpers/Types/EntryTypes";
import { Emotion } from "../../Helpers/Types/EmotionTypes";
import emotionData from "../../Helpers/Data/emotionData";
import entryData from "../../Helpers/Data/entryData";

class EntryForm extends Component<EntryProps> {
  state = {
    id: this.props.entry?.id || null,
    user_Id: this.props.entry?.user_Id || null,
    date: this.props.entry?.date || null,
    active: this.props.entry?.description || null,
    emotions: [],
  };

  componentDidMount(): void {
    const { user } = this.props;
    this.setState({ user_Id: user.id });
    emotionData.getEmotions(user.id).then((response) => {
      this.setState({ emotions: response });
    });

    const today = new Date();
    entryData.getMostRecent(user.id).then((response) => {
        const date = new Date(response.data.date);
        if (date.getDate() === today.getDate()){
            this.setState({
                id: response.data.id,
                date: date,
                active: response.data.active,
              }); 
        }
    })
  }

  handleEntrySubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const entry = {
      user_Id: this.state.user_Id,
    };
    if (this.state.id === null) {
      entryData.addEntry(entry).then(() => {
        entryData.getMostRecent(this.state.user_Id).then((response) => {
          const date = new Date(response.data.date);
          this.setState({
            id: response.data.id,
            date: date,
            active: response.data.active,
          });
        });
      });
    } else {
      // edit entry
    }
  };

  render(): JSX.Element {
    const { id, emotions } = this.state;
    const options = (emotion: Emotion): JSX.Element => {
      return (
        <option key={emotion.id} value={emotion.id}>
          {emotion.name}
        </option>
      );
    };
    const emotionDropdown = emotions.map(options);
    return (
      <div>
        <div>
          {!id && (
            <div>
              <h1>start an entry for the day</h1>
              <div className="d-flex justify-content-center mt-4 mb-4">
                <form onSubmit={this.handleEntrySubmit}>
                  <button>new entry</button>
                </form>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-around">
            <div>
              <h4>choose emotion</h4>
              <select name="emotion" id="">
                <option selected disabled hidden value="">
                  select an emotion
                </option>
                {emotionDropdown}
              </select>
              <button>continue</button>
            </div>
            <div>
              <button>prompt an emotion</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EntryForm;
