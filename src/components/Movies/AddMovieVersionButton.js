import React, { useState } from 'react';
import Modal from 'react-modal';
import MovieVersionForm from './MovieVersionForm';

const AddMovieVersionButton = ({ onAddMovieVersion }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Dodaj wersje</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Dodaj wersje"
      >
        <MovieVersionForm isOpen={modalIsOpen} onClose={closeModal} onAddVersionMovie={onAddMovieVersion} />
      </Modal>
    </div>
  );
};

export default AddMovieVersionButton;