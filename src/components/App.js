
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './User/Register';
import Login from './User/Login';
import NoPage  from './NoPage';
import Home  from './Home';
import Layout from './Global/Layout';
import MovieList from './Movies/MovieList';
import MovieDetails from './Movies/MovieDetails';

import MyAccount from './User/MyAccount';
import DirectorsList from './Directors/DirectorsList';
import DirectorDetails from './Directors/DirectorDetails';
import MovieForm from './Movies/MovieForm';
import MovieItemList from './MovieItem/MovieItemList';
import MovieItemForm from './MovieItem/MovieItemForm';
import MovieItemDetails from './MovieItem/MovieItemDetails';
import Logout from './User/Logout'; 
function App() {
  const logged= (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="*" element={<NoPage />} />
          <Route path='/movies' element ={<MovieList/>} />
          <Route path="/movies/:id" element ={<MovieDetails/>} />
          <Route path="/movies/create" element ={<MovieForm mode="Create"/>} />
          <Route path="/movies/edit/:id" element ={<MovieForm mode="Edit"/>} />
          <Route path="/directros" element ={<DirectorsList/>} />
          <Route path="/directors/:id" element ={<DirectorDetails/>} />
          <Route path="/movieItems" element ={<MovieItemList/>} />
          <Route path="/movieItems/:id" element ={<MovieItemDetails/>} />
          <Route path="/movieItems/create" element ={<MovieItemForm/>} />
          <Route path='/logout' element ={<Logout/>} />

        </Route>
          
      </Routes>
    </BrowserRouter>
    );
    const annonimus = (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Route>
          
      </Routes>
    </BrowserRouter>
    )
    const jwtToken = sessionStorage.getItem('kinoToken')
  return jwtToken ? logged : annonimus;
}

export default App;
