import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import API_URL from './config';

const DeleteModal = ({ show, handleClose, title, url, entityId, onDelete }) => {
  const handleDelete = async () => {
    await axios.post(`${API_URL}${url}${entityId}`);
    onDelete();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Usuń {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Jesteś pewien że chcesz usunąc film
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Anuluj
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Usuń
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;