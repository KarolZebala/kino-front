import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../Global/config';
import './MovieItem.css'
const MovieItemDetails = () => {
  const { id } = useParams();
  const [mvoieItem, setMovieItem] = useState('')
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL+ `MovieItem/movieItem/${id}` );
        console.log(response)
        setMovieItem(response.data);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    fetchMovies();
  }, []);
  function formatDate(inputDateString) {
    const inputDate = new Date(inputDateString);
  
    if (isNaN(inputDate.getTime())) {
      console.error('Invalid date format');
      return '-';
    }
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  
    return formattedDate;
  }
  return (
    <div className="body-container">
      <div className="movie-item-container">
        <h2>Seans </h2>
        <label className='movie-item-lable'>
            Film 
        </label>
        <p>{mvoieItem?.movie?.movieTitle}</p>
        
        <label className="movie-item-label">
          Data rozpoczęcia:
        </label>
        <p>
            {formatDate(mvoieItem.startDate)}
        </p>
        
        <label className="movie-item-label">
          Liczba miejsc:
        </label>
        <p>
            {mvoieItem.maxViewers}
        </p>
        
        <label className="movie-item-label">
          Cena bazowa:
        </label>
        <p>
            {mvoieItem.baseTicketPrice}
        </p>
        
        <label className="movie-item-label">
          Cena :
        </label>
        <p>
            {mvoieItem.actualTicketPrice}
        </p>
        
        <label className="movie-item-label">
          Cena zakupu :
        </label>
        <p>
            {mvoieItem.purchaseTicketPrice}
        </p>
      </div>
    </div>
  );
};

export default MovieItemDetails;