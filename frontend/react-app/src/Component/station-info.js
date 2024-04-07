import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../App.css'; 

import bike from "../Graphic/bike.png"; 
import bike2 from "../Graphic/bike2.png"; 
import bikelogo from "../Graphic/bikelogo.png"; 
import bikelogo2 from "../Graphic/bikelogo2.png";
import cityBackground from "../Graphic/city.jpg";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch('/api/weather?city=Montpellier')
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


async function fetchBikeDataid() {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get('station');
      
      const response = await fetch(`/api/bike_by_id?id=${id}`);
      const data = await response.json();
  
      if (!data) {
        console.error('Bike data not found');
        return [];
      }
  
      const totalBikesAvailable = data.availableBikeNumber.value;
      const totalPlacesAvailable = data.freeSlotNumber.value;
  
      const cardsData = [
        { number: "Station", text: data.address.value.streetAddress },
        { number: totalBikesAvailable, text: 'Bikes available' },
        { number: totalPlacesAvailable, text: 'Places available' },
      ];
  
      return cardsData;
    } catch (error) {
      console.error('Error fetching bike data:', error);
      return [];
    }
  }

  async function hello() {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const name = searchParams.get('name');
      
      const response = await fetch(`/api/hello?name=${name}`);
      const data = await response.json();
  
      if (!data) {
        console.error('Bike data not found');
        return [];
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching hello:', error);
      return [];
    }
  }

const cardsData = await fetchBikeDataid();
const helloname = await hello();


function Card({ number, text, green }) {
  return (
    <div className={`card ${green ? 'card-green' : ''}`}>
      <div className="card-number">{number}</div>
      <div className="card-text">{text}</div>
    </div>
  );
}

function Station() {
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
        <img src={bikelogo2} alt="bike" style={{ verticalAlign: 'middle' }} /> {helloname}
      </h1>
      <div className="cards-container">
        {cardsData.map((card) => (
          <Card key={card.id} number={card.number} text={card.text} green={card.green} />
        ))}
      </div>
      
      <Weather />
      
      <h1 className='h1-bikelogo'>
        <img src={bikelogo} alt="bike" style={{ verticalAlign: 'middle' }} />  
        <Link to="/">
            <button className="Button-card">Button back</button>
        </Link>
        <img src={bikelogo} alt="bike" style={{ verticalAlign: 'middle' }} />  
      </h1>

      <div className="footer">
      <footer>
        April 2024 - API Project by Ayrivié/El Hijjawi - Paul Valéry University.<br />Legal Notice.
      </footer>
      </div>
    </div>
  );
}

export default Station;
