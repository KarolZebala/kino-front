import React, { useState } from 'react';
import axios from 'axios';
const DirectorForm = ({ isOpen, onClose, onAddMovie }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleAddMovie = async () => {
    if (name && surname) {
      const newDirector = {
        "directorName": name,
        "directorSurname": surname
       };
      const response = await axios.post('https://localhost:44389/Director/create', newDirector);
      console.log(response)
      onClose();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <h2>Dodaj reżysera</h2>
      <label>
        Imie:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Nazwisko:
        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </label>
      <button onClick={handleAddMovie}>Dodaj reżysera</button>
      <button onClick={onClose}>Anauluj</button>
    </div>
  );
};

export default DirectorForm;