import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('/api/bikes_all')
      .then(response => response.json())
      .then(data => {
        const stationNames = data.AllBikeStations.map(station => ({
          name: station.address.value.streetAddress,
          id: station.id
        }));
        setStations(stationNames);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filteredSuggestions = stations.filter(station => 
      station.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleOpenStation = (stationId) => {
    const name = prompt('Please enter your first name:');
    if (name) {
      window.location.href = `https://effective-space-enigma-x6j49v465773675r-3000.app.github.dev/station-info?station=${stationId}&name=${name}`;
    }
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for a station..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map(station => (
            <li key={station.id} onClick={() => handleOpenStation(station.id)}>
              {station.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
