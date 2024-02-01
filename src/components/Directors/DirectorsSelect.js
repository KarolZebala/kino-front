import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import API_URL from '../Global/config';
const DirectorSelect = ({onSelect, directorName, directorId}) => {
  const [searchString, setSearchString] = useState('');
  const [options, setOptions] = useState([]);

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
          
          await axiosInstance.get('/Director/directors')
          .then(resposne => {
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
    } else {
      console.log('test1')
      console.log(directorId)
      console.log(directorName)
      setOptions([{directorId: directorId, directorName: directorName}])
      document.getElementById('director-select').value = directorId
      
    }
  }, [searchString]);

  const handleSelect = (e) => {
    console.log(e)
    const selectedValue = e.target.value;
    onSelect(selectedValue);
  };
  return (
    <div>
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Wyszukaj"
      />
      <select id='director-select' onChange={(e) => handleSelect(e)}>
        {options?.map((option) => (
            
          <option key={option.directorId} value={option.directorId}>
            {option.directorName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DirectorSelect;