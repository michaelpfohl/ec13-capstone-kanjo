import React, { Component } from "react";

import { EntryProps } from "../../Helpers/Types/EntryTypes";
import { Emotion } from "../../Helpers/Types/EmotionTypes";
import { EntryEmotion } from "../../Helpers/Types/EntryEmotionTypes";

import emotionData from "../../Helpers/Data/emotionData";
import entryData from "../../Helpers/Data/entryData";
import entryEmotionData from "../../Helpers/Data/entryEmotionData";

import EntryEmotionCard from "../../Components/Cards/EntryEmotionCard";

class EntryForm extends Component<EntryProps> {
  state = {
    id: this.props.entry?.id || null,
    user_Id: this.props.entry?.user_Id || null,
    date: this.props.entry?.date || null,
    active: this.props.entry?.description || null,
    emotions: [],
    emotion: "",
    emotionName: "",
    entryEmotions: [],
    flow_step: 0,
    where_Answer: "",
    who_Answer: "",
    when_Answer: "",
    how_Answer: "",
    why_Answer: "",
    prompt: false,
  };

  componentDidMount(): void {
    const { user } = this.props;
    this.setState({ user_Id: user.id });
    emotionData.getEmotions(user.id).then((response) => {
      this.setState({ emotions: response });
    });

    const today = new Date();
    entryData
      .getMostRecent(user.id)
      .then((response) => {
        const date = new Date(response.data.date);
        if (date.getDate() === today.getDate()) {
          this.setState({
            id: response.data.id,
            date: date,
            active: response.data.active,
          });
        }
      })
      .then(() => {
        entryEmotionData
          .getEntryEmotionsByEntryId(this.state.id)
          .then((response) => {
            this.setState({ entryEmotions: response });
          });
      });
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
    }
  };

  handleEntryEmotionSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const entryEmotion = {
      entry_Id: this.state.id,
      emotion_Id: Number(this.state.emotion),
      where_Answer: this.state.where_Answer,
      when_Answer: this.state.when_Answer,
      who_Answer: this.state.who_Answer,
      how_Answer: this.state.how_Answer,
      why_Answer: this.state.why_Answer,
    };
    entryEmotionData.addEntryEmotion(entryEmotion).then(() => {
      window.location.reload();
    });
  };

  handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  nextFlowStep = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { flow_step, emotion } = this.state;
    this.setState({
      flow_step: flow_step + 1,
      prompt: false,
    });
    emotionData.getEmotionById(Number(emotion)).then((response) => {
      this.setState({ emotionName: response.name });
    });
  };

  backFlowStep = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { flow_step } = this.state;
    this.setState({
      flow_step: flow_step - 1,
    });
  };

  backPromptStep = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({
      prompt: false,
    });
  };

  prompt = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { emotions } = this.state;
    const emotionIndex = Math.floor(Math.random() * emotions.length);
    const emotion: Emotion = emotions[emotionIndex];
    emotionData.getEmotionById(emotion.id).then((response) => {
        this.setState({
            emotion: response.id,
            emotionName: response.name,
            prompt: true,
        })
    })
  };

  render(): JSX.Element {
    const {
      id,
      emotions,
      date,
      flow_step,
      entryEmotions,
      emotionName,
      prompt,
    } = this.state;
    const options = (emotion: Emotion): JSX.Element => {
      return (
        <option key={emotion.id} value={emotion.id}>
          {emotion.name}
        </option>
      );
    };
    const circles = (entryEmotion: EntryEmotion): JSX.Element => {
      return (
        <EntryEmotionCard entryEmotion={entryEmotion} key={entryEmotion.id} />
      );
    };
    const emotionDropdown = emotions.map(options);
    const entryEmotionCircles = entryEmotions.map(circles);
    return (
      <div className="entry-container">
        <div>
          {!id && (
            <div>
              <h1>start an entry for the day</h1>
              <div className="d-flex justify-content-center mt-4 mb-4">
                <form onSubmit={this.handleEntrySubmit}>
                  <button className="new-entry-circle">new entry</button>
                </form>
              </div>
            </div>
          )}
          {id && flow_step === 0 && !prompt && (
            <div className="text-center">
              <h1 className="mb-4">{date.toDateString()}</h1>
              <div className="d-flex justify-content-around">
                <div className="mx-5">
                  <form onSubmit={this.nextFlowStep}>
                    <select
                      name="emotion"
                      onChange={this.handleChange}
                      value={this.state.emotion}
                      required
                      className="emotion-dropdown"
                    >
                      <option selected disabled hidden value="">
                        select an emotion
                      </option>
                      {emotionDropdown}
                    </select>
                    <button>continue</button>
                  </form>
                </div>
                <form className="mx-5" onSubmit={this.prompt}>
                  <button>prompt an emotion</button>
                </form>
              </div>
              <div className="d-flex justify-content-center flex-wrap">
                {entryEmotionCircles}
              </div>
            </div>
          )}
          {prompt && (
            <div>
              <h2>did you feel {emotionName} today?</h2>
              <div className="d-flex justify-content-around">
                <form onSubmit={this.backPromptStep}>
                  <button>back</button>
                </form>
                <form onSubmit={this.prompt}>
                  <button>new emotion</button>
                </form>
                <form onSubmit={this.nextFlowStep}>
                  <button>continue</button>
                </form>
              </div>
            </div>
          )}
          {id && flow_step === 1 && (
            <div>
              <h2>where were you when you felt {emotionName} today?</h2>
              <textarea
                name="where_Answer"
                value={this.state.where_Answer}
                onChange={this.handleChange}
                className={`form-control-lg m-2 modal-input`}
                required
              />
              <div className="d-flex justify-content-between">
                <form onSubmit={this.backFlowStep}>
                  <button>back</button>
                </form>
                <form onSubmit={this.nextFlowStep}>
                  <button>next</button>
                </form>
              </div>
            </div>
          )}
          {id && flow_step === 2 && (
            <div>
              <h2>who caused you to feel {emotionName} today?</h2>
              <textarea
                name="who_Answer"
                value={this.state.who_Answer}
                onChange={this.handleChange}
                className={`form-control-lg m-2 modal-input`}
                required
              />
              <div className="d-flex justify-content-between">
                <form onSubmit={this.backFlowStep}>
                  <button>back</button>
                </form>
                <form onSubmit={this.nextFlowStep}>
                  <button>next</button>
                </form>
              </div>
            </div>
          )}
          {id && flow_step === 3 && (
            <div>
              <h2>when did you feel {emotionName} today?</h2>
              <textarea
                name="when_Answer"
                value={this.state.when_Answer}
                onChange={this.handleChange}
                className={`form-control-lg m-2 modal-input`}
                required
              />
              <div className="d-flex justify-content-between">
                <form onSubmit={this.backFlowStep}>
                  <button>back</button>
                </form>
                <form onSubmit={this.nextFlowStep}>
                  <button>next</button>
                </form>
              </div>
            </div>
          )}
          {id && flow_step === 4 && (
            <div>
              <h2>
                use emotive language to describe what your {emotionName} was
                like today
              </h2>
              <textarea
                name="how_Answer"
                value={this.state.how_Answer}
                onChange={this.handleChange}
                className={`form-control-lg m-2 modal-input`}
                required
              />
              <div className="d-flex justify-content-between">
                <form onSubmit={this.backFlowStep}>
                  <button>back</button>
                </form>
                <form onSubmit={this.nextFlowStep}>
                  <button>next</button>
                </form>
              </div>
            </div>
          )}
          {id && flow_step === 5 && (
            <div>
              <h2>why do you think you felt {emotionName} today?</h2>
              <textarea
                name="why_Answer"
                value={this.state.why_Answer}
                onChange={this.handleChange}
                className={`form-control-lg m-2 modal-input`}
                required
              />
              <div className="d-flex justify-content-between">
                <form onSubmit={this.backFlowStep}>
                  <button>back</button>
                </form>
                <form onSubmit={this.nextFlowStep}>
                  <button>next</button>
                </form>
              </div>
            </div>
          )}
          {id && flow_step === 6 && (
            <div>
              <div className="d-flex justify-content-between">
                <form onSubmit={this.backFlowStep}>
                  <button>back</button>
                </form>
                <form onSubmit={this.handleEntryEmotionSubmit}>
                  <button>submit emotion</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default EntryForm;
