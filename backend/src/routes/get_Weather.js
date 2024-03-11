import dotenv from 'dotenv';
dotenv.config();
const API_METEO_KEY = process.env.API_METEO_KEY;

async function getWeather(city) {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_METEO_KEY}&q=${city}&aqi=no`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    } catch(error) {
      console.error(`Cannot get movies: ${error}`)
    }
  }
  
  export const getWeatherAPI = async (req, res) => {
    try {
      const city = req.query.city || 'Montpellier';  // Montpellier default
      const WeatherData = await getWeather(city);
      res.json(WeatherData);
    } catch (error) {
      console.error(`Error processing /movie request: ${error}`);
      res.status(500).send('Internal Server Error');
    }
  };
  