import React, { useState } from 'react';
import Modal from 'react-modal';

const ReviewModal = ({ isOpen, onClose, onSave }) => {
  const [review, setReview] = useState('');
  const [grade, setGrade] = useState('');
  const handleSave = () => {
    const res = {
      "author": "ja",
      "type":"pro",
      "content": review,
      "grade": grade
    }
    onSave(res);
    setReview('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Review Modal"
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
      <h2>Dodaj recenzje</h2>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
      />
      <div>
        <label>
          Ocena
        </label>
      <select value={grade}
        onChange={(e) => setGrade(e.target.value)}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </select>
      </div>
      <button onClick={handleSave}>Dodaj</button>
    </Modal>
  );
};

export default ReviewModal;