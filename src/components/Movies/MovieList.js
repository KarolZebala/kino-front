import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Global/List.css';
import '../Global/config.js'
import API_URL from '../Global/config.js';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () =>{
    try {
      const searchString = document.querySelector('#search-string').value;
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
          setMovies(resposne.data);
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
  
  


  return (
    <div>
      <h2>Filmy</h2>
        {/* <AddMovieButton onAddMovie={handleAddMovie} /> */}
        <Link to={`/movies/create`}>{"Dodaj Film"}</Link>
        <div>
          <label>Wyszukaj</label>
          <input id = 'search-string' placeholder='zacznij pisać' onChange={getMovies}></input>
        </div>
      <table>
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Opis</th>
            <th>Rezyser</th>
            <th>Akcje</th>

          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.movieId}>
              <td><Link to={`/movies/${movie.movieId}`}>{movie.movieTitle}</Link></td>
              <td>{movie.descripition.slice(0, 50)}</td>
              <td><Link to={`/directors/${movie.director?.directorId}`}>{movie.director.directorName + ' ' + movie.director.directorSurname }</Link></td>
              <td>
                <Link to={`/movies/edit/${movie.movieId}`}>
                  {"Edytuj"}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default MovieList;