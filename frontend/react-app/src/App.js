import React from 'react';
import './App.css'; 
import bike from "./Graphic/bike.png"; 
import bike2 from "./Graphic/bike2.png"; 
import cityBackground from "./Graphic/city.jpg";

const cardsData = [
  { number: '01', text: 'First Feature' },
  { number: '02', text: 'Second Sight' },
  { number: '03', text: 'Third Wonder' },
];

function Card({ number, text }) {
  return (
    <div className="card">
      <div className="card-number">{number}</div>
      <div className="card-text">{text}</div>
    </div>
  );
}

function App() {
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
      <div className="cards-container">
        {cardsData.map((card, index) => (
          <Card key={index} number={card.number} text={card.text} />
        ))}
      </div>
    </div>
  );
}

export default App;
