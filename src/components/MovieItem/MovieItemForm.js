import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../Global/config';
import './MovieItem.css'
const MovieItemForm = () => {
  const [startDate, setStartData] = useState('');
  const [maxViewers, setMaxViewers] = useState('');
  const [baseTicketPrice, setBaseTicketPrice] = useState('');
  const [actualTicketPrice, setActualTicketPrice] = useState('');
  const [purchaseTicketPrice, setPurchasePrice] = useState('');
  const [movieId, setMovieId] = useState('');
  const [options, setOptions] = useState([])
  const [searchString, setSearchString] = useState('')
  
  useEffect(() => {
    const fetchData = async (searchString) => {
      try {
        try {
          const jwtToken = sessionStorage.getItem('kinoToken')
          console.log(searchString)
          const axiosInstance = axios.create({
            baseURL: API_URL,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`,
            },
            params : {
              SearchString: searchString
            }
          });
          
          await axiosInstance.get('/Movie/movies')
          .then(resposne => {
              console.log(resposne.data)
              setOptions(resposne.data);
          })
          .catch(e => {
            console.error('Error fetching movies', e);
          })
        } catch (error) {
          
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (searchString.trim() !== '') {
      fetchData(searchString);
    }
  }, [searchString]);

  const handleAddMovie = async () => {
    if (startDate && maxViewers) {
      const newItem = {
        "movieId": movieId,
        "startDate": startDate,
        "maxViewers": maxViewers,
        "baseTicketPrice": baseTicketPrice,
        "actualTicketPrice": actualTicketPrice,
        "purchaseTicketPrice": purchaseTicketPrice
      };
      console.log(newItem)
      const response = await axios.post(API_URL + 'MovieItem/create', newItem);
      window.location.href= `/movieItems/${response.data}`;
      console.log(response)
    } else {
      alert('Please fill in all fields');
    }
  };
  const handleMovieSelect = (movieId) =>{
        var selectElement = document.getElementById("movie-select");
        var selectedOption = selectElement.options[selectElement.selectedIndex];
        console.log(selectedOption.value)
        setMovieId(selectedOption.value)
  }
  return (
    <div className="body-container">
      <div className="movie-item-container">
        <h2>Dodaj seans</h2>
        <label className='movie-item-lable'>
            Film 
            <input
                type="text"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder="Wyszukaj"
            />
      <select id='movie-select' onChange={(e) => handleMovieSelect(e)}>
            {options?.map((option) => (
                <option key={option.movieId} value={option.movieId}>
            {option.movieTitle}
          </option>
        ))}
      </select>
        </label>
        
        <label className="movie-item-label">
          Data rozpoczęcia:
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartData(e.target.value)}
            className="movie-item-input"
          />
        </label>
        <label className="movie-item-label">
          Maksymalna liczba widzów:
          <input
            type="number"
            value={maxViewers}
            onChange={(e) => setMaxViewers(e.target.value)}
            className="movie-item-input"
          />
        </label>
        <label className="movie-item-label">
          Cena podstawowa
          <input
            type="number"
            value={baseTicketPrice}
            onChange={(e) => setBaseTicketPrice(e.target.value)}
            className="movie-item-input"
          />
        </label>
        <label className="movie-item-label">
          Cena
          <input
            type="number"
            value={actualTicketPrice}
            onChange={(e) => setActualTicketPrice(e.target.value)}
            className="movie-item-input"
          />
        </label>
        <label className="movie-item-label">
          Cena zaskupu
          <input
            type="number"
            value={purchaseTicketPrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            className="movie-item-input"
          />
        </label>
        <button className="movie-item-button" onClick={handleAddMovie}>
          Zapisz
        </button>
      </div>
    </div>
  );
};

export default MovieItemForm;