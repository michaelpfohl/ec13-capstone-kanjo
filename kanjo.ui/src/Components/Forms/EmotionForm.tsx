import React, { Component } from "react";
import { EmotionProps } from "../../Helpers/Types/EmotionTypes";
import emotionData from '../../Helpers/Data/emotionData';

class EmotionForm extends Component<EmotionProps> {
  state = {
    id: this.props.emotion?.id || null,
    name: this.props.emotion?.name || null,
    user_Id: this.props.emotion?.user_Id || null,
    description: this.props.emotion?.description || null,
    active: this.props.emotion?.description || null,
  };
  
  componentDidMount(): void {
    this.setState({ user_Id: this.props.user?.id })
  }

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const emotion = {
      name: this.state.name,
      user_Id: this.state.user_Id,
      description: this.state.description,
    };
    if (this.state.id === null) {
        emotionData.addEmotion(emotion).then(() => {
            this.props.toggle();
            this.props.onUpdate();
        });
    }
  };

  render(): JSX.Element {
    return (
      <div className="d-flex justify-content-center">
        <div className="p-3">
          <div className="d-flex justify-content-center add-emotion-input-container">
            <form onSubmit={this.handleSubmit} className="add-emotion-form">
              <div>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="name"
                  className={`form-control-lg m-2 modal-input`}
                  required
                />
              </div>
              <div className="">
                <textarea
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="description"
                  className={`form-control-lg m-2 modal-input`}
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <button className="submit-new-emotion-button form-button form-button-text mt-1 mb-1">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EmotionForm;
