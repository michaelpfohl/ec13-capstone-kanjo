import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import EmotionForm from '../Forms/EmotionForm';
import { EmotionProps } from '../../Helpers/Types/EmotionTypes';

const EmotionModal = ({ user, onUpdate }: EmotionProps): JSX.Element => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <button className="mb-4" onClick={toggle}>add new emotion</button>
      <Modal isOpen={modal} toggle={toggle}>
        <EmotionForm user={user} toggle={toggle} onUpdate={onUpdate}/>
      </Modal>
    </div>
  );
}

export default EmotionModal;