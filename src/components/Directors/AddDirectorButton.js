import React, { useState } from 'react';
import Modal from 'react-modal';
import DirectorForm from './DirectorForm';

const AddDirectorButton = ({ onDirectorMovie }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Dodaj reżysera</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Dodaj reżysera"
      >
        <DirectorForm isOpen={modalIsOpen} onClose={closeModal} onAddDirector={onDirectorMovie} />
      </Modal>
    </div>
  );
};

export default AddDirectorButton;