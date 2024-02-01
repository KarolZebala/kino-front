import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ImageGallery from '../Global/ImageGallery';
import VideoPlayer from '../Global/VideoPlayer';
import CommentModal from './CommentModal';
import ReviewModal from './ReviewModal';
import './MovieDetails.css'
import API_URL from '../Global/config';
const MovieDetails = () => {
  const [movie, setMovie] = useState({})
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const { id } = useParams();
  const images = [
    { url: 'https://fwcdn.pl/fpo/10/65/1065/7912491.3.jpg' },
    { url: 'https://a.allegroimg.com/original/11c50f/85ce625b4cd4ad05903657c49673/wladca-pierscieni-powrot-krola' },
  ];
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const jwtToken = sessionStorage.getItem('kinoToken')
       const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

        const response = await axiosInstance.get(`Movie/movie/${id}` );
        console.log(response)
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    fetchMovies();
  }, []);

  const openReviewModal = () => setReviewModalOpen(true);
  const closeReviewModal = () => setReviewModalOpen(false);   
  const saveReview = async (review) => {
    const jwtToken = sessionStorage.getItem('kinoToken')
       const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      const reviewToCrete = {
        "author": review.author,
        "type": review.type,
        "content": review.content,
        "grade": review.grade,
        "movieId": movie.movieId
      }
      const response = await axiosInstance.post('MovieReview/create', reviewToCrete);
      window.location.reload()
  };
  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => setCommentModalOpen(false);
  const saveComment = async (comment) => {
    const jwtToken = sessionStorage.getItem('kinoToken')
       const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      const commentToCrete = {
        "author": "ja",
        "content": comment,
        "movieId": movie.movieId
      }
      const response = await axiosInstance.post('MovieComment/create', commentToCrete);
      window.location.reload()
  };
  return (
     <div className="movie-container">
       <Link to={`/movies/edit/${movie.movieId}`}>
                  {"Edytuj"}
                </Link> 
      <h2>{movie.movieTitle}</h2>

      <div className="section info-section">
        <h3>Podstawowe Informacje</h3>
        <p>
          Reżyser: {movie.director?.directorName} {movie.director?.directorSurname}
        </p>
        <p>Opis: {movie.descripition}</p>
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
        <button onClick={openCommentModal}>Dodaj Komentarz</button>
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
        <button onClick={openReviewModal}>Dodaj Recenzję</button>
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
      <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal} onSave={saveComment} />
      <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} onSave={saveReview} />
    </div>
    
  );
};

export default MovieDetails;