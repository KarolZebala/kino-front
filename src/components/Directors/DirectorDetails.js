import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const DirectorDetails = () => {
  const [director, setDirector] = useState({})
  const { id } = useParams();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://localhost:44389/Director/director/${id}` );
        console.log(response)
        setDirector(response.data);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div>
      <div>
        <h3>Podstawowe Informacje</h3>
        <p>Imie: {director?.directorName}</p>
        <p>Nazwisko: {director?.directorSurname}</p>
      </div>
    </div>
  );
};

export default DirectorDetails;