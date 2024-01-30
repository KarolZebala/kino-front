import React, { useState, Link, useEffect } from 'react';
import axios from 'axios';
import '../Directors/DirectorsSelect.js'
import DirectorSelect from '../Directors/DirectorsSelect.js';
import AddMovieVersionButton from './AddMovieVersionButton.js';
import { useParams } from 'react-router-dom';
import CommentModal from './CommentModal';
import ReviewModal from './ReviewModal';
const MovieForm = ({mode}) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescripton] = useState('');
  const [directorId, setDirector] = useState('');
  const [movieVersionList, setMovieVersions] = useState([])  
  const [movieVersionToAdd, setMovieVersionsToAdd] = useState([])
  const [reviews, setReviews] = useState([])  
  const [reviewsToAdd, setReviewsToAdd] = useState([])  
  const [movieComents, setmovieComents] = useState([])  
  const [movieCommentsToAdd, SetMovieCommentsToAdd] = useState([])
  const [movieVersionToRemove, setMovieVersionToRemove] = useState([])
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [movieComentsToRemove, setMovieCommentToRemove] = useState([])
  const [movieReviewToRemove, setMovieReviewToRemove] = useState([])
  const [directorName, setDirectorName] = useState('')
  const handleAddMovie = async () => {
    if (title && description && directorId) {
      const newMovie = {
        "description": description,
        "title": title,
        "directorId": directorId,
        "VersionToAdd": movieVersionToAdd,
        "ReviewsToAdd" : reviewsToAdd,
        "CommnetToAdd":movieCommentsToAdd
       };
      const response = await axios.post('https://localhost:44389/Movie/create', newMovie);
      window.location.href= "/movies";
    } else {
      alert('Wypełnij tutuł i reżysera');
    }
  };
  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => setCommentModalOpen(false);
  const saveComment = (comment) => {
    const newCommentList = movieComents;
    newCommentList.push({content: comment, author: "ja"})
    setmovieComents(newCommentList)

    const newCommentListToAdd = movieCommentsToAdd;
    newCommentListToAdd.push({content: comment, author: "ja"})
    SetMovieCommentsToAdd(newCommentListToAdd);
  };
    
  const openReviewModal = () => setReviewModalOpen(true);
  const closeReviewModal = () => setReviewModalOpen(false);   
  const saveReview = (review) => {
    const newList = reviews;
    newList.push(review)
    setReviews(newList)

    const ListToAdd = reviewsToAdd;
    ListToAdd.push(review)
    setReviewsToAdd(ListToAdd);
  };
  useEffect(() => {
    const fetchMovies = async () => {
      if(mode !=="Edit"){
        return;
      }
      try {
        const response = await axios.get(`https://localhost:44389/Movie/movie/${id}` );
        console.log(response)
        setTitle(response.data.movieTitle)
        setDescripton(response.data.descripition)
        setDirector(response.data.director.directorId)
        setMovieVersions(response.data.movieVersions)
        setReviews(response.data.reviews)
        setmovieComents(response.data.movieComents)
        setDirectorName(response.data.director.directorName + ' ' + response.data.director.directorSurname )
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    fetchMovies();
  }, []);
  const handleUpdateMovie = async () => {
    if (title && description && directorId) {
      const newMovie = {
        "movieId" : id,
        "description": description,
        "title": title,
        "directorId": directorId,
        "VersionToAdd": movieVersionToAdd,
        "VersionToRemove" : movieVersionToRemove,
        "ReviewsToAdd" : reviewsToAdd,
        "CommnetToAdd":movieCommentsToAdd,
        "CommentToRemove":movieComentsToRemove,
        "ReviewsToRemove":movieReviewToRemove,
       };
      const response = await axios.put('https://localhost:44389/Movie/update', newMovie);
      window.location.href= `/movies/${id}`;
    } else {
      alert('Wypełnij tutuł i reżysera');
    }
  }
  const handleSelect = (selectedValue) => {
      setDirector(selectedValue)
    };
  const handleAddMovieVersion = (movieVersion) => {
      const newVersionListToAdd = movieVersionToAdd;
      newVersionListToAdd.push(movieVersion)
      setMovieVersionsToAdd(newVersionListToAdd)

      const newVersionList = movieVersionList;
      newVersionList.push(movieVersion)
      setMovieVersions(newVersionList);
  }
  const removeVersion = (movieVersionId) =>{
    const newListToRemove = movieVersionToRemove;
    newListToRemove.push(movieVersionId);
    setMovieVersionToRemove(newListToRemove)


    let newList = movieVersionList;
    newList =  newList.filter(x => x.movieVersionId !== movieVersionId)
    setMovieVersions(newList)
  }
  const removeComment = (movieCommentId) =>{
    const newListToRemove = movieComentsToRemove;
    newListToRemove.push(movieCommentId);
    setMovieCommentToRemove(newListToRemove)


    let newList =  movieComents;
    newList =  newList.filter(x => x.movieCommentId !== movieCommentId)
    setmovieComents(newList)
  }
  const removeReview = (movieReviewId) =>{
    const newListToRemove = movieReviewToRemove;
    newListToRemove.push(movieReviewId);
    setMovieReviewToRemove(newListToRemove)
    console.log(newListToRemove)

    let newList =  reviews;
    newList =  newList.filter(x => x.movieReviewId !== movieReviewId)
    setReviews(newList)
  }
  const reviewItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '10px',
  };
  const createHtml = (
    <div>
    <h2>Dodaj nowy film</h2>
    <label>
      Tytuł:
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    </label>
    <label>
      Opis:
      <input type="text" value={description} onChange={(e) => setDescripton(e.target.value)} />
    </label>
    <label>
      Reżyser:
      <DirectorSelect  onSelect={handleSelect} directorName={directorName} directorId={directorId} />
    </label>
    <h2>Wersje</h2>
    <AddMovieVersionButton onAddMovieVersion={handleAddMovieVersion} />
    <table>
      <thead>
        <tr>
          <th>Czas trawania</th>
          <th>Wersja dzwiękowa</th>
          <th>Wersja obrazu</th>
          <th>Wersja językowa</th>
          {/* <th>Akcje</th> */}
        </tr>
      </thead>
      <tbody>
        {movieVersionList.map((version) => (
          <tr>
            <td>{version.duration}</td>
            <td>{version.soundVersion}</td>
            <td>{version.imageVersion}</td>
            <td>{version.languageVersion}</td>
            {/* <td><button onClick={removeVersion(version.movieVersionId)}>Usuń</button></td> */}
          </tr>
        ))}
      </tbody>
    </table>
    <div className="section comments-section">
        <h3>Komentarze</h3>
        <ul>
          {movieComents?.map((comment, index) => (
            <li key={index}>
              <div style={reviewItemStyle}>
                <div class="d-inline-flex">
                  <div>
                    Autor: {comment?.author}
                  </div>
                  <div>
                    Treść: {comment?.content}
                  </div>
              </div>
              <div>
                <button onClick={() => removeComment(comment.movieCommentId)}>Usuń</button>
              </div>
            </div>
            </li>
          ))}
        </ul>
        <button onClick={openCommentModal}>Dodaj Komentarz</button>
      </div>

      <div className="section reviews-section">
        <h3>Recenzje</h3>
        <ul>
          {reviews?.map((review, index) => (
            <li key={index}>
              <div style={reviewItemStyle}>
              <div class="d-inline-flex">
              <div>
                Autor: {review?.author}
              </div>
              <div>
                Ocena: {review?.grade}
              </div>
              <div>
                Treść: {review?.content}
              </div>
              
              </div>
              <div>
                <button onClick={() => removeReview(review.movieReviewId)}>Usuń</button>
              </div>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={openReviewModal}>Dodaj Recenzję</button>
      </div>
    
    <button onClick={handleAddMovie}>Zapisz</button>
    {/* <button onClick={redirect}>Anuluj</button> */}
    {/* Modals */}
    <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal} onSave={saveComment} />
      <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} onSave={saveReview} />
  </div>
  );
  const updateHtml = (
    <div>
    <h2>Edycja filmu</h2>
    <label>
      Tytuł:
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    </label>
    <label>
      Opis:
      <input type="text" value={description} onChange={(e) => setDescripton(e.target.value)} />
    </label>
    <label>
      Reżyser:
      <DirectorSelect  onSelect={handleSelect} directorName={directorName} directorId={directorId} />
    </label>
    <h2>Wersje</h2>
    <AddMovieVersionButton onAddMovieVersion={handleAddMovieVersion} />
    <table>
      <thead>
        <tr>
          <th>Czas trawania</th>
          <th>Wersja dzwiękowa</th>
          <th>Wersja obrazu</th>
          <th>Wersja językowa</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {movieVersionList.map((version) => (
          <tr>
            <td>{version.duration}</td>
            <td>{version.soundVersion}</td>
            <td>{version.imageVersion}</td>
            <td>{version.languageVersion}</td>
            <td><button onClick={() => removeVersion(version.movieVersionId)}>Usuń</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="section comments-section">
        <h3>Komentarze</h3>
        <ul>
          {movieComents?.map((comment, index) => (
            <li key={index}>
            <div style={reviewItemStyle}>
                <div class="d-inline-flex">
                  <div>
                    Autor: {comment?.author}
                  </div>
                  <div>
                    Treść: {comment?.content}
                  </div>
              </div>
              <div>
                <button onClick={() => removeComment(comment.movieCommentId)}>Usuń</button>
              </div>
            </div>
            </li>
          ))}
        </ul>
        <button onClick={openCommentModal}>Dodaj Komentarz</button>
      </div>

      <div className="section reviews-section">
        <h3>Recenzje</h3>
        <ul>
          {reviews?.map((review, index) => (
            <li key={index}>
              <div style={reviewItemStyle}>
              <div class="d-inline-flex">
              <div>
                Autor: {review?.author}
              </div>
              <div>
                Ocena: {review?.grade}
              </div>
              <div>
                Treść: {review?.content}
              </div>
              
              </div>
              <div>
                <button onClick={() => removeReview(review.movieReviewId)}>Usuń</button>
              </div>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={openReviewModal}>Dodaj Recenzję</button>
      </div>
    <button onClick={handleUpdateMovie}>Zapisz</button>
    {/* <button onClick={redirect}>Anuluj</button> */}
    <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal} onSave={saveComment} />
      <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} onSave={saveReview} />
  </div>
  )
  return mode === "Edit" ? updateHtml : createHtml;
};

export default MovieForm;