import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://localhost:44389/User/register', {
        Email: username,
        Password:password,
      });
      window.location.href= "/login";
      
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div>
      <h2>Zarejestruj się</h2>
      <input type="text" placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Hasło" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Zarejestruj</button>
    </div>
  );
};

export default Register;