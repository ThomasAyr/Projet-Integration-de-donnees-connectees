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
      console.error(`Cannot get weather: ${error}`)
      res.status(404).json({ "description" : "Error 404 : Resource not found"});
    }
  }
  
  export const getWeatherAPI = async (req, res) => {
    try {
      const city = req.query.city || 'Montpellier';  // Montpellier default
      const WeatherData = await getWeather(city);
      res.json(WeatherData);
      res.status(200).send('Success');
    } catch (error) {
      console.error(`Error processing /movie request: ${error}`);
      res.status(500).json({ "description" : "Error 500 : Internal Server Error" });
    }
  };
  