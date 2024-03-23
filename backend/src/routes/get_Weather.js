import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
const API_METEO_KEY = process.env.API_METEO_KEY;

async function getWeather(city) {
  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_METEO_KEY}&q=${city}&aqi=no`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch(error) {
    console.error(`Cannot get weather: ${error}`);
    throw new Error("Error 404 : Resource not found");
  }
}


export const getWeatherAPI = async (req, res) => {
  try {
    const city = req.query.city || 'Montpellier'; // Default city
    const weatherData = await getWeather(city);

    
    res.status(200).json(weatherData);
  } catch (error) {
    console.error(`Error processing /weather request: ${error}`);
    
    const statusCode = error.message.includes('404') ? 404 : 500;
    res.status(statusCode).json({ "description": error.message });
  }
};
