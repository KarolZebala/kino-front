// src/components/Login.js
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:44389/User/login', {
        UserName : username,
        Password:password,
      });
      console.log(response); // Handle success or redirect to home
      sessionStorage.setItem('kinoToken', response.data.token);
      window.location.href= "/movies";
    } catch (error) {
      alert("Logowanie nie powiodło się")
    }
  }

  return (
    <div>
      <div>
        <h2>Login</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <Link to="/register">Utwórz konto</Link>
      </div>
    </div>
  );
};

export default Login;
  