import React, { Component } from "react";
import { EntryEmotionProps } from "../../Helpers/Types/EntryEmotionTypes";
import entryEmotionData from "../../Helpers/Data/entryEmotionData";

class EntryEmotionForm extends Component<EntryEmotionProps> {
  state = {
    id: this.props.entryEmotion?.id,
    active: this.props.entryEmotion?.active,
    emotion_Id: this.props.entryEmotion?.emotion_Id,
    entry_Id: this.props.entryEmotion?.entry_Id,
    where_Answer: this.props.entryEmotion?.where_Answer,
    who_Answer: this.props.entryEmotion?.who_Answer,
    when_Answer: this.props.entryEmotion?.when_Answer,
    how_Answer: this.props.entryEmotion?.how_Answer,
    why_Answer: this.props.entryEmotion?.why_Answer,
  };

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    entryEmotionData.updateEntryEmotion(this.state);
    window.location.reload();
  };

  handleDelete = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ active: false });
    entryEmotionData.deleteEntryEmotion(this.state.id).then(() => {
      console.log(this.state.id);
      window.location.reload();
    });
  };

  render(): JSX.Element {
    const { emotion } = this.props;
    return (
      <div className="text-center">
        <div className="d-flex justify-content-center">
          <h1 className="mb-4">{emotion.name}</h1>
        </div>
        <form className="mb-4 mx-4" onSubmit={this.handleSubmit}>
          <p className="mb-0">
            where were you when you felt {emotion.name} today?
          </p>
          <textarea
            name="where_Answer"
            value={this.state.where_Answer}
            onChange={this.handleChange}
            className={`form-control-lg m-2 modal-input`}
            required
          />
          <p className="mb-0">who caused you to feel {emotion.name} today?</p>

          <textarea
            name="who_Answer"
            value={this.state.who_Answer}
            onChange={this.handleChange}
            className={`form-control-lg m-2 modal-input`}
            required
          />
          <p className="mb-0">when did you feel {emotion.name} today?</p>

          <textarea
            name="when_Answer"
            value={this.state.when_Answer}
            onChange={this.handleChange}
            className={`form-control-lg m-2 modal-input`}
            required
          />
          <p className="mb-0">
            use emotive language to describe what your {emotion.name} was like
            today
          </p>

          <textarea
            name="how_Answer"
            value={this.state.how_Answer}
            onChange={this.handleChange}
            className={`form-control-lg m-2 modal-input`}
            required
          />
          <p className="mb-0">
            why do you think you felt {emotion.name} today?
          </p>

          <textarea
            name="why_Answer"
            value={this.state.why_Answer}
            onChange={this.handleChange}
            className={`form-control-lg m-2 modal-input`}
            required
          />
          <button id="update">update</button>
        </form>
        <form className="mb-4" onSubmit={this.handleDelete}>
            <button>delete</button>
        </form>
      </div>
    );
  }
}

export default EntryEmotionForm;
