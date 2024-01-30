import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Global/List.css';
import AddDirectorButton from './AddDirectorButton';

const DirectorsList = () => {
  const [directors, setDirectors] = useState([]);

  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://localhost:44389/Director/directors');
        setDirectors(response.data);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    fetchMovies();
  }, []);
  const handleAddDirector = async () => {
    try {
      const response = await axios.get('https://localhost:44389/Director/directors');
      console.log(response)
      setDirectors(response.data);
    } catch (error) {
      console.error('Error fetching movies', error);
    }
  };
  return (
    <div>
      <h2>Reżyserowie</h2>
        <AddDirectorButton onAddDirector={handleAddDirector} />
      { <table>
        <thead>
          <tr>
            <th>Imie</th>
            <th>Nazwisko</th>
          </tr>
        </thead>
        <tbody>
          {directors.map((director) => (
            <tr key={director.directorId}>
              <td><Link to={`/directors/${director.directorId}`}>{director.directorName}</Link></td>
              <td>{director.directorSurname }</td>
            </tr>
          ))}
        </tbody>
      </table> }
    </div>
  );
};

export default DirectorsList;