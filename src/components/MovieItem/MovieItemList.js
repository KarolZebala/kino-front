import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Global/List.css';
import '../Global/config.js'
import API_URL from '../Global/config.js';

const MovieItemList = () => {
  const [movieItems, setMovieItems] = useState([]);

  const getMovies = async () =>{
    try {
      const jwtToken = sessionStorage.getItem('kinoToken')
      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        params : {
          SearchString: ''
        }
      });
      
      await axiosInstance.get('/MovieItem/movieItems')
      .then(resposne => {
          setMovieItems(resposne.data);
      })
      .catch(e => {
        console.error('Error fetching movies', e);
      })
    } catch (error) {
      
    }
  }

  useEffect(() => {
    // Fetch movie data from your backend endpoint
    const fetchMovies = async () => {
      getMovies();
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
    <div>
      <h2>Seanse</h2>
        {/* <AddMovieButton onAddMovie={handleAddMovie} /> */}
        <Link to={`/movieItems/create`}>{"Dodaj Seans"}</Link>
        <div>
          <label>Wyszukaj</label>
          <input id = 'search-string' placeholder='zacznij pisać' onChange={getMovies}></input>
        </div>
      <table>
        <thead>
          <tr>
            <th>Tutuł filmu</th>
            <th>Data rozpoczęcia</th>
            <th>Maksymalna dostępna liczba miejsc</th>
            <th>Podstawowa cena biletu</th>
            <th>Cena biletu</th>
            <th>Cena zakupu biletu</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {movieItems.map((item) => (
            <tr key={item.movieItemId}>
              <td><Link to={`/movies/${item?.movie?.movieId}`}>{item?.movie?.movieTitle}</Link></td>
              <td>{formatDate(item.startDate)}</td>
              <td>{item.maxViewers}</td>
              <td>{item.baseTicketPrice}</td>
              <td>{item.actualTicketPrice}</td>
              <td>{item.purchaseTicketPrice}</td>
              <td>
                <div><Link to={`/movieItems/${item.movieItemId}`}>Szczegóły</Link></div>
                {/* <div>
                <Link to={`/movieItems/edit/${item.movieItemId}`}>
                  {"Edytuj"}
                </Link>
                </div> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default MovieItemList;