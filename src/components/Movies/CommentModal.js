import React, { useState } from 'react';
import Modal from 'react-modal';

const CommentModal = ({ isOpen, onClose, onSave }) => {
  const [comment, setComment] = useState('');

  const handleSave = () => {
    onSave(comment);
    setComment('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Comment Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '400px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
        },
      }}
    >
      <h2>Dodaj komentarz</h2>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ width: '100%', minHeight: '70px', resize: 'vertical' }}
      />
      <button onClick={handleSave}>Zapisz</button>
    </Modal>
  );
};

export default CommentModal;