import React, { useState, useEffect } from 'react';

import './App.css'; 
import BikeMap from './Component/bikes-map.js';
import SearchBar from "./Component/SearchBar.js";
import fetchBikeData from './Component/fetchBikeData.js'; 

import bike from "./Graphic/bike.png"; 
import bike2 from "./Graphic/bike2.png"; 
import bikelogo from "./Graphic/bikelogo.png"; 
import bikelogo2 from "./Graphic/bikelogo2.png";
import cityBackground from "./Graphic/city.jpg";


function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const weatherApiUrl = 'https://effective-space-enigma-x6j49v465773675r-3001.app.github.dev/weather?city=Montpellier';

    fetch(weatherApiUrl)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  if (!weatherData) return <div>Loading weather data...</div>;

  const { current } = weatherData;
  const weatherMessage = current.precip_mm > 0 || current.precip_in > 0 ? "It might rain today, caution while biking" : "Nice weather today but stay cautious";
  const temperatureMessage = `It's ${current.temp_c} degrees °C`;
  const windMessage = `Wind: ${current.wind_kph} km/h (${current.wind_dir})`;
  const humidityMessage = `Humidity: ${current.humidity}%`;
  const feelsLikeMessage = `Feels like: ${current.feelslike_c}°C`;

  return (
    <div>
      <h1 className='h1-weather'>
        <img src={`https:${current.condition.icon}`} alt={current.condition.text} style={{ verticalAlign: 'middle' }} />
        {current.condition.text}
      </h1>
      <div className="cards-container">
        <div className="card">{temperatureMessage}<br/>{feelsLikeMessage}</div>
        <div className="card card-green">{weatherMessage}</div>
        <div className="card">{windMessage}<br/>{humidityMessage}</div>
      </div>
    </div>
  );
}

function Card({ number, text, green }) {
  return (
    <div className={`card ${green ? 'card-green' : ''}`}>
      <div className="card-number">{number}</div>
      <div className="card-text">{text}</div>
    </div>
  );
}

function Home() {
  const [cardsData, setCardsData] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBikeData();
      setCardsData(data); 
    };
  fetchData(); 
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Montpellier Mobility Assistant</h1>
        <div className="background-container">
          <img src={cityBackground} className="city-background" alt="City" />
          
          <img src={bike} className="bike-logo" alt="Bike" />
          <img src={bike2} className="bike2-logo" alt="Bike2" />
        </div>
      </header>
      <h1 className='h1-bikelogo'>
        <img src={bikelogo2} alt="bike" style={{ verticalAlign: 'middle' }} /> Available bikes
      </h1>
      <div className="cards-container">
        {cardsData.map((card) => (
          <Card key={card.id} number={card.number} text={card.text} green={card.green} />
        ))}
      </div>
      
      <Weather />
      
      <h1 className='h1-bikelogo'>
        <img src={bikelogo} alt="bike" style={{ verticalAlign: 'middle' }} /> Map available bikes
      </h1>
      <div className="App-map">
        <SearchBar  />
      </div>
      <div className="App-map">
        <BikeMap />
      </div>
      
      <div className="footer">
      <footer>
        April 2024 - API Project by Ayrivié/El Hijjawi - Paul Valéry University.<br />Legal Notice.
      </footer>
      </div>
    </div>
  );
}


export default Home;
