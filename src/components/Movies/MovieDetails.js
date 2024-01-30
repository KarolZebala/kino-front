import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ImageGallery from '../Global/ImageGallery';
import VideoPlayer from '../Global/VideoPlayer';
import CommentModal from './CommentModal';
import ReviewModal from './ReviewModal';
import './MovieDetails.css'
const MovieDetails = () => {
  const [movie, setMovie] = useState({})
  const { id } = useParams();
  const images = [
    { url: 'https://fwcdn.pl/fpo/10/65/1065/7912491.3.jpg' },
    { url: 'https://a.allegroimg.com/original/11c50f/85ce625b4cd4ad05903657c49673/wladca-pierscieni-powrot-krola' },
  ];
  const videoUrl = 'file:///C:/Users/karol/Videos/Captures/KarolZębalaFilmZRobotem.mp4'
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://localhost:44389/Movie/movie/${id}` );
        console.log(response)
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    fetchMovies();
  }, []);

 
  return (
     <div className="movie-container">
      <h2>{movie.movieTitle}</h2>

      <div className="section info-section">
        <h3>Podstawowe Informacje</h3>
        <p>
          Reżyser: {movie.director?.directorName} {movie.director?.directorSurname}
        </p>
        <p>Opis: {movie.descripition}</p>
      </div>

      <div className="section trailer-section">
        <h3>Trailer</h3>
        <VideoPlayer videoUrl={videoUrl} />
      </div>

      <div className="section movie-version">
      <table>
        <thead>
          <tr>
            <th>Czas trawania</th>
            <th>Wersja dzwiękowa</th>
            <th>Wersja obrazu</th>
            <th>Wersja językowa</th>
          </tr>
        </thead>
        <tbody>
          {movie.movieVersions?.map((version) => (
            <tr>
              <td>{version.duration}</td>
              <td>{version.soundVersion}</td>
              <td>{version.imageVersion}</td>
              <td>{version.languageVersion}</td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="section posters-section">
        <h3>Plakaty</h3>
        <ImageGallery images={images} />
      </div>

      <div className="section comments-section">
        <h3>Komentarze</h3>
        <ul>
          {movie?.movieComents?.map((comment, index) => (
            <li key={index}>
              <div>
                Autor: {comment?.author}
              </div>
              <div>
                Treść: {comment?.content}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="section reviews-section">
        <h3>Recenzje</h3>
        <ul>
          {movie?.reviews?.map((review, index) => (
            <li key={index}>
              <div>
                Autor: {review?.author}
              </div>
              <div>
                Treść: {review?.content}
              </div>
              <div>
                Ocena: {review?.grade}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetails;