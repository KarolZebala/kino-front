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
      console.log(response)
      window.location.href= "/login";
      
    } catch (error) {
      let errorMs = '';
      error.response.data.errors?.Email?.forEach(element => {
        errorMs += element + '\n'
      });
      if(errorMs){
        alert("Rejestracja nie udała się: " + errorMs)
        return;
      }
      error.response?.data?.forEach(element => {
        errorMs += element?.description + '\n'
      });
      alert("Rejestracja nie udała się: " + errorMs)
      console.log(error)
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