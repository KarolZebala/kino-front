import React, { useState } from 'react';
const MovieVersionForm = ({ isOpen, onClose, onAddVersionMovie }) => {
  const [duration, setDuration] = useState('');
  const [soundVersion, setSoundVersion] = useState('');
  const [imageVersion, setImageVersion] = useState('');
  const [languageVersion, setLanguageVersion] = useState('');
  const [hasSubstitles, setHasSubstitles] = useState('');

  const handleAddVersionMovie = async () => {
    if (duration) {
      const newMovie = 
      {
        "duration": duration,
        "soundVersion": soundVersion,
        "imageVersion": imageVersion,
        "languageVerion": languageVersion,
      };
      onAddVersionMovie(newMovie);
      onClose();
    } else {
      alert('Wypełnij czas trwania');
    }
  };
  
  return (
    <div>
      <h2>Dodaj wersje filmu film</h2>
      <label>
        Czas trwania w minutach:
        <input type="number" min={0} value={duration} onChange={(e) => setDuration(e.target.value)} />
      </label>
      <label>
        Wersja dzwiękowa:
        <select value = {soundVersion} onChange={(e) => setSoundVersion(e.target.value)}>
            <option> </option>
            <option value={"Lektor"}>Lektor</option>
            <option value={"Dubbing"}>Dubbing</option>
            <option value={"Orgninal"}>Oryginalna</option>
        </select>
      </label>
      <label>
        Wersja obrazu:
        <select value = {imageVersion} onChange={(e) => setImageVersion(e.target.value)}>
                <option> </option>
                <option value={"2D"}>2D</option>
                <option value={"3D"}>3D</option>
        </select>
      </label>
      <label>
        Język:
        <input type="text" value={languageVersion} onChange={(e) => setLanguageVersion(e.target.value)} />
      </label>
      
      <button onClick={handleAddVersionMovie}>Zapisz</button>
      <button onClick={onClose}>Anuluj</button>
    </div>
  );
};

export default MovieVersionForm;