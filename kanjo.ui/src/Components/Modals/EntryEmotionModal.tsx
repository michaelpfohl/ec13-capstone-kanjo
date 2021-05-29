import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import { EntryEmotionProps } from "../../Helpers/Types/EntryEmotionTypes";

const EmotionModal = ({ entryEmotion, emotion }: EntryEmotionProps): JSX.Element => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <button className="m-4 entry-emotion-circle" onClick={toggle}>{emotion.name}</button>
      <Modal isOpen={modal} toggle={toggle}>
        <div>
            {entryEmotion.where_Answer}
        </div>
      </Modal>
    </div>
  );
}

export default EmotionModal;