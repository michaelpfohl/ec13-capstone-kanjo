import React, { useState } from "react";
import { Modal } from "reactstrap";
import { EntryEmotionProps } from "../../Helpers/Types/EntryEmotionTypes";
import EntryEmotionForm from "../Forms/EntryEmotionForm";

const EmotionModal = ({
  entryEmotion,
  emotion,
  background,
}: EntryEmotionProps): JSX.Element => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <button className={`m-4 entry-emotion-circle background-${background}`} onClick={toggle}>
        <div className="entry-emotion-name-container">{emotion.name}</div>
      </button>
      <Modal isOpen={modal} toggle={toggle} contentClassName="entry-emotion-modal-container">
          <EntryEmotionForm entryEmotion={entryEmotion} emotion={emotion} />
      </Modal>
    </div>
  );
};

export default EmotionModal;
